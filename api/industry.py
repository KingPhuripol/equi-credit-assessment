from __future__ import annotations

import re
from typing import Tuple

import numpy as np
import pandas as pd


def classify_industry_and_profit(df: pd.DataFrame) -> Tuple[str, float, float, float]:
    """Keyword-based industry classification + proxy net profit.

    Rules:
    - 'ค่าจ้าง', 'freelance' -> Freelance (factor 0.50)
    - 'วัตถุดิบ', 'ขายของ' -> Retail (factor 0.20)

    Returns: (industry, factor, adjusted_proxy_net_profit, monthly_income_est)
    """

    if df is None or len(df) == 0:
        return "Unknown", 0.0, 0.0, 0.0

    text = " ".join(df["description"].astype(str).tolist()).lower()
    freelance_hits = _has_any(text, ["ค่าจ้าง", "freelance"])
    retail_hits = _has_any(text, ["วัตถุดิบ", "ขายของ"])

    if freelance_hits and not retail_hits:
        industry, factor = "Freelance", 0.50
    elif retail_hits and not freelance_hits:
        industry, factor = "Retail", 0.20
    elif freelance_hits and retail_hits:
        industry, factor = "Freelance", 0.50
    else:
        industry, factor = "Other", 0.10

    income = float(df.loc[df["type"] == "Income", "amount"].sum())
    expense = float(df.loc[df["type"] == "Expense", "amount"].sum())
    proxy_net_profit = income - expense

    monthly_income_est = _estimate_monthly_income(df, income)

    adjusted_profit = float(proxy_net_profit * (1.0 + factor))
    return industry, factor, adjusted_profit, monthly_income_est


def _has_any(text: str, keywords: list[str]) -> bool:
    for kw in keywords:
        if re.search(re.escape(kw.lower()), text):
            return True
    return False


def _estimate_monthly_income(df: pd.DataFrame, income_sum: float) -> float:
    d = df.copy()
    d["date"] = pd.to_datetime(d["date"], errors="coerce")
    d = d.dropna(subset=["date"])
    if len(d) == 0:
        return float(income_sum)

    days = max(int((d["date"].max() - d["date"].min()).days), 1)
    scaled = float(income_sum) * (30.0 / float(days))
    return float(np.clip(scaled, 0.0, 1e9))
