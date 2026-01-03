"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Scale,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Users,
  ScrollText,
  Lock,
  Eye,
  BookOpen,
  Gavel,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const complianceStandards = [
  {
    icon: <Shield className="h-8 w-8 text-emerald-600" />,
    name: "PDPA (Personal Data Protection Act)",
    status: "Fully Compliant",
    description: "ระบบปฏิบัติตามพ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562",
    details: [
      "✓ Consent Management - ขอความยินยอมก่อนเก็บข้อมูล",
      "✓ Data Minimization - เก็บเฉพาะข้อมูลที่จำเป็น",
      "✓ Right to Access - ผู้ใช้สามารถดาวน์โหลดข้อมูลของตนเอง",
      "✓ Right to Deletion - มีระบบลบข้อมูลตามคำขอ",
      "✓ Data Breach Notification - แจ้งเหตุรั่วไหลภายใน 72 ชั่วโมง",
    ],
  },
  {
    icon: <Scale className="h-8 w-8 text-blue-600" />,
    name: "BOT (Bank of Thailand) Guidelines",
    status: "Aligned",
    description: "สอดคล้องกับหลักเกณฑ์การให้สินเชื่อของธนาคารแห่งประเทศไทย",
    details: [
      "✓ Responsible Lending - คำนวณภาระหนี้ไม่เกิน 50% ของรายได้",
      "✓ Fair Credit Assessment - ไม่เลือกปฏิบัติตามเพศ/ภูมิภาค",
      "✓ Transparent Pricing - แสดงอัตราดอกเบี้ยและค่าธรรมเนียมชัดเจน",
      "✓ Consumer Protection - มีระบบร้องเรียนและทบทวนคะแนน",
    ],
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    name: "Consumer Protection Act B.E. 2522",
    status: "Compliant",
    description: "พ.ร.บ. คุ้มครองผู้บริโภค พ.ศ. 2522 และที่แก้ไขเพิ่มเติม",
    details: [
      "✓ Fair Contract Terms - สัญญาเป็นธรรม ไม่มีข้อกำหนดเอาเปรียบ",
      "✓ Clear Disclosure - เปิดเผยข้อมูลสินเชื่ออย่างชัดเจน",
      "✓ Cooling-off Period - มีช่วงเวลาพิจารณาก่อนลงนาม",
      "✓ Dispute Resolution - มีกลไกระงับข้อพิพาท",
    ],
  },
  {
    icon: <Eye className="h-8 w-8 text-amber-600" />,
    name: "AI Ethics & Transparency",
    status: "Best Practice",
    description: "หลักจริยธรรม AI ตามมาตรฐานสากล (EU AI Act, IEEE Standards)",
    details: [
      "✓ Explainable AI (XAI) - ใช้ SHAP อธิบายทุกการตัดสินใจ",
      "✓ Bias Auditing - ตรวจสอบความลำเอียงด้วย AIF360",
      "✓ Human-in-the-Loop - มนุษย์ตรวจสอบก่อน Auto-approve",
      "✓ Model Versioning - ติดตามเวอร์ชันโมเดลและผลกระทบ",
      "✓ Right to Explanation - ผู้ใช้มีสิทธิ์ขอคำอธิบายเพิ่มเติม",
    ],
  },
];

const consumerRights = [
  {
    right: "สิทธิในการรับทราบข้อมูล",
    description: "รู้ว่า AI ประเมินคะแนนอย่างไร มีปัจจัยอะไรบ้าง",
    action: "ดูใน SHAP Waterfall Chart",
  },
  {
    right: "สิทธิในการคัดค้าน",
    description: "ร้องเรียนคะแนนที่ไม่ถูกต้องผ่านระบบ Dispute",
    action: "กดปุ่ม 'Request Manual Review'",
  },
  {
    right: "สิทธิในการลบข้อมูล",
    description: "ขอให้ระบบลบข้อมูลส่วนบุคคลทั้งหมด",
    action: "ติดต่อ privacy@equi.co.th",
  },
  {
    right: "สิทธิในการเข้าถึงข้อมูล",
    description: "ดาวน์โหลดข้อมูลทั้งหมดที่ระบบเก็บ",
    action: "Download Data Export",
  },
  {
    right: "สิทธิในการแก้ไขข้อมูล",
    description: "แก้ไขข้อมูลที่ไม่ถูกต้อง",
    action: "ส่งคำขอผ่านแบบฟอร์ม",
  },
];

const auditLog = [
  {
    timestamp: "2026-01-03 14:32:15",
    action: "User uploaded 3 documents",
    user: "EQ-USER-7829",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:18",
    action: "OCR processing completed",
    model: "Typhoon-OCR-v2.0.1",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:20",
    action: "Credit score calculated: 687",
    model: "XGBoost-v3.2.0",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:22",
    action: "SHAP values computed",
    model: "SHAP-v0.45.0",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:25",
    action: "Fairness audit passed (Gender: 99.2%)",
    auditor: "AIF360",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:28",
    action: "Contract generated with SHA-256",
    hash: "a3f2c8...",
    status: "success",
  },
  {
    timestamp: "2026-01-03 14:32:30",
    action: "User consent logged (PDPA)",
    consent_id: "CONS-2026-001",
    status: "success",
  },
];

export default function LegalPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Gavel className="mr-2 h-4 w-4" />
            Legal & Compliance Center
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            {t.legal.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t.legal.subtitle}
          </p>
        </div>

        {/* Compliance Standards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            {t.legal.standards}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, i) => (
              <Card
                key={i}
                className="border-slate-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                      {standard.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {standard.name}
                      </CardTitle>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                        <CheckCircle2 className="h-3 w-3" />
                        {standard.status}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {standard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {standard.details.map((detail, j) => (
                      <li key={j} className="leading-relaxed">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Consumer Rights */}
        <div className="mb-16">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-white">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>สิทธิของผู้บริโภค (Consumer Rights)</CardTitle>
                  <CardDescription>
                    ตามพ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {consumerRights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg border border-purple-100"
                  >
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">
                        {item.right}
                      </h3>
                      <p className="text-sm text-slate-600 mb-2">
                        {item.description}
                      </p>
                      <div className="text-xs text-purple-600 font-medium">
                        → {item.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Trail */}
        <div className="mb-16">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <ScrollText className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <CardTitle>Audit Trail (ตัวอย่าง)</CardTitle>
                  <CardDescription>
                    ระบบบันทึกทุกขั้นตอนเพื่อความโปร่งใสและสามารถตรวจสอบย้อนหลังได้
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Timestamp
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Action
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Details
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLog.map((log, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-4 py-3 font-mono text-xs text-slate-600">
                          {log.timestamp}
                        </td>
                        <td className="px-4 py-3 text-slate-900">
                          {log.action}
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-xs font-mono">
                          {"model" in log && log.model}
                          {"hash" in log && log.hash}
                          {"user" in log && log.user}
                          {"auditor" in log && log.auditor}
                          {"consent_id" in log && log.consent_id}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                            <CheckCircle2 className="h-3 w-3" />
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <Lock className="h-4 w-4 inline mr-2" />
                <strong>Data Retention:</strong> Audit logs เก็บไว้ 7 ปี
                ตามกฎหมายกำหนด และเข้ารหัสด้วย AES-256
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regulatory Compliance CTA */}
        <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-blue-200" />
          <h2 className="text-2xl font-bold mb-2">ต้องการข้อมูลเพิ่มเติม?</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6">
            ดาวน์โหลดเอกสารฉบับเต็ม: Privacy Policy, Terms of Service, และ
            Compliance Report
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              📄 Privacy Policy (PDPA)
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              📜 Terms of Service
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
              📊 Compliance Report 2026
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 p-6 border-2 border-amber-300 bg-amber-50 rounded-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-2">
                📞 ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)
              </h3>
              <div className="text-sm text-amber-800 space-y-1">
                <p>
                  • Email: <strong>dpo@equi.co.th</strong>
                </p>
                <p>
                  • Tel: <strong>02-XXX-XXXX</strong>
                </p>
                <p>• ตอบกลับภายใน 30 วันตามกฎหมายกำหนด</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
