// Client-Side AI Simulation Engine for Equi Platform
// No Backend Required - All logic runs in the browser

export type Transaction = {
  date: string;
  description: string;
  amount: number;
  type: "Income" | "Expense";
};

export type BillAnalysis = {
  industry_type: string;
  estimated_monthly_income: number;
  risk_factor: number;
  transactions: Transaction[];
};

export type CreditScoreResult = {
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

/**
 * Feature 1: Smart OCR Engine (Simulation Logic)
 * Analyzes file name to categorize industry and generate realistic transaction data
 */
export function analyzeBill(file: File): BillAnalysis {
  const fileName = file.name.toLowerCase();

  let industry_type = "General Business";
  let baseIncome = 35000;
  let frequency = 15;
  let avgAmount = 2000;
  let risk_factor = 0.3;

  // Smart categorization based on filename
  if (
    fileName.includes("food") ||
    fileName.includes("market") ||
    fileName.includes("restaurant")
  ) {
    industry_type = "Food & Beverage Industry";
    baseIncome = 28000;
    frequency = 25; // High frequency
    avgAmount = 1200; // Low amount per transaction
    risk_factor = 0.35;
  } else if (
    fileName.includes("invoice") ||
    fileName.includes("job") ||
    fileName.includes("freelance") ||
    fileName.includes("project")
  ) {
    industry_type = "Freelance / Professional Services";
    baseIncome = 45000;
    frequency = 12; // Medium frequency
    avgAmount = 3500; // High amount per transaction
    risk_factor = 0.25;
  } else if (
    fileName.includes("shop") ||
    fileName.includes("retail") ||
    fileName.includes("store")
  ) {
    industry_type = "Retail & E-commerce";
    baseIncome = 38000;
    frequency = 20;
    avgAmount = 1800;
    risk_factor = 0.28;
  } else if (
    fileName.includes("tech") ||
    fileName.includes("software") ||
    fileName.includes("it")
  ) {
    industry_type = "Technology & IT Services";
    baseIncome = 55000;
    frequency = 10;
    avgAmount = 5000;
    risk_factor = 0.2;
  }

  // Generate realistic transactions
  const transactions: Transaction[] = [];
  const today = new Date();

  // Generate income transactions
  for (let i = 0; i < frequency; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const variance = 0.3; // 30% variance
    const amount = avgAmount * (1 + (Math.random() - 0.5) * variance);

    transactions.push({
      date: date.toISOString().split("T")[0],
      description: generateDescription(industry_type, "income"),
      amount: Math.round(amount),
      type: "Income",
    });
  }

  // Generate expense transactions (40-60% of income)
  const expenseCount = Math.floor(frequency * 0.6);
  const totalIncome = transactions.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = totalIncome * (0.4 + Math.random() * 0.2); // 40-60%
  const expenseAmount = totalExpenses / expenseCount;

  for (let i = 0; i < expenseCount; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const variance = 0.4;
    const amount = expenseAmount * (1 + (Math.random() - 0.5) * variance);

    transactions.push({
      date: date.toISOString().split("T")[0],
      description: generateDescription(industry_type, "expense"),
      amount: Math.round(amount),
      type: "Expense",
    });
  }

  // Sort by date
  transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const estimated_monthly_income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    industry_type,
    estimated_monthly_income,
    risk_factor,
    transactions,
  };
}

/**
 * Feature 2: The "Equi-Score" Algorithm (Real Calculation)
 * Calculates credit score based on income, consistency, and expenses
 */
export function calculateCreditScore(
  income: number,
  consistency: number,
  expenses: number
): CreditScoreResult {
  // Start with Base Score: 300
  let score = 300;
  const contributions: Record<string, number> = {};

  // Add Income Factor: (Income / 1000) * 0.5
  const incomeFactor = (income / 1000) * 0.5;
  score += incomeFactor;
  contributions["Monthly Income"] = Math.round(incomeFactor);

  // Add Consistency Score (+100 if transactions > 20/month)
  const consistencyScore = consistency > 20 ? 100 : consistency * 5;
  score += consistencyScore;
  contributions["Income Stability"] = Math.round(consistencyScore);

  // Subtract Debt Ratio: (Expenses / Income) * 200
  const debtRatio = expenses / income;
  const debtPenalty = debtRatio * 200;
  score -= debtPenalty;
  contributions["Expense Ratio"] = -Math.round(debtPenalty);

  // Industry Factor
  const industryBonus = Math.random() * 20 + 10; // 10-30
  score += industryBonus;
  contributions["Industry Factor"] = Math.round(industryBonus);

  // Cap between 300 and 850
  score = Math.max(300, Math.min(850, score));

  // Calculate risk grade
  let risk_grade = "High Risk";
  if (score >= 750) risk_grade = "Excellent";
  else if (score >= 650) risk_grade = "Good";
  else if (score >= 550) risk_grade = "Fair";
  else if (score >= 450) risk_grade = "Poor";

  // Calculate recommended loan amount (3-6x monthly income based on score)
  const multiplier = Math.max(3, Math.min(6, (score - 300) / 100));
  const recommended_loan_amount = Math.round(income * multiplier);

  return {
    industry: "Calculated from transactions",
    industry_factor: Math.round(industryBonus),
    proxy_net_profit: Math.round(income - expenses),
    monthly_income_est: Math.round(income),
    features: {
      income: Math.round(income),
      expenses: Math.round(expenses),
      consistency: consistency,
      debt_ratio: Math.round(debtRatio * 100) / 100,
    },
    credit_score: Math.round(score),
    risk_grade,
    recommended_loan_amount,
    shap: {
      base_value: 300,
      p_default: Math.round((1 - score / 850) * 100) / 100,
      contributions,
    },
  };
}

/**
 * Analyze transactions and calculate credit score
 */
export function analyzeTransactions(
  transactions: Transaction[]
): CreditScoreResult {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const consistency = transactions.filter((t) => t.type === "Income").length;

  return calculateCreditScore(income, consistency, expenses);
}

/**
 * Helper function to generate realistic transaction descriptions
 */
function generateDescription(
  industry: string,
  type: "income" | "expense"
): string {
  const incomeDescriptions: Record<string, string[]> = {
    "Food & Beverage Industry": [
      "Food Delivery Payment",
      "Restaurant Sale",
      "Catering Service",
      "Menu Order #",
    ],
    "Freelance / Professional Services": [
      "Project Payment",
      "Consulting Fee",
      "Design Work",
      "Development Invoice",
    ],
    "Retail & E-commerce": [
      "Online Sale",
      "Product Sale",
      "Customer Payment",
      "Order #",
    ],
    "Technology & IT Services": [
      "Software License",
      "IT Consulting",
      "Tech Support",
      "Development Fee",
    ],
    "General Business": [
      "Service Payment",
      "Sales Revenue",
      "Customer Payment",
      "Invoice #",
    ],
  };

  const expenseDescriptions = [
    "Supplier Payment",
    "Rent Payment",
    "Utilities",
    "Marketing Expense",
    "Equipment Purchase",
    "Office Supplies",
    "Transportation",
    "Insurance Premium",
  ];

  if (type === "income") {
    const descriptions =
      incomeDescriptions[industry] || incomeDescriptions["General Business"];
    return (
      descriptions[Math.floor(Math.random() * descriptions.length)] +
      Math.floor(Math.random() * 1000)
    );
  } else {
    return expenseDescriptions[
      Math.floor(Math.random() * expenseDescriptions.length)
    ];
  }
}

/**
 * Feature 5: Generate mock fairness audit data
 */
export function generateFairnessAuditData() {
  const mockApplicants = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    gender: Math.random() > 0.5 ? "Male" : "Female",
    region: Math.random() > 0.4 ? "Upcountry" : "Bangkok",
    score: Math.floor(Math.random() * 550) + 300,
    approved: Math.random() > 0.15, // 85% approval rate
  }));

  const maleApprovals = mockApplicants.filter(
    (a) => a.gender === "Male" && a.approved
  ).length;
  const maleTotal = mockApplicants.filter((a) => a.gender === "Male").length;
  const femaleApprovals = mockApplicants.filter(
    (a) => a.gender === "Female" && a.approved
  ).length;
  const femaleTotal = mockApplicants.filter(
    (a) => a.gender === "Female"
  ).length;

  const bangkokApprovals = mockApplicants.filter(
    (a) => a.region === "Bangkok" && a.approved
  ).length;
  const bangkokTotal = mockApplicants.filter(
    (a) => a.region === "Bangkok"
  ).length;
  const upcountryApprovals = mockApplicants.filter(
    (a) => a.region === "Upcountry" && a.approved
  ).length;
  const upcountryTotal = mockApplicants.filter(
    (a) => a.region === "Upcountry"
  ).length;

  return {
    total: 1000,
    gender: {
      male: {
        approved: maleApprovals,
        total: maleTotal,
        rate: Math.round((maleApprovals / maleTotal) * 100),
      },
      female: {
        approved: femaleApprovals,
        total: femaleTotal,
        rate: Math.round((femaleApprovals / femaleTotal) * 100),
      },
    },
    region: {
      bangkok: {
        approved: bangkokApprovals,
        total: bangkokTotal,
        rate: Math.round((bangkokApprovals / bangkokTotal) * 100),
      },
      upcountry: {
        approved: upcountryApprovals,
        total: upcountryTotal,
        rate: Math.round((upcountryApprovals / upcountryTotal) * 100),
      },
    },
  };
}
