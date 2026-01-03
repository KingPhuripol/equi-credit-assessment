import json
from datetime import datetime

import numpy as np
import pandas as pd
import plotly.graph_objects as go
import streamlit as st

from src.credit_model import (
    CreditModelArtifacts,
    ScoreResult,
    train_dummy_credit_model,
)
from src.industry import classify_industry_and_profit
from src.ocr import mock_typhoon_ocr
from src.ui import inject_global_css, render_app_header, render_home


st.set_page_config(
    page_title="CreditNext: AI-Powered Credit Scoring for Freelancers",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed",
)


def _init_state() -> None:
    st.session_state.setdefault("route", "home")
    st.session_state.setdefault("transactions", None)
    st.session_state.setdefault("industry", None)
    st.session_state.setdefault("industry_factor", None)
    st.session_state.setdefault("proxy_net_profit", None)
    st.session_state.setdefault("monthly_income_est", None)
    st.session_state.setdefault("features", None)
    st.session_state.setdefault("score_result", None)
    st.session_state.setdefault("model_artifacts", None)


def _goto(route: str) -> None:
    st.session_state["route"] = route


def _transactions_to_features(df: pd.DataFrame, industry_factor: float, proxy_net_profit: float) -> dict:
    income = df.loc[df["type"] == "Income", "amount"].sum()
    expense = df.loc[df["type"] == "Expense", "amount"].sum()

    total = max(income + expense, 1.0)
    expense_ratio = float(expense / total)

    # Consistency proxy: lower volatility in daily net flows is better.
    df_day = df.copy()
    df_day["date"] = pd.to_datetime(df_day["date"], errors="coerce")
    df_day = df_day.dropna(subset=["date"])  # defensive
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

    # Cashflow strength in log-scale to reduce sensitivity.
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
    # Simple, bank-ready heuristic.
    multiplier = {
        "A (Low Risk)": 6.0,
        "B (Moderate Risk)": 4.0,
        "C (Elevated Risk)": 2.5,
        "D (High Risk)": 1.5,
    }.get(grade, 2.0)
    return float(max(monthly_income, 0.0) * multiplier)


def _render_score_gauge(score: int) -> None:
    fig = go.Figure(
        go.Indicator(
            mode="gauge+number",
            value=score,
            number={"font": {"size": 48}},
            gauge={
                "axis": {"range": [300, 900]},
                "bar": {"color": "#0B2A4A"},
                "steps": [
                    {"range": [300, 580], "color": "#E5E7EB"},
                    {"range": [580, 700], "color": "#D1D5DB"},
                    {"range": [700, 780], "color": "#C7D2FE"},
                    {"range": [780, 900], "color": "#A5B4FC"},
                ],
                "threshold": {
                    "line": {"color": "#111827", "width": 3},
                    "thickness": 0.75,
                    "value": score,
                },
            },
        )
    )
    fig.update_layout(margin=dict(l=10, r=10, t=10, b=10), height=320)
    st.plotly_chart(fig, use_container_width=True)


def _render_shap_explain(score_result: ScoreResult) -> None:
    st.markdown("<div class='section-title'>Why this score?</div>", unsafe_allow_html=True)

    if score_result.shap_waterfall_fig is not None:
        st.pyplot(score_result.shap_waterfall_fig, clear_figure=True)
        return

    # Fallback: simulated contribution bars.
    contrib = score_result.feature_contributions
    if not contrib:
        st.info("Explainability not available; showing summary heuristics.")
        return

    items = sorted(contrib.items(), key=lambda kv: abs(kv[1]), reverse=True)[:6]
    for name, val in items:
        label = {
            "consistency": "Positive consistency",
            "expense_ratio": "High expense ratio",
            "industry_factor": "Industry factor",
            "proxy_net_profit": "Proxy net profit",
            "cashflow_strength": "Cashflow strength",
        }.get(name, name)

        direction = "positive" if val >= 0 else "negative"
        pct = float(min(abs(val) / (abs(score_result.base_value) + 1e-6), 1.0))

        st.markdown(
            f"""
            <div class='bar-row'>
              <div class='bar-label'>{label}</div>
              <div class='bar-track'>
                <div class='bar-fill {direction}' style='width:{pct*100:.1f}%'></div>
              </div>
              <div class='bar-value'>{val:+.2f}</div>
            </div>
            """,
            unsafe_allow_html=True,
        )


def render_assessment() -> None:
    render_app_header()

    colA, colB = st.columns([1.25, 1.0], gap="large")

    with colA:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("<div class='card-title'>Step 1: Document Upload</div>", unsafe_allow_html=True)
        st.markdown(
            "<div class='muted'>Upload statement/bill images. We simulate Thai-optimized OCR via Typhoon OCR.</div>",
            unsafe_allow_html=True,
        )

        files = st.file_uploader(
            "Upload images (PNG/JPG)",
            type=["png", "jpg", "jpeg"],
            accept_multiple_files=True,
            label_visibility="collapsed",
        )

        c1, c2 = st.columns([1, 1])
        with c1:
            run_ocr = st.button("Run Typhoon OCR Analysis", use_container_width=True)
        with c2:
            reset = st.button("Reset", use_container_width=True)

        if reset:
            for k in [
                "transactions",
                "industry",
                "industry_factor",
                "proxy_net_profit",
                "monthly_income_est",
                "features",
                "score_result",
                "model_artifacts",
            ]:
                st.session_state[k] = None
            st.rerun()

        if run_ocr:
            if not files:
                st.warning("Please upload at least one image.")
            else:
                with st.spinner("Simulating Typhoon OCR on Thai bills..."):
                    txns = []
                    for f in files:
                        txns.extend(mock_typhoon_ocr(f.getvalue()))

                    df = pd.DataFrame(txns)
                    st.session_state["transactions"] = df

                    industry, factor, profit, monthly_income = classify_industry_and_profit(df)
                    st.session_state["industry"] = industry
                    st.session_state["industry_factor"] = factor
                    st.session_state["proxy_net_profit"] = profit
                    st.session_state["monthly_income_est"] = monthly_income

                    features = _transactions_to_features(df, factor, profit)
                    st.session_state["features"] = features

                    artifacts = train_dummy_credit_model(seed=42)
                    st.session_state["model_artifacts"] = artifacts

                    score_result = artifacts.score(features)
                    st.session_state["score_result"] = score_result

                st.success("Analysis complete.")

        st.markdown("</div>", unsafe_allow_html=True)

        if st.session_state["transactions"] is not None:
            st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
            st.markdown("<div class='card'>", unsafe_allow_html=True)
            st.markdown("<div class='card-title'>Step 2: OCR Output (Simulated)</div>", unsafe_allow_html=True)
            st.dataframe(st.session_state["transactions"], use_container_width=True, height=250)
            st.markdown("</div>", unsafe_allow_html=True)

    with colB:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("<div class='card-title'>Step 3: Credit Scoring Result</div>", unsafe_allow_html=True)

        score_result: ScoreResult | None = st.session_state["score_result"]
        if score_result is None:
            st.info("Upload documents and run OCR to generate your score.")
            st.markdown("</div>", unsafe_allow_html=True)
            return

        score = int(score_result.credit_score)
        grade = _score_to_grade(score)

        _render_score_gauge(score)

        st.markdown("<div class='kv'>", unsafe_allow_html=True)
        st.markdown(
            f"""
            <div class='kv-row'><div class='kv-k'>Risk Grade</div><div class='kv-v'>{grade}</div></div>
            <div class='kv-row'><div class='kv-k'>Industry</div><div class='kv-v'>{st.session_state['industry']}</div></div>
            <div class='kv-row'><div class='kv-k'>Estimated Monthly Income</div><div class='kv-v'>฿{st.session_state['monthly_income_est']:,.0f}</div></div>
            """,
            unsafe_allow_html=True,
        )
        st.markdown("</div>", unsafe_allow_html=True)

        recommended = _recommended_loan(float(st.session_state["monthly_income_est"]), grade)
        st.markdown("<div class='section-title'>Bank-Ready Report</div>", unsafe_allow_html=True)
        st.markdown(
            f"""
            <div class='report'>
              <div class='report-row'><div class='report-k'>Proxy Net Profit</div><div class='report-v'>฿{st.session_state['proxy_net_profit']:,.0f}</div></div>
              <div class='report-row'><div class='report-k'>Recommended Loan Amount</div><div class='report-v'>฿{recommended:,.0f}</div></div>
              <div class='report-row'><div class='report-k'>Score Range</div><div class='report-v'>300–900</div></div>
            </div>
            """,
            unsafe_allow_html=True,
        )

        st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
        _render_shap_explain(score_result)

        st.markdown("</div>", unsafe_allow_html=True)


def main() -> None:
    _init_state()
    inject_global_css()

    if st.session_state["route"] == "home":
        started = render_home()
        if started:
            _goto("app")
            st.rerun()
        return

    if st.button("← Back to Home", type="secondary"):
        _goto("home")
        st.rerun()

    render_assessment()


if __name__ == "__main__":
    main()
