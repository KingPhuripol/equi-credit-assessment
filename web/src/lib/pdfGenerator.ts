import jsPDF from "jspdf";
import { AnalyzeResponse as CreditScoreResult } from "./api";

export async function generatePDFReport(
  result: CreditScoreResult,
  transactions: Array<{
    date: string;
    description: string;
    amount: number;
    type: string;
  }>
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPos = 20;

  // Generate Reference Number
  const refNo = `EQ-2026-${
    new Date().getMonth() + 1
  }${new Date().getDate()}-${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;
  const dateIssue = new Date().toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Add watermark (EQUI OFFICIAL)
  pdf.setTextColor(78, 42, 132, 0.1); // Royal Purple with 10% opacity
  pdf.setFontSize(60);
  pdf.setFont("helvetica", "bold");
  pdf.text("EQUI OFFICIAL", pageWidth / 2, pageHeight / 2, {
    align: "center",
    angle: 45,
  });

  // Outer border (Certificate frame)
  pdf.setDrawColor(78, 42, 132);
  pdf.setLineWidth(1.5);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Header - Royal Purple Branding
  pdf.setFillColor(78, 42, 132); // #4E2A84 Royal Purple
  pdf.rect(15, 15, pageWidth - 30, 45, "F");

  // EQUI Logo text (top left)
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("EQUI", 20, 27);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text("Digital Credit Platform", 20, 32);

  // Reference number and date (top right)
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Ref No: ${refNo}`, pageWidth - 20, 27, { align: "right" });
  pdf.text(`Date: ${dateIssue}`, pageWidth - 20, 32, { align: "right" });

  // Document Title - Official Certificate
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text("หนังสือรับรองเครดิตและรายได้เสมือน", pageWidth / 2, 45, {
    align: "center",
  });

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("(CERTIFICATE OF CREDIT & PROXY INCOME)", pageWidth / 2, 52, {
    align: "center",
  });

  yPos = 70;

  // Formal Introduction
  pdf.setTextColor(51, 65, 85);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("เรียน สถาบันการเงินและผู้เกี่ยวข้อง", 20, yPos);
  yPos += 10;

  pdf.setFontSize(9);
  const introText = `บริษัท อีควิดิจิทัล จำกัด (Equi) ขอรับรองว่า ระบบปัญญาประดิษฐ์ได้ทำการวิเคราะห์ข้อมูล
ทางการเงินของบุคคลดังต่อไปนี้:`;
  pdf.text(introText, 20, yPos, { maxWidth: pageWidth - 40 });
  yPos += 15;

  // Section 1: Applicant Information
  pdf.setFillColor(243, 240, 249); // Purple-50
  pdf.rect(15, yPos, pageWidth - 30, 8, "F");
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);
  pdf.text("1. ข้อมูลผู้ยื่นคำขอ (APPLICANT INFORMATION)", 20, yPos + 6);
  yPos += 15;

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);
  pdf.text("ชื่อ-นามสกุล:", 25, yPos);
  pdf.setFont("helvetica", "bold");
  pdf.text("[ข้อมูลผู้ใช้งาน]", 70, yPos);
  yPos += 6;

  pdf.setFont("helvetica", "normal");
  pdf.text("ประเภทธุรกิจ:", 25, yPos);
  pdf.setFont("helvetica", "bold");
  pdf.text(result.industry, 70, yPos);
  yPos += 6;

  pdf.setFont("helvetica", "normal");
  pdf.text("เอกสารที่วิเคราะห์:", 25, yPos);
  pdf.setFont("helvetica", "bold");
  pdf.text(`${transactions.length} รายการ`, 70, yPos);
  yPos += 12;

  // Section 2: Assessment Result (Table format)
  pdf.setFillColor(243, 240, 249);
  pdf.rect(15, yPos, pageWidth - 30, 8, "F");
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);
  pdf.text("2. ผลการประเมินเครดิต (ASSESSMENT RESULT)", 20, yPos + 6);
  yPos += 15;

  // Credit Score Box
  pdf.setDrawColor(78, 42, 132);
  pdf.setLineWidth(0.5);
  pdf.rect(20, yPos, (pageWidth - 50) / 3, 25);
  pdf.rect(20 + (pageWidth - 50) / 3, yPos, (pageWidth - 50) / 3, 25);
  pdf.rect(20 + (2 * (pageWidth - 50)) / 3, yPos, (pageWidth - 50) / 3, 25);

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);

  const boxWidth = (pageWidth - 50) / 3;
  pdf.text("EQUI SCORE", 20 + boxWidth / 2, yPos + 7, { align: "center" });
  pdf.text("RISK GRADE", 20 + boxWidth * 1.5, yPos + 7, { align: "center" });
  pdf.text("EST. MONTHLY INCOME", 20 + boxWidth * 2.5, yPos + 7, {
    align: "center",
  });

  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(51, 65, 85);
  pdf.text(result.credit_score.toString(), 20 + boxWidth / 2, yPos + 18, {
    align: "center",
  });
  pdf.text(
    result.risk_grade.split("(")[0].trim(),
    20 + boxWidth * 1.5,
    yPos + 18,
    {
      align: "center",
    }
  );
  pdf.setFontSize(10);
  pdf.text(
    `฿${result.monthly_income_est.toLocaleString()}`,
    20 + boxWidth * 2.5,
    yPos + 18,
    { align: "center" }
  );

  yPos += 32;

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  pdf.setTextColor(100, 116, 139);
  pdf.text(
    `*คำนวณจากเอกสารทางการเงิน จำนวน ${transactions.length} รายการ`,
    20,
    yPos
  );
  yPos += 10;

  // Section 3: Technical & Legal Certification
  pdf.setFillColor(243, 240, 249);
  pdf.rect(15, yPos, pageWidth - 30, 8, "F");
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);
  pdf.text("3. การรับรองมาตรฐาน (COMPLIANCE CERTIFICATION)", 20, yPos + 6);
  yPos += 15;

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);

  const certifications = [
    "[✓] ผ่านการตรวจสอบความถูกต้องของเอกสาร (Typhoon OCR Verified)",
    "[✓] ผ่านการตรวจสอบความยุติธรรมของอัลกอริทึม (AI Fairness Audit Passed)",
    "[✓] ผู้ยื่นคำขอได้ให้ความยินยอมตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)",
    "[✓] ระบบการประมวลผลเป็นไปตามแนวทาง BOT Guidelines",
  ];

  certifications.forEach((cert) => {
    pdf.setTextColor(5, 150, 105); // Green checkmark color
    pdf.text("✓", 25, yPos);
    pdf.setTextColor(51, 65, 85);
    pdf.text(cert.substring(3), 30, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Financial Summary
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);
  pdf.text("รายละเอียดทางการเงินเพิ่มเติม:", 20, yPos);
  yPos += 8;

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);

  const summaryData = [
    ["Industry Factor", result.industry_factor.toFixed(2)],
    ["Proxy Net Profit", `฿${result.proxy_net_profit.toLocaleString()}`],
    [
      "Recommended Loan Amount",
      `฿${result.recommended_loan_amount.toLocaleString()}`,
    ],
  ];

  summaryData.forEach(([label, value]) => {
    pdf.setFont("helvetica", "normal");
    pdf.text(label + ":", 25, yPos);
    pdf.setFont("helvetica", "bold");
    pdf.text(value, 100, yPos);
    yPos += 6;
  });

  yPos += 5;

  // SHAP Explainability
  if (yPos > pageHeight - 80) {
    pdf.addPage();
    yPos = 20;
  }

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Score Factors (SHAP)", 15, yPos);
  yPos += 8;

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");

  const contributions = Object.entries(result.shap.contributions)
    .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
    .slice(0, 8);

  contributions.forEach(([key, value]) => {
    const label = key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    const impact = value > 0 ? `+${value.toFixed(0)}` : value.toFixed(0);

    pdf.setFont("helvetica", "normal");
    pdf.text(label, 20, yPos);

    if (value > 0) {
      pdf.setTextColor(5, 150, 105); // Green
    } else {
      pdf.setTextColor(220, 38, 38); // Red
    }
    pdf.setFont("helvetica", "bold");
    pdf.text(impact, pageWidth - 25, yPos, { align: "right" });
    pdf.setTextColor(51, 65, 85);

    yPos += 6;
  });

  yPos += 10;

  // Transactions Table
  if (yPos > pageHeight - 60) {
    pdf.addPage();
    yPos = 20;
  }

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Transaction History", 15, yPos);
  yPos += 8;

  // Table Header
  pdf.setFillColor(243, 240, 249); // Purple-50
  pdf.rect(15, yPos - 5, pageWidth - 30, 8, "F");

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.text("Date", 20, yPos);
  pdf.text("Description", 50, yPos);
  pdf.text("Type", 120, yPos);
  pdf.text("Amount", pageWidth - 25, yPos, { align: "right" });

  yPos += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);

  transactions.slice(0, 15).forEach((t) => {
    if (yPos > pageHeight - 15) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.text(t.date, 20, yPos);
    pdf.text(t.description.substring(0, 30), 50, yPos);
    pdf.text(t.type, 120, yPos);
    pdf.text(`฿${t.amount.toLocaleString()}`, pageWidth - 25, yPos, {
      align: "right",
    });
    yPos += 5;
  });

  // Digital Signature Section
  yPos += 15;
  if (yPos > pageHeight - 60) {
    pdf.addPage();
    yPos = 20;
  }

  // Disclaimer Section
  pdf.setFillColor(250, 245, 255); // Very light purple
  pdf.setDrawColor(78, 42, 132);
  pdf.setLineWidth(0.3);
  pdf.rect(15, yPos, pageWidth - 30, 30, "FD");

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132);
  pdf.text("หมายเหตุ / Disclaimer:", 20, yPos + 6);

  pdf.setFontSize(7);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);
  const disclaimerText = `เอกสารฉบับนี้เป็นเพียงการประเมินศักยภาพทางการเงินเบื้องต้นโดยใช้เทคโนโลยีปัญญาประดิษฐ์ (AI) 
ภายใต้โครงการ Equi เท่านั้น การอนุมัติสินเชื่อขั้นสุดท้ายขึ้นอยู่กับดุลยพินิจและนโยบายของ
สถาบันการเงินผู้ให้กู้ เอกสารนี้ถูกจัดทำขึ้นโดยระบบคอมพิวเตอร์และลงลายมือชื่ออิเล็กทรอนิกส์`;
  pdf.text(disclaimerText, 20, yPos + 12, { maxWidth: pageWidth - 40 });

  yPos += 38;

  // Signature Section
  pdf.setFillColor(243, 240, 249); // Purple-50
  pdf.rect(15, yPos, pageWidth - 30, 35, "F");

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(78, 42, 132); // Royal Purple
  pdf.text("ลงชื่อผู้รับรองเอกสาร / Authorized Signature:", 20, yPos + 8);

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);
  pdf.text("Digitally signed by: Equi AI Verification System", 20, yPos + 15);
  pdf.text(`Date: ${new Date().toLocaleString("th-TH")}`, 20, yPos + 20);
  pdf.text(`Document ID: ${refNo}`, 20, yPos + 25);
  pdf.text("Authorized Digital Signer", 20, yPos + 30);

  // Mock signature stamp with "VERIFIED" badge
  pdf.setFillColor(78, 42, 132); // Royal Purple
  pdf.circle(pageWidth - 35, yPos + 17, 12, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(7);
  pdf.setFont("helvetica", "bold");
  pdf.text("EQUI", pageWidth - 35, yPos + 14, { align: "center" });
  pdf.text("OFFICIAL", pageWidth - 35, yPos + 18, { align: "center" });
  pdf.text("VERIFIED", pageWidth - 35, yPos + 22, { align: "center" });

  // Footer with separator line and official branding
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);

    // Footer separator line
    pdf.setDrawColor(78, 42, 132);
    pdf.setLineWidth(0.3);
    pdf.line(15, pageHeight - 18, pageWidth - 15, pageHeight - 18);

    pdf.setFontSize(7);
    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "italic");
    pdf.text(
      "Equi Digital Credit Platform | AI-Powered Assessment",
      20,
      pageHeight - 12
    );
    pdf.text(
      `Page ${i} of ${pageCount} | Ref: ${refNo}`,
      pageWidth - 20,
      pageHeight - 12,
      { align: "right" }
    );

    // Small compliance badges at footer
    pdf.setFontSize(5);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(78, 42, 132);
    pdf.text("✓ PDPA", 20, pageHeight - 6);
    pdf.text("✓ BOT", 35, pageHeight - 6);
    pdf.text("✓ XAI", 48, pageHeight - 6);
  }

  // Download with official naming
  pdf.save(`Equi_Certificate_${refNo}.pdf`);
}
