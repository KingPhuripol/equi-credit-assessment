from __future__ import annotations

import json
import os
import hashlib
import re
import base64
from datetime import date, datetime, timedelta
from typing import Any

import httpx
import pytesseract
from PIL import Image
import io


def extract_transactions_from_pdf_text(text: str) -> list[dict[str, Any]]:
    """Extract transactions from PDF text content.
    
    This is a simple heuristic-based extraction for Thai bank statements.
    Looks for patterns like dates, amounts, and descriptions.
    """
    transactions = []
    
    # Common Thai transaction patterns
    income_keywords = ["โอนเข้า", "รับเงิน", "ค่าจ้าง", "รายรับ", "ขาย", "เงินเดือน", "ลูกค้าโอน"]
    expense_keywords = ["โอนออก", "จ่าย", "ซื้อ", "ค่า", "ถอนเงิน", "โอนให้"]
    
    # Try to find transaction patterns (very basic)
    lines = text.split('\n')
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Look for amounts (Thai Baht format: can be 1,234.56 or 1234.56)
        amount_match = re.search(r'(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)', line)
        
        # Look for dates (DD/MM/YYYY, DD-MM-YYYY, etc.)
        date_match = re.search(r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})', line)
        
        if amount_match:
            amount_str = amount_match.group(1).replace(',', '')
            try:
                amount = float(amount_str)
                
                # Determine transaction type based on keywords
                trans_type = "Expense"  # Default conservative
                for keyword in income_keywords:
                    if keyword in line:
                        trans_type = "Income"
                        break
                
                # Extract date
                trans_date = datetime.now().strftime("%Y-%m-%d")
                if date_match:
                    date_str = date_match.group(1)
                    try:
                        # Try to parse Thai date format
                        for fmt in ["%d/%m/%Y", "%d-%m-%Y", "%d/%m/%y", "%d-%m-%y"]:
                            try:
                                parsed_date = datetime.strptime(date_str, fmt)
                                trans_date = parsed_date.strftime("%Y-%m-%d")
                                break
                            except:
                                continue
                    except:
                        pass
                
                # Extract description (remove date and amount)
                description = line
                if date_match:
                    description = description.replace(date_match.group(0), "").strip()
                if amount_match:
                    description = description.replace(amount_match.group(0), "").strip()
                
                # Clean up description
                description = re.sub(r'\s+', ' ', description).strip()
                if not description:
                    description = "รายการ" + ("รับเงิน" if trans_type == "Income" else "จ่ายเงิน")
                
                # Limit description length
                if len(description) > 50:
                    description = description[:50] + "..."
                
                transactions.append({
                    "date": trans_date,
                    "description": description,
                    "amount": float(amount),
                    "type": trans_type,
                })
                
            except ValueError:
                continue
    
    # If no transactions found, return empty list
    return transactions


def mock_typhoon_ocr(image_bytes: bytes) -> list[dict[str, Any]]:
    """Simulated Typhoon OCR (Thai-optimized).

    Production note:
    - This is the exact place you would add the real Typhoon OCR API key + request.
    - Keep API key in environment variables (never hardcode).

    Example (placeholder):
        TYPHOON_API_KEY = os.environ["TYPHOON_API_KEY"]
        requests.post("https://typhoon.example/v1/ocr", headers={"Authorization": ...})

    For demo: return deterministic Thai transactions derived from image hash.
    """

    h = hashlib.sha256(image_bytes).hexdigest()
    seed = int(h[:8], 16)
    base = date(2025, 12, 1) + timedelta(days=(seed % 21))

    templates = [
        ("ลูกค้าโอน", 4200.0, "Income"),
        ("ขายของ", 1800.0, "Income"),
        ("ค่าจ้าง freelance", 3500.0, "Income"),
        ("ค่าวัตถุดิบ", 950.0, "Expense"),
        ("โอนให้แม่", 800.0, "Expense"),
        ("ค่าเช่าแผง", 1200.0, "Expense"),
        ("ค่าเดินทาง", 220.0, "Expense"),
        ("ลูกค้าโอน (งวดงาน)", 5200.0, "Income"),
    ]

    start = seed % len(templates)
    chosen = (templates[start:] + templates[:start])[:6]

    out: list[dict[str, Any]] = []
    for i, (desc, amount, typ) in enumerate(chosen):
        out.append(
            {
                "date": (base + timedelta(days=i * 3)).isoformat(),
                "description": desc,
                "amount": float(amount),
                "type": typ,
            }
        )
    return out


def _creditnext_extraction_system_prompt() -> str:
    return (
        "You are CreditNext, an underwriting-grade financial extraction agent for Thai freelancers. "
        "Your job is to convert OCR text from Thai receipts/statements into clean, bank-ready structured transactions. "
        "Be conservative, accurate, and consistent."
    )


def _creditnext_extraction_user_prompt(ocr_text: str, bank: str | None = None) -> str:
    # This prompt is intentionally strict: JSON-only output so the API can parse reliably.
    
    bank_specific_hints = ""
    if bank:
        bank_hints = {
            "scb": "SCB/ธนาคารไทยพาณิชย์: วันที่อยู่ในรูปแบบ DD/MM/YYYY, รายการมักมีหัวข้อ 'รายการฝาก' และ 'รายการถอน'",
            "kbank": "KBank/กสิกรไทย: ค้นหาคอลัมน์ 'วันที่', 'รายการ', 'จำนวนเงิน'",
            "bbl": "BBL/กรุงเทพ: มักใช้ 'เดบิต' และ 'เครดิต', วันที่อาจเป็น DD/MM/YY",
            "ktb": "KTB/กรุงไทย: ดูที่ 'รายการเดินบัญชี', แยก รับ/จ่าย ชัดเจน",
            "bay": "BAY/กรุงศรีอยุธยา: Statement มักมีตาราง เครดิต/เดบิต ที่ชัดเจน",
            "tmb": "TMB/ทหารไทยธนชาต: ใช้ รับ/จ่าย ในหัวตาราง",
            "gsb": "GSB/ออมสิน: รูปแบบง่าย มี วันที่, รายการ, รับ, จ่าย",
            "baac": "BAAC/ธ.ก.ส.: มักเป็นเอกสารแบบฟอร์มราชการ ดูที่ช่อง 'ฝาก', 'ถอน'",
        }
        bank_specific_hints = f"\n\nBANK-SPECIFIC HINTS for {bank.upper()}:\n{bank_hints.get(bank.lower(), '')}\n"
    
    return (
        f"Extract transactions from the OCR text. Output ONLY valid JSON (no markdown, no extra text).\n"
        "Schema: {\"transactions\": [{\"date\":\"YYYY-MM-DD\",\"description\":\"<Thai text>\",\"amount\":<number>,\"type\":\"Income\"|\"Expense\"}]}\n"
        "Rules:\n"
        "- Use ISO date format. If date missing, infer a plausible date and keep it consistent; never leave blank.\n"
        "- amount must be a number (THB). If you see commas, remove them.\n"
        "- type classification:\n"
        "  Income: ลูกค้าโอน, โอนเข้า, ค่าจ้าง, รายรับ, รับเงิน, ขายของ, เครดิต, ฝาก\n"
        "  Expense: ค่าวัตถุดิบ, ค่าเช่า, ค่าเช่าแผง, โอนให้แม่, ค่าเดินทาง, ค่าใช้จ่าย, เดบิต, ถอน, จ่าย\n"
        "- Keep description in Thai; keep it short and meaningful.\n"
        "- If uncertain, classify as Expense (conservative).\n"
        f"{bank_specific_hints}"
        "OCR TEXT:\n"
        + ocr_text
    )


async def typhoon_ocr_extract_text(
    image_bytes: bytes,
    *,
    api_key: str,
    model: str = "typhoon-ocr",
    task_type: str = "default",
    max_tokens: int = 16384,
    temperature: float = 0.1,
    top_p: float = 0.6,
    repetition_penalty: float = 1.2,
    pages: list[int] | None = None,
) -> str:
    """Call Typhoon OCR and return combined extracted text.

    Mirrors the client-side example you provided, but runs server-side.
    """

    url = "https://api.opentyphoon.ai/v1/ocr"
    data = {
        "model": model,
        "task_type": task_type,
        "max_tokens": str(max_tokens),
        "temperature": str(temperature),
        "top_p": str(top_p),
        "repetition_penalty": str(repetition_penalty),
    }
    if pages is not None:
        data["pages"] = json.dumps(pages)

    files = {"file": ("document", image_bytes)}

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(
            url,
            headers={"Authorization": f"Bearer {api_key}"},
            data=data,
            files=files,
        )

    resp.raise_for_status()
    payload = resp.json()

    extracted_texts: list[str] = []
    for page_result in payload.get("results", []) or []:
        if page_result.get("success") and page_result.get("message"):
            content = (
                page_result["message"]["choices"][0]["message"].get("content")
                if page_result["message"].get("choices")
                else None
            )
            if not content:
                continue
            # Some OCR returns JSON with natural_text.
            try:
                parsed = json.loads(content)
                content = parsed.get("natural_text") or content
            except Exception:
                pass
            extracted_texts.append(str(content))
        else:
            # Skip failed pages; caller can decide fallback.
            continue

    return "\n".join(extracted_texts).strip()


async def typhoon_llm_extract_transactions(ocr_text: str, *, api_key: str, bank: str | None = None) -> list[dict[str, Any]]:
    """Use Typhoon chat completions to structure OCR text into transactions JSON."""

    url = "https://api.opentyphoon.ai/v1/chat/completions"
    body = {
        "model": "typhoon-v2.5-30b-a3b-instruct",
        "messages": [
            {"role": "system", "content": _creditnext_extraction_system_prompt()},
            {"role": "user", "content": _creditnext_extraction_user_prompt(ocr_text, bank)},
        ],
        "temperature": 0.2,
        "max_completion_tokens": 1200,
        "top_p": 0.6,
        "frequency_penalty": 0,
        "stream": False,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(url, headers={"Authorization": f"Bearer {api_key}"}, json=body)

    resp.raise_for_status()
    data = resp.json()
    content = (
        data.get("choices", [{}])[0]
        .get("message", {})
        .get("content", "")
        .strip()
    )
    if not content:
        return []

    parsed = json.loads(content)
    txns = parsed.get("transactions", [])
    if not isinstance(txns, list):
        return []
    return txns


async def tesseract_ocr_extract_text(image_bytes: bytes) -> str:
    """Use Tesseract OCR to extract text from image."""
    print(f"[DEBUG] tesseract_ocr_extract_text called with {len(image_bytes)} bytes")
    
    try:
        # Convert bytes to PIL Image
        image = Image.open(io.BytesIO(image_bytes))
        
        # Use Tesseract with Thai language support
        # lang='tha+eng' means use both Thai and English
        text = pytesseract.image_to_string(image, lang='tha+eng')
        
        print(f"[DEBUG] Tesseract extracted text length: {len(text)}")
        if text:
            print(f"[DEBUG] Text preview (first 500 chars): {text[:500]}...")
        
        return text.strip()
    except Exception as e:
        print(f"[ERROR] Tesseract OCR failed: {e}")
        return ""


async def openai_vision_extract_text(image_bytes: bytes, *, api_key: str) -> str:
    """Use OpenAI GPT-4 Vision to extract text from PDF images."""
    print(f"[DEBUG] openai_vision_extract_text called with {len(image_bytes)} bytes")
    
    # Convert bytes to base64
    base64_image = base64.b64encode(image_bytes).decode('utf-8')
    
    url = "https://api.openai.com/v1/chat/completions"
    body = {
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """Please transcribe ALL text visible in this bank statement image exactly as it appears. 
This is for personal financial analysis purposes. 
Include all transaction details: dates, times, descriptions, amounts (both debit and credit columns), and balance information.
Return the complete text without summarizing or omitting any details.
Format: Plain text, line by line as it appears in the image."""
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/png;base64,{base64_image}"
                        }
                    }
                ]
            }
        ],
        "max_tokens": 4096
    }
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(
            url,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json=body
        )
    
    resp.raise_for_status()
    data = resp.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    
    print(f"[DEBUG] Extracted text length: {len(content)}")
    if content:
        print(f"[DEBUG] Text preview: {content[:200]}...")
    
    return content


async def openai_llm_extract_transactions(ocr_text: str, *, api_key: str, bank: str | None = None) -> list[dict[str, Any]]:
    """Use OpenAI GPT-4 to structure OCR text into transactions JSON."""
    print(f"[DEBUG] openai_llm_extract_transactions called for bank={bank}")
    
    url = "https://api.openai.com/v1/chat/completions"
    body = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": _creditnext_extraction_system_prompt()},
            {"role": "user", "content": _creditnext_extraction_user_prompt(ocr_text, bank)},
        ],
        "temperature": 0.2,
        "max_tokens": 4096,
        "response_format": {"type": "json_object"}
    }
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(
            url,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json=body
        )
    
    resp.raise_for_status()
    data = resp.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
    
    print(f"[DEBUG] LLM response length: {len(content)}")
    
    if not content:
        return []
    
    parsed = json.loads(content)
    txns = parsed.get("transactions", [])
    if not isinstance(txns, list):
        return []
    
    print(f"[DEBUG] Extracted {len(txns)} transactions from LLM")
    return txns


async def real_openai_ocr_to_transactions(image_bytes: bytes, bank: str | None = None) -> list[dict[str, Any]]:
    """End-to-end: Tesseract OCR -> OpenAI GPT-4 structuring -> transactions.

    Uses Tesseract for OCR (no API key restrictions), then OpenAI GPT-4 for structuring.
    """
    print(f"[DEBUG] real_openai_ocr_to_transactions called with bank={bank}")
    
    # Use Tesseract OCR instead of OpenAI Vision
    print(f"[DEBUG] Using Tesseract OCR for text extraction")
    ocr_text = await tesseract_ocr_extract_text(image_bytes)
    
    if not ocr_text:
        print("[WARNING] No OCR text extracted from Tesseract")
        return []
    
    # Use OpenAI GPT-4 to structure the extracted text
    api_key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not api_key:
        print("[ERROR] OPENAI_API_KEY is not set")
        # Still return OCR text even without GPT-4
        # Try to parse with heuristics
        return []
    
    print(f"[DEBUG] OpenAI API key found: {api_key[:15]}...")
    txns = await openai_llm_extract_transactions(ocr_text, api_key=api_key, bank=bank)
    
    print(f"[DEBUG] Total extracted {len(txns)} transactions")
    return txns


async def real_typhoon_ocr_to_transactions(image_bytes: bytes, bank: str | None = None) -> list[dict[str, Any]]:
    """End-to-end: real OCR -> LLM structuring -> transactions.

    Uses env var `TYPHOON_API_KEY`. If missing, raise RuntimeError.
    """
    print(f"[DEBUG] real_typhoon_ocr_to_transactions called with bank={bank}")
    
    api_key = os.environ.get("TYPHOON_API_KEY", "").strip()
    if not api_key:
        print("[ERROR] TYPHOON_API_KEY is not set")
        raise RuntimeError("TYPHOON_API_KEY is not set")
    
    print(f"[DEBUG] API key found: {api_key[:10]}...")
    print(f"[DEBUG] Calling typhoon_ocr_extract_text with {len(image_bytes)} bytes")
    
    ocr_text = await typhoon_ocr_extract_text(image_bytes, api_key=api_key)
    
    print(f"[DEBUG] OCR text length: {len(ocr_text) if ocr_text else 0}")
    if ocr_text:
        print(f"[DEBUG] OCR text preview: {ocr_text[:200]}...")
    
    if not ocr_text:
        print("[WARNING] No OCR text extracted")
        return []

    print(f"[DEBUG] Calling typhoon_llm_extract_transactions")
    txns = await typhoon_llm_extract_transactions(ocr_text, api_key=api_key, bank=bank)
    
    print(f"[DEBUG] Extracted {len(txns)} transactions")
    return txns
