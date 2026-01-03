export type Language = "en" | "th";

export const translations = {
  en: {
    topbar: {
      technology: "Technology",
      legal: "Legal",
      enterpriseAI: "Enterprise AI",
      fairness: "Fairness",
      assessment: "Assessment",
    },
    hero: {
      badge: "LegalTech Competition Entry 2026",
      title: "Unlock Your Financial Potential with",
      subtitle:
        "AI-powered credit scoring for freelancers - Using Client-Side AI Simulation to analyze files and generate real-time transaction data.",
      startAssessment: "Start Assessment",
      viewFairness: "View AI Fairness",
    },
    features: {
      howItWorks: "How it works",
      title: "From file to score in seconds",
      card1: {
        title: "1. Upload Documents",
        desc: "Upload receipts or bank slips - The system analyzes the filename.",
      },
      card2: {
        title: "2. Client-Side AI",
        desc: "JavaScript Engine analyzes filenames and generates simulated transactions in real-time.",
      },
      card3: {
        title: "3. Get Score & Explanation",
        desc: "Equi-Score™ algorithm + SHAP Waterfall explains every factor affecting your score.",
      },
    },
    trust: {
      title: "Trusted by Modern Freelancers",
      desc: "Designed to look and feel like a bank-grade FinTech system, with AI Fairness Audit from 1,000 simulated applicants.",
      badges: {
        pdpa: "PDPA Compliant",
        bot: "BOT Guidelines",
        consumer: "Consumer Protection Act",
        aiEthics: "AI Ethics (EU AI Act)",
      },
      assessmentsRun: "assessments run today",
    },
    assessment: {
      title: "AI Credit Assessment",
      subtitle:
        "Upload your documents to get an instant credit score analysis.",
      uploadTitle: "Upload Financial Documents",
      uploadDesc: "Supports JPG, PNG, PDF. Max 5MB per file.",
      dragDrop: "Drag & drop files here, or click to select",
      processing: "Processing...",
      startAssessment: "Start Assessment",
      extractedTransactions: "Extracted Transactions",
      creditScore: "Credit Score",
      riskGrade: "Risk Grade",
      dispute: "Request Manual Review / Dispute Score",
      downloadReport: "Download Report",
      analyzing: "Analyzing Documents...",
      analyzingDesc: "Our AI is extracting data and calculating your score.",
      resultTitle: "Assessment Result",
      riskLevel: "Risk Level",
      maxLoan: "Max Loan Amount",
      interestRate: "Interest Rate",
      reset: "Start New Assessment",
    },
    fairness: {
      title: "AI Fairness Audit",
      subtitle:
        "Real-time monitoring of AI decision making to ensure equal opportunity.",
      auditTitle: "Audit Controls",
      auditDesc: "Run bias detection algorithms on the current model version.",
      runAudit: "Run Live Audit",
      auditing: "Auditing...",
      mitigation: "Enable AIF360 Mitigation",
      mitigationDesc: "Apply AIF360 reweighing to correct detected bias.",
      badgeCertified: "Certified Unbiased Algorithm (AIF360)",
      badgeStandard: "Standard Algorithm (Potential Bias)",
      auditLog: "Audit Log",
      genderParity: "Gender Parity",
      regionalParity: "Regional Parity",
      approvalRate: "Approval Rate",
    },
    technology: {
      title: "Technology Stack",
      subtitle:
        "Enterprise-grade AI architecture powered by state-of-the-art models.",
      layers: {
        docIntel: "Document Intelligence",
        nlp: "NLP & Classification",
        scoring: "Core Scoring Engine",
        xai: "XAI & Fairness",
        security: "Security & Contract",
      },
      systemStats: "Live System Monitor",
    },
    legal: {
      title: "Legal & Compliance",
      subtitle:
        "Built with strict adherence to Thai financial regulations and PDPA.",
      standards: "Compliance Standards",
      consumerRights: "Consumer Rights",
    },
    stats: {
      accuracy: "98.5%",
      accuracyLabel: "AI Accuracy",
      speed: "< 2s",
      speedLabel: "Processing Time",
      users: "50k+",
      usersLabel: "Freelancers Helped",
    },
    problemSolution: {
      problemTitle: "The Freelancer's Dilemma",
      problemDesc:
        "Traditional banks reject 70% of freelance loan applications due to 'unstable income' and lack of formal payslips.",
      solutionTitle: "The Equi Solution",
      solutionDesc:
        "We use alternative data—invoices, transaction history, and digital footprints—to build a fair, comprehensive credit profile.",
    },
  },
  th: {
    topbar: {
      technology: "Technology",
      legal: "Legal",
      enterpriseAI: "Enterprise AI",
      fairness: "Fairness",
      assessment: "Assessment",
    },
    hero: {
      badge: "LegalTech Competition Entry 2026",
      title: "Unlock Your Financial Potential with",
      subtitle:
        "AI-powered credit scoring for freelancers - Using Client-Side AI Simulation to analyze files and generate real-time transaction data.",
      startAssessment: "Start Assessment",
      viewFairness: "View AI Fairness",
    },
    features: {
      howItWorks: "How it works",
      title: "From file to score in seconds",
      card1: {
        title: "1. Upload Documents",
        desc: "Upload receipts or bank slips - The system analyzes the filename.",
      },
      card2: {
        title: "2. Client-Side AI",
        desc: "JavaScript Engine analyzes filenames and generates simulated transactions in real-time.",
      },
      card3: {
        title: "3. Get Score & Explanation",
        desc: "Equi-Score™ algorithm + SHAP Waterfall explains every factor affecting your score.",
      },
    },
    trust: {
      title: "Trusted by Modern Freelancers",
      desc: "Designed to look and feel like a bank-grade FinTech system, with AI Fairness Audit from 1,000 simulated applicants.",
      badges: {
        pdpa: "PDPA Compliant",
        bot: "BOT Guidelines",
        consumer: "Consumer Protection Act",
        aiEthics: "AI Ethics (EU AI Act)",
      },
      assessmentsRun: "assessments run today",
    },
    assessment: {
      title: "AI Credit Assessment",
      subtitle:
        "Upload your documents to get an instant credit score analysis.",
      uploadTitle: "Upload Financial Documents",
      uploadDesc: "Supports JPG, PNG, PDF. Max 5MB per file.",
      dragDrop: "Drag & drop files here, or click to select",
      processing: "Processing...",
      startAssessment: "Start Assessment",
      extractedTransactions: "Extracted Transactions",
      creditScore: "Credit Score",
      riskGrade: "Risk Grade",
      dispute: "Request Manual Review / Dispute Score",
      downloadReport: "Download Report",
      analyzing: "Analyzing Documents...",
      analyzingDesc: "Our AI is extracting data and calculating your score.",
      resultTitle: "Assessment Result",
      riskLevel: "Risk Level",
      maxLoan: "Max Loan Amount",
      interestRate: "Interest Rate",
      reset: "Start New Assessment",
    },
    fairness: {
      title: "AI Fairness Audit",
      subtitle:
        "Real-time monitoring of AI decision making to ensure equal opportunity.",
      auditTitle: "Audit Controls",
      auditDesc: "Run bias detection algorithms on the current model version.",
      runAudit: "Run Live Audit",
      auditing: "Auditing...",
      mitigation: "Enable AIF360 Mitigation",
      mitigationDesc: "Apply AIF360 reweighing to correct detected bias.",
      badgeCertified: "Certified Unbiased Algorithm (AIF360)",
      badgeStandard: "Standard Algorithm (Potential Bias)",
      auditLog: "Audit Log",
      genderParity: "Gender Parity",
      regionalParity: "Regional Parity",
      approvalRate: "Approval Rate",
    },
    technology: {
      title: "Technology Stack",
      subtitle:
        "Enterprise-grade AI architecture powered by state-of-the-art models.",
      layers: {
        docIntel: "Document Intelligence",
        nlp: "NLP & Classification",
        scoring: "Core Scoring Engine",
        xai: "XAI & Fairness",
        security: "Security & Contract",
      },
      systemStats: "Live System Monitor",
    },
    legal: {
      title: "Legal & Compliance",
      subtitle:
        "Built with strict adherence to Thai financial regulations and PDPA.",
      standards: "Compliance Standards",
      consumerRights: "Consumer Rights",
    },
    stats: {
      accuracy: "98.5%",
      accuracyLabel: "AI Accuracy",
      speed: "< 2s",
      speedLabel: "Processing Time",
      users: "50k+",
      usersLabel: "Freelancers Helped",
    },
    problemSolution: {
      problemTitle: "The Freelancer's Dilemma",
      problemDesc:
        "Traditional banks reject 70% of freelance loan applications due to 'unstable income' and lack of formal payslips.",
      solutionTitle: "The Equi Solution",
      solutionDesc:
        "We use alternative data—invoices, transaction history, and digital footprints—to build a fair, comprehensive credit profile.",
    },
  },
};
