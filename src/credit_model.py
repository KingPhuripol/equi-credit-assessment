from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional

import numpy as np


@dataclass
class ScoreResult:
    credit_score: int
    base_value: float
    feature_contributions: Dict[str, float]
    shap_waterfall_fig: Any | None = None


@dataclass
class CreditModelArtifacts:
    model: Any
    feature_order: list[str]
    scaler: Any
    shap_explainer: Any | None = None

    def score(self, features: dict) -> ScoreResult:
        x = np.array([[features[k] for k in self.feature_order]], dtype=float)
        x_scaled = self.scaler.transform(x)

        # Model outputs default-risk probability (0..1). Lower is better.
        p_default = float(self.model.predict_proba(x_scaled)[0, 1])
        score = int(np.clip(900 - (p_default * 600), 300, 900))

        base_value = 0.0
        contrib: Dict[str, float] = {}
        fig = None

        # Try real SHAP if available.
        if self.shap_explainer is not None:
            try:
                import shap
                import matplotlib.pyplot as plt

                shap_values = self.shap_explainer(x_scaled)
                base_value = float(shap_values.base_values[0])
                values = shap_values.values[0]
                contrib = {name: float(v) for name, v in zip(self.feature_order, values)}

                plt.figure(figsize=(7.0, 3.8), dpi=140)
                shap.plots.waterfall(shap_values[0], show=False)
                fig = plt.gcf()
            except Exception:
                # Fall back to simulated bars if SHAP isn't installed/working.
                self.shap_explainer = None

        if self.shap_explainer is None:
            # Lightweight heuristic contributions for UI explanation.
            base_value = 0.0
            contrib = _simulated_contributions(features)

        return ScoreResult(
            credit_score=score,
            base_value=base_value,
            feature_contributions=contrib,
            shap_waterfall_fig=fig,
        )


def train_dummy_credit_model(seed: int = 42) -> CreditModelArtifacts:
    """Train a small on-the-fly credit model on synthetic data.

    Uses XGBoost when available; falls back to sklearn if not.
    """

    rng = np.random.default_rng(seed)

    feature_order = [
        "expense_ratio",
        "consistency",
        "industry_factor",
        "proxy_net_profit",
        "cashflow_strength",
    ]

    n = 2500
    expense_ratio = rng.uniform(0.15, 0.85, size=n)
    consistency = rng.uniform(0.1, 0.95, size=n)
    industry_factor = rng.choice([0.1, 0.2, 0.5], size=n, p=[0.25, 0.45, 0.30])
    proxy_net_profit = rng.normal(loc=9000, scale=6000, size=n).clip(0, 60000)
    cashflow_strength = np.log1p(proxy_net_profit)

    X = np.column_stack(
        [expense_ratio, consistency, industry_factor, proxy_net_profit, cashflow_strength]
    ).astype(float)

    # Define synthetic default risk label (1 = default). Higher expense_ratio, lower consistency, lower profit -> more risk.
    logit = (
        2.2 * (expense_ratio - 0.5)
        - 2.8 * (consistency - 0.6)
        - 0.00008 * (proxy_net_profit - 12000)
        - 1.2 * (industry_factor - 0.2)
    )
    p = 1.0 / (1.0 + np.exp(-logit))
    y = (rng.uniform(0, 1, size=n) < p).astype(int)

    from sklearn.model_selection import train_test_split
    from sklearn.preprocessing import StandardScaler

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=seed)

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)
    X_test_s = scaler.transform(X_test)

    model = None
    shap_explainer = None

    # Preferred: XGBoost
    try:
        from xgboost import XGBClassifier

        model = XGBClassifier(
            n_estimators=220,
            max_depth=4,
            learning_rate=0.07,
            subsample=0.9,
            colsample_bytree=0.9,
            reg_lambda=1.0,
            random_state=seed,
            eval_metric="logloss",
        )
        model.fit(X_train_s, y_train)

        # Optional: SHAP explainability
        try:
            import shap

            shap_explainer = shap.Explainer(model, X_train_s)
        except Exception:
            shap_explainer = None

    except Exception:
        # Fallback: sklearn model still meets core flow.
        from sklearn.ensemble import GradientBoostingClassifier

        model = GradientBoostingClassifier(random_state=seed)
        model.fit(X_train_s, y_train)
        shap_explainer = None

    return CreditModelArtifacts(
        model=model,
        feature_order=feature_order,
        scaler=scaler,
        shap_explainer=shap_explainer,
    )


def _simulated_contributions(features: dict) -> Dict[str, float]:
    # Normalize to approximate feature impact directions.
    expense_ratio = float(features.get("expense_ratio", 0.5))
    consistency = float(features.get("consistency", 0.5))
    industry_factor = float(features.get("industry_factor", 0.1))
    proxy_net_profit = float(features.get("proxy_net_profit", 0.0))
    cashflow_strength = float(features.get("cashflow_strength", 0.0))

    return {
        "consistency": (consistency - 0.55) * 1.8,
        "expense_ratio": -(expense_ratio - 0.45) * 2.2,
        "industry_factor": (industry_factor - 0.2) * 1.4,
        "proxy_net_profit": (np.log1p(proxy_net_profit) - 8.5) * 0.55,
        "cashflow_strength": (cashflow_strength - 8.0) * 0.35,
    }
