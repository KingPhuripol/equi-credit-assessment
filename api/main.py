from __future__ import annotations

from typing import Any, Literal
import sys
import os

# Add api folder to path for Vercel serverless
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import numpy as np
import pandas as pd
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

try:
    from api.industry import classify_industry_and_profit
    from api.model import ModelBundle, score_and_explain, train_model
    from api.ocr import mock_typhoon_ocr, real_openai_ocr_to_transactions
except ImportError:
    from industry import classify_industry_and_profit
    from model import ModelBundle, score_and_explain, train_model
    from ocr import mock_typhoon_ocr, real_openai_ocr_to_transactions


app = FastAPI(title="CreditNext API", version="1.0.0")

# Dev CORS: allow Next.js dev server.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001", 
        "http://localhost:3002",
        "https://equi.areazeroai.com",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"] ,
    allow_headers=["*"] ,
)


MODEL: ModelBundle | None = None


@app.on_event("startup")
def _startup() -> None:
    global MODEL
    MODEL = train_model(seed=42)


class Transaction(BaseModel):
    date: str
    description: str
    amount: float
    type: Literal["Income", "Expense"]


class AnalyzeRequest(BaseModel):
    transactions: list[Transaction]


class AnalyzeResponse(BaseModel):
    industry: str
    industry_factor: float
    proxy_net_profit: float
    monthly_income_est: float
    features: dict[str, float]
    credit_score: int
    risk_grade: str
    recommended_loan_amount: float
    shap: dict[str, Any]


def _transactions_to_features(df: pd.DataFrame, industry_factor: float, proxy_net_profit: float) -> dict[str, float]:
    income = float(df.loc[df["type"] == "Income", "amount"].sum())
    expense = float(df.loc[df["type"] == "Expense", "amount"].sum())
    total = max(income + expense, 1.0)
    expense_ratio = float(expense / total)

    df_day = df.copy()
    df_day["date"] = pd.to_datetime(df_day["date"], errors="coerce")
    df_day = df_day.dropna(subset=["date"])
    if len(df_day) == 0:
        consistency = 0.5
    else:
        df_day["signed_amount"] = np.where(df_day["type"] == "Income", df_day["amount"], -df_day["amount"])
        daily = df_day.groupby(df_day["date"].dt.date)["signed_amount"].sum()
        if len(daily) <= 1:
            consistency = 0.7
        else:
            vol = float(np.std(daily.values))
            avg = float(np.mean(np.abs(daily.values)))
            consistency = float(1.0 - (vol / (avg + 1e-6)))
            consistency = float(np.clip(consistency, 0.0, 1.0))

    cashflow_strength = float(np.log1p(max(proxy_net_profit, 0.0)))

    return {
        "expense_ratio": expense_ratio,
        "consistency": consistency,
        "industry_factor": float(industry_factor),
        "proxy_net_profit": float(proxy_net_profit),
        "cashflow_strength": cashflow_strength,
    }


def _score_to_grade(score: int) -> str:
    if score >= 780:
        return "A (Low Risk)"
    if score >= 700:
        return "B (Moderate Risk)"
    if score >= 620:
        return "C (Elevated Risk)"
    return "D (High Risk)"


def _recommended_loan(monthly_income: float, grade: str) -> float:
    mult = {
        "A (Low Risk)": 6.0,
        "B (Moderate Risk)": 4.0,
        "C (Elevated Risk)": 2.5,
        "D (High Risk)": 1.5,
    }.get(grade, 2.0)
    return float(max(monthly_income, 0.0) * mult)


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.post("/ocr")
async def ocr(
    file: UploadFile = File(...),
    password: str | None = Form(None),
    bank: str | None = Form(None),
) -> dict:
    content = await file.read()
    
    # Handle PDF
    if file.filename.lower().endswith(".pdf"):
        try:
            import io
            from pypdf import PdfReader, PdfWriter
            from pdf2image import convert_from_bytes
            
            # 1. Decrypt if needed
            pdf_file = io.BytesIO(content)
            reader = PdfReader(pdf_file)
            
            if reader.is_encrypted:
                if not password:
                    return {"error": "PDF is encrypted. Please provide a password."}
                if not reader.decrypt(password):
                    return {"error": "Invalid password."}
            
            # 2. Convert PDF to images for OpenAI Vision
            # OpenAI Vision API requires images, not PDF
            output = io.BytesIO()
            writer = PdfWriter()
            for page in reader.pages:
                writer.add_page(page)
            writer.write(output)
            decrypted_pdf_bytes = output.getvalue()
            
            # Convert to images
            images = convert_from_bytes(decrypted_pdf_bytes)
            
            # Convert first image to bytes
            import io as io2
            img_bytes = io2.BytesIO()
            images[0].save(img_bytes, format='PNG')
            content = img_bytes.getvalue()
            
            print(f"[DEBUG] Converted PDF to {len(images)} images, using first page")
            
        except Exception as e:
            return {"error": f"Failed to process PDF: {str(e)}"}

    # If `OPENAI_API_KEY` is configured, run real OCR->LLM extraction.
    # Otherwise fall back to deterministic mock transactions.
    txns = None
    
    api_key = os.environ.get("OPENAI_API_KEY")
    print(f"[DEBUG] OPENAI_API_KEY present: {bool(api_key)}")
    if api_key:
        print(f"[DEBUG] API key value: {api_key[:20]}...")
    
    if api_key:
        try:
            print(f"[DEBUG] Calling real_openai_ocr_to_transactions with {len(content)} bytes, bank={bank}")
            txns = await real_openai_ocr_to_transactions(content, bank=bank)
            print(f"[DEBUG] Got {len(txns) if txns else 0} transactions from real OCR")
        except Exception as e:
            # Log the error for debugging
            print(f"ERROR in real_openai_ocr_to_transactions: {e}")
            import traceback
            traceback.print_exc()
            txns = None

    if not txns:
        # Mock OCR doesn't work well with PDF bytes (hash might be weird), 
        # but it will return *something*.
        print("WARNING: Falling back to mock OCR")
        txns = mock_typhoon_ocr(content)
    
    print(f"[DEBUG] Returning {len(txns)} transactions to client")
    return {"transactions": txns}


@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(req: AnalyzeRequest) -> AnalyzeResponse:
    global MODEL
    if MODEL is None:
        MODEL = train_model(seed=42)

    df = pd.DataFrame([t.model_dump() for t in req.transactions])

    industry, factor, profit, monthly_income = classify_industry_and_profit(df)
    features = _transactions_to_features(df, factor, profit)

    scored = score_and_explain(MODEL, features)
    credit_score = int(scored["credit_score"])
    grade = _score_to_grade(credit_score)

    return AnalyzeResponse(
        industry=industry,
        industry_factor=float(factor),
        proxy_net_profit=float(profit),
        monthly_income_est=float(monthly_income),
        features={k: float(v) for k, v in features.items()},
        credit_score=credit_score,
        risk_grade=grade,
        recommended_loan_amount=_recommended_loan(float(monthly_income), grade),
        shap={
            "base_value": float(scored.get("base_value", 0.0)),
            "contributions": scored.get("contributions", {}),
            "p_default": float(scored.get("p_default", 0.0)),
        },
    )
