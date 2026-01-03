export type Transaction = {
  date: string;
  description: string;
  amount: number;
  type: "Income" | "Expense";
};

export type AnalyzeResponse = {
  industry: string;
  industry_factor: number;
  proxy_net_profit: number;
  monthly_income_est: number;
  features: Record<string, number>;
  credit_score: number;
  risk_grade: string;
  recommended_loan_amount: number;
  shap: {
    base_value: number;
    p_default: number;
    contributions: Record<string, number>;
  };
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? (
  typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? '' 
    : 'http://localhost:8000'
);

export async function ocrImage(
  file: File,
  password?: string,
  bank?: string
): Promise<Transaction[]> {
  const form = new FormData();
  form.append("file", file);
  if (password) {
    form.append("password", password);
  }
  if (bank) {
    form.append("bank", bank);
  }

  const res = await fetch(`${API_BASE}/ocr`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OCR failed: ${res.status} ${text}`);
  }

  const data = (await res.json()) as {
    transactions?: Transaction[];
    error?: string;
  };

  if (data.error) {
    throw new Error(data.error);
  }

  return data.transactions ?? [];
}

export async function analyzeTransactions(
  transactions: Transaction[]
): Promise<AnalyzeResponse> {
  const res = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transactions }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Analyze failed: ${res.status} ${text}`);
  }

  return (await res.json()) as AnalyzeResponse;
}
