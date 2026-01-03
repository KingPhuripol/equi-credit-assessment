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
      technology: "เทคโนโลยี",
      legal: "กฎหมาย",
      enterpriseAI: "Enterprise AI",
      fairness: "ความเป็นธรรม",
      assessment: "ประเมินเครดิต",
    },
    hero: {
      badge: "LegalTech Competition Entry 2026",
      title: "ปลดล็อกศักยภาพทางการเงินของคุณด้วย",
      subtitle:
        "AI ประเมินเครดิตสำหรับฟรีแลนซ์ - ใช้ Client-Side AI Simulation วิเคราะห์ไฟล์และสร้างข้อมูลธุรกรรมแบบเรียลไทม์",
      startAssessment: "เริ่มประเมินเครดิต",
      viewFairness: "ดูความเป็นธรรม AI",
    },
    features: {
      howItWorks: "วิธีการทำงาน",
      title: "จากไฟล์สู่คะแนนในไม่กี่วินาที",
      card1: {
        title: "1. อัปโหลดเอกสาร",
        desc: "อัปโหลดใบเสร็จหรือสลิปธนาคาร - ระบบจะวิเคราะห์ชื่อไฟล์",
      },
      card2: {
        title: "2. Client-Side AI",
        desc: "JavaScript Engine วิเคราะห์ชื่อไฟล์และสร้างธุรกรรมจำลองแบบเรียลไทม์",
      },
      card3: {
        title: "3. รับคะแนนและคำอธิบาย",
        desc: "Equi-Score™ + SHAP Waterfall อธิบายทุกปัจจัยที่ส่งผลต่อคะแนนของคุณ",
      },
    },
    trust: {
      title: "ได้รับความไว้วางใจจากฟรีแลนซ์ยุคใหม่",
      desc: "ออกแบบให้ดูและรู้สึกเหมือนระบบ FinTech ระดับธนาคาร พร้อม AI Fairness Audit จากผู้สมัคร 1,000 คน",
      badges: {
        pdpa: "เป็นไปตาม PDPA",
        bot: "แนวปฏิบัติ ธปท.",
        consumer: "พ.ร.บ. คุ้มครองผู้บริโภค",
        aiEthics: "จริยธรรม AI (EU AI Act)",
      },
      assessmentsRun: "การประเมินวันนี้",
    },
    assessment: {
      title: "AI ประเมินเครดิต",
      subtitle:
        "อัปโหลดเอกสารเพื่อรับการวิเคราะห์คะแนนเครดิตทันที",
      uploadTitle: "อัปโหลดเอกสารทางการเงิน",
      uploadDesc: "รองรับ JPG, PNG, PDF สูงสุด 5MB ต่อไฟล์",
      dragDrop: "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือก",
      processing: "กำลังประมวลผล...",
      startAssessment: "เริ่มประเมิน",
      extractedTransactions: "ธุรกรรมที่สกัดได้",
      creditScore: "คะแนนเครดิต",
      riskGrade: "ระดับความเสี่ยง",
      dispute: "ขอตรวจสอบด้วยตนเอง / โต้แย้งคะแนน",
      downloadReport: "ดาวน์โหลดรายงาน",
      analyzing: "กำลังวิเคราะห์เอกสาร...",
      analyzingDesc: "AI กำลังสกัดข้อมูลและคำนวณคะแนนของคุณ",
      resultTitle: "ผลการประเมิน",
      riskLevel: "ระดับความเสี่ยง",
      maxLoan: "วงเงินกู้สูงสุด",
      interestRate: "อัตราดอกเบี้ย",
      reset: "เริ่มการประเมินใหม่",
    },
    fairness: {
      title: "AI Fairness Audit",
      subtitle:
        "ตรวจสอบการตัดสินใจของ AI แบบเรียลไทม์เพื่อให้แน่ใจว่ามีโอกาสที่เท่าเทียมกัน",
      auditTitle: "การควบคุม Audit",
      auditDesc: "รัน bias detection algorithms บนโมเดลเวอร์ชันปัจจุบัน",
      runAudit: "รัน Live Audit",
      auditing: "กำลังตรวจสอบ...",
      mitigation: "เปิดใช้งาน AIF360 Mitigation",
      mitigationDesc: "ใช้ AIF360 reweighing เพื่อแก้ไข bias ที่ตรวจพบ",
      badgeCertified: "อัลกอริทึมที่ได้รับการรับรองว่าไม่มีอคติ (AIF360)",
      badgeStandard: "อัลกอริทึมมาตรฐาน (อาจมี Bias)",
      auditLog: "Audit Log",
      genderParity: "ความเท่าเทียมทางเพศ",
      regionalParity: "ความเท่าเทียมระดับภูมิภาค",
      approvalRate: "อัตราการอนุมัติ",
    },
    technology: {
      title: "Technology Stack",
      subtitle:
        "สถาปัตยกรรม AI ระดับ Enterprise ขับเคลื่อนด้วยโมเดลล่าสุด",
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
      title: "กฎหมายและการปฏิบัติตามข้อกำหนด",
      subtitle:
        "สร้างขึ้นตามกฎระเบียบทางการเงินของไทยและ PDPA อย่างเคร่งครัด",
      standards: "มาตรฐานการปฏิบัติตาม",
      consumerRights: "สิทธิผู้บริโภค",
    },
    stats: {
      accuracy: "98.5%",
      accuracyLabel: "ความแม่นยำ AI",
      speed: "< 2 วิ",
      speedLabel: "เวลาประมวลผล",
      users: "50k+",
      usersLabel: "ฟรีแลนซ์ที่ได้รับความช่วยเหลือ",
    },
    problemSolution: {
      problemTitle: "ปัญหาของฟรีแลนซ์",
      problemDesc:
        "ธนาคารแบบดั้งเดิมปฏิเสธ 70% ของใบสมัครสินเชื่อฟรีแลนซ์เนื่องจาก 'รายได้ไม่แน่นอน' และไม่มีสลิปเงินเดือน",
      solutionTitle: "โซลูชันของ Equi",
      solutionDesc:
        "เราใช้ข้อมูลทางเลือก—ใบแจ้งหนี้ ประวัติธุรกรรม และ digital footprints—เพื่อสร้างโปรไฟล์เครดิตที่ยุติธรรมและครอบคลุม",
    },
  },
};
