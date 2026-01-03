from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass
class ModelBundle:
    model: object
    scaler: object
    feature_order: list[str]
    shap_explainer: object | None
    X_background: np.ndarray


def train_model(seed: int = 42) -> ModelBundle:
    rng = np.random.default_rng(seed)

    feature_order = [
        "expense_ratio",
        "consistency",
        "industry_factor",
        "proxy_net_profit",
        "cashflow_strength",
    ]

    n = 3500
    expense_ratio = rng.uniform(0.15, 0.85, size=n)
    consistency = rng.uniform(0.1, 0.95, size=n)
    industry_factor = rng.choice([0.1, 0.2, 0.5], size=n, p=[0.25, 0.45, 0.30])
    proxy_net_profit = rng.normal(loc=9000, scale=6500, size=n).clip(0, 70000)
    cashflow_strength = np.log1p(proxy_net_profit)

    X = np.column_stack(
        [expense_ratio, consistency, industry_factor, proxy_net_profit, cashflow_strength]
    ).astype(float)

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

    X_train, _, y_train, _ = train_test_split(X, y, test_size=0.2, random_state=seed)

    scaler = StandardScaler()
    X_train_s = scaler.fit_transform(X_train)

    # Prefer XGBoost
    from xgboost import XGBClassifier

    model = XGBClassifier(
        n_estimators=260,
        max_depth=4,
        learning_rate=0.06,
        subsample=0.9,
        colsample_bytree=0.9,
        reg_lambda=1.0,
        random_state=seed,
        eval_metric="logloss",
    )
    model.fit(X_train_s, y_train)

    # SHAP explainer (TreeExplainer/Explainer auto)
    shap_explainer = None
    try:
        import shap

        shap_explainer = shap.Explainer(model, X_train_s)
    except Exception:
        shap_explainer = None

    # Keep small background for stable SHAP plotting
    X_bg = X_train_s[: min(256, X_train_s.shape[0])]

    return ModelBundle(
        model=model,
        scaler=scaler,
        feature_order=feature_order,
        shap_explainer=shap_explainer,
        X_background=X_bg,
    )


def score_and_explain(bundle: ModelBundle, features: dict) -> dict:
    x = np.array([[features[k] for k in bundle.feature_order]], dtype=float)
    x_s = bundle.scaler.transform(x)

    p_default = float(bundle.model.predict_proba(x_s)[0, 1])
    credit_score = int(np.clip(900 - (p_default * 600), 300, 900))

    contributions = {}
    base_value = 0.0

    if bundle.shap_explainer is not None:
        try:
            shap_values = bundle.shap_explainer(x_s)
            base_value = float(shap_values.base_values[0])
            vals = shap_values.values[0]
            contributions = {k: float(v) for k, v in zip(bundle.feature_order, vals)}
        except Exception:
            contributions = _simulated_contributions(features)
            base_value = 0.0
    else:
        contributions = _simulated_contributions(features)
        base_value = 0.0

    return {
        "credit_score": credit_score,
        "p_default": p_default,
        "base_value": base_value,
        "contributions": contributions,
    }


def _simulated_contributions(features: dict) -> dict:
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
