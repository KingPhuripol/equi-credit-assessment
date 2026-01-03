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
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-16">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/40 to-cyan-200/40 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-20 right-1/3 h-72 w-72 rounded-full bg-gradient-to-br from-purple-200/30 to-violet-200/30 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-blue-700 shadow-lg shadow-blue-500/10">
            <Gavel className="mr-2 h-4 w-4 animate-pulse" />
            Legal & Compliance Center
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text">
            {t.legal.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.legal.subtitle}
          </p>
        </div>

        {/* Compliance Standards */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
            {t.legal.standards}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceStandards.map((standard, i) => (
              <Card
                key={i}
                className="border-slate-200/50 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1 group animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                      {standard.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {standard.name}
                      </CardTitle>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200/50 shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {standard.status}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3 text-slate-600">
                    {standard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {standard.details.map((detail, j) => (
                      <li key={j} className="leading-relaxed flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${j * 50}ms` }}>
                        <span className="text-emerald-500">✓</span>
                        <span>{detail.replace('✓ ', '')}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Consumer Rights */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="border-purple-200/50 bg-gradient-to-br from-purple-50/80 to-white backdrop-blur-sm shadow-xl shadow-purple-500/10 overflow-hidden relative">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg shadow-purple-500/30">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle>สิทธิของผู้บริโภค (Consumer Rights)</CardTitle>
                  <CardDescription>
                    ตามพ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-4">
                {consumerRights.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
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
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Card className="border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-500/10 overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl shadow-lg">
                  <ScrollText className="h-6 w-6 text-white" />
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
                        className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/50 transition-all duration-300 group"
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
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 rounded-xl text-sm text-blue-800 flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <strong>Data Retention:</strong> Audit logs เก็บไว้ 7 ปี ตามกฎหมายกำหนด และเข้ารหัสด้วย AES-256
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regulatory Compliance CTA */}
        <div className="p-10 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-3xl text-white text-center shadow-2xl shadow-blue-600/30 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative">
            <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">ต้องการข้อมูลเพิ่มเติม?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              ดาวน์โหลดเอกสารฉบับเต็ม: Privacy Policy, Terms of Service, และ Compliance Report
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                📄 Privacy Policy (PDPA)
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                📜 Terms of Service
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
                📊 Compliance Report 2026
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 p-6 border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg shadow-amber-500/10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl shadow-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-3 text-lg">
                📞 ติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO)
              </h3>
              <div className="text-sm text-amber-800 space-y-2">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Email: <strong className="text-amber-900">dpo@equi.co.th</strong>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Tel: <strong className="text-amber-900">02-XXX-XXXX</strong>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  ตอบกลับภายใน 30 วันตามกฎหมายกำหนด
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
