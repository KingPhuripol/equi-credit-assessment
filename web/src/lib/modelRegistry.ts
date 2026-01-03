/**
 * AI Model Metadata and Versioning
 * Enterprise-grade model tracking for production deployment
 */

export interface ModelMetadata {
  name: string;
  version: string;
  accuracy: number;
  lastUpdated: string;
  framework: string;
  inputFeatures: number;
  trainingData: string;
}

export const MODEL_REGISTRY = {
  ocrModel: {
    name: "Typhoon OCR",
    version: "2.0.1",
    accuracy: 0.987,
    lastUpdated: "2026-01-01",
    framework: "Transformers (Hugging Face) + PaddleOCR",
    inputFeatures: 0, // Image-based
    trainingData: "Thai documents corpus (500K samples)",
  },

  nlpModel: {
    name: "WangChanBERTa",
    version: "1.0",
    accuracy: 0.92,
    lastUpdated: "2025-12-15",
    framework: "PyTorch + Transformers",
    inputFeatures: 512, // Token sequence length
    trainingData: "Thai Wikipedia + Common Crawl (20GB)",
  },

  scoringModel: {
    name: "XGBoost Credit Scorer",
    version: "3.2.0",
    accuracy: 0.89, // AUROC
    lastUpdated: "2026-01-02",
    framework: "XGBoost 2.0",
    inputFeatures: 24,
    trainingData: "Synthetic credit data (1M samples)",
  },

  shapExplainer: {
    name: "SHAP TreeExplainer",
    version: "0.45.0",
    accuracy: 1.0, // Exact calculation
    lastUpdated: "2025-11-20",
    framework: "SHAP Library",
    inputFeatures: 24,
    trainingData: "N/A (Post-hoc explanation)",
  },

  fairnessAuditor: {
    name: "AIF360 Bias Detector",
    version: "0.6.1",
    accuracy: 0.992, // Parity score
    lastUpdated: "2025-12-10",
    framework: "IBM AI Fairness 360",
    inputFeatures: 0, // Audit-only
    trainingData: "Mock applicants (1000 samples)",
  },
} as const;

/**
 * Get current system version
 */
export function getSystemVersion(): string {
  return "v1.2.0-enterprise";
}

/**
 * Get all model versions as string
 */
export function getModelVersionString(): string {
  return `OCR:${MODEL_REGISTRY.ocrModel.version} | NLP:${MODEL_REGISTRY.nlpModel.version} | XGB:${MODEL_REGISTRY.scoringModel.version}`;
}

/**
 * Feature engineering metadata
 */
export const FEATURE_DEFINITIONS = [
  {
    name: "monthly_income_est",
    description: "Estimated monthly income from transactions",
    type: "continuous",
  },
  {
    name: "consistency_index",
    description: "Income consistency score (0-1)",
    type: "continuous",
  },
  {
    name: "expense_to_income_ratio",
    description: "Total expenses / Total income",
    type: "continuous",
  },
  {
    name: "operating_cash_flow",
    description: "Net cash flow per month",
    type: "continuous",
  },
  {
    name: "transaction_frequency",
    description: "Number of transactions per month",
    type: "discrete",
  },
  {
    name: "income_volatility",
    description: "Standard deviation of income amounts",
    type: "continuous",
  },
  {
    name: "industry_risk_factor",
    description: "Risk multiplier by industry type",
    type: "categorical",
  },
  {
    name: "avg_transaction_size",
    description: "Average transaction amount",
    type: "continuous",
  },
  {
    name: "max_expense_single",
    description: "Largest single expense",
    type: "continuous",
  },
  {
    name: "expense_diversity",
    description: "Variety of expense categories",
    type: "discrete",
  },
] as const;
