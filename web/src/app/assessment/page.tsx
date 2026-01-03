"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gauge } from "@/components/Gauge";
import { Waterfall } from "@/components/Waterfall";
import {
  ocrImage,
  analyzeTransactions as analyzeWithApi,
  type Transaction,
  type AnalyzeResponse as CreditScoreResult,
} from "@/lib/api";
import { formatTHB, cn } from "@/lib/utils";
import { generatePDFReport } from "@/lib/pdfGenerator";
import { getModelVersionString } from "@/lib/modelRegistry";
import {
  UploadCloud,
  AlertCircle,
  BarChart3,
  Download,
  CheckCircle2,
  Cpu,
  Scale,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AssessmentPage() {
  const { t } = useLanguage();
  const [files, setFiles] = React.useState<File[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [result, setResult] = React.useState<CreditScoreResult | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [step, setStep] = React.useState<"upload" | "processing" | "result">(
    "upload"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [showToast, setShowToast] = React.useState(false);
  const [disputeId, setDisputeId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedBank, setSelectedBank] = React.useState<string>("");

  const handleDispute = () => {
    const id = `EQ-2026-${Math.floor(Math.random() * 10000)}`;
    setDisputeId(id);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  async function handleDownloadPDF() {
    if (!result) return;
    try {
      await generatePDFReport(result, transactions);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate PDF");
    }
  }

  async function runFlow() {
    setError(null);
    if (!files.length) {
      setError("Please upload at least one image.");
      return;
    }

    setBusy(true);
    setStep("processing");

    try {
      // Real Backend Integration
      const all: Transaction[] = [];
      for (const f of files) {
        // Call the backend OCR API with bank info
        const txns = await ocrImage(
          f,
          password || undefined,
          selectedBank || undefined
        );
        all.push(...txns);
      }
      setTransactions(all);

      // Call the backend Analysis API
      const analyzed = await analyzeWithApi(all);
      setResult(analyzed);
      setStep("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error");
      setStep("upload");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setFiles([]);
    setTransactions([]);
    setResult(null);
    setError(null);
    setStep("upload");
  }

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-purple-50/50 via-white to-purple-50/30 py-12">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/40 to-violet-200/40 blur-3xl animate-blob" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-pink-200/30 to-purple-200/30 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center rounded-full border border-purple-200 bg-purple-50/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-purple-700">
            <BarChart3 className="mr-2 h-4 w-4 animate-pulse" />
            AI Credit Assessment
          </div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            {t.assessment.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600">{t.assessment.subtitle}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50">
            <Cpu className="h-4 w-4 text-purple-500" />
            <span>Models: {getModelVersionString()}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column: Input & Data */}
          <div className="space-y-6">
            {/* Upload Card */}
            <Card
              className={cn(
                "transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 border-purple-100/50 backdrop-blur-sm bg-white/80",
                step === "result" ? "opacity-60 grayscale" : "animate-fade-in-up"
              )}
              style={{ animationDelay: '0.1s' }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white text-sm font-bold shadow-lg shadow-purple-500/30">
                    1
                  </div>
                  {t.assessment.uploadTitle}
                </CardTitle>
                <CardDescription>{t.assessment.uploadDesc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50/50 to-white px-6 py-10 transition-all duration-300 hover:border-purple-400 hover:bg-purple-50/70 hover:shadow-lg hover:shadow-purple-500/10 group">
                  <input
                    type="file"
                    multiple
                    accept="image/png,image/jpeg,application/pdf"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e) =>
                      setFiles(e.target.files ? Array.from(e.target.files) : [])
                    }
                    disabled={busy || step === "result"}
                  />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg shadow-purple-500/30 ring-4 ring-purple-100 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                    <UploadCloud className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm font-semibold text-purple-900">
                      {files.length > 0
                        ? `${files.length} file(s) selected`
                        : t.assessment.dragDrop}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                </div>

                {/* Bank Selection */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Bank / ธนาคาร
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    disabled={busy || step === "result"}
                  >
                    <option value="">-- Select Bank / เลือกธนาคาร --</option>
                    <option value="scb">SCB (ธนาคารไทยพาณิชย์)</option>
                    <option value="kbank">KBank (ธนาคารกสิกรไทย)</option>
                    <option value="bbl">BBL (ธนาคารกรุงเทพ)</option>
                    <option value="ktb">KTB (ธนาคารกรุงไทย)</option>
                    <option value="bay">BAY (ธนาคารกรุงศรีอยุธยา)</option>
                    <option value="tmb">TMB (ธนาคารทหารไทยธนชาต)</option>
                    <option value="gsb">GSB (ธนาคารออมสิน)</option>
                    <option value="baac">BAAC (ธ.ก.ส.)</option>
                    <option value="other">Other / อื่นๆ</option>
                  </select>
                  <p className="mt-1 text-xs text-slate-500">
                    💡 Selecting bank improves OCR accuracy
                  </p>
                </div>

                {/* Password Input for Encrypted PDFs */}
                {files.some((f) => f.name.toLowerCase().endsWith(".pdf")) && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      PDF Password (if encrypted)
                    </label>
                    <input
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password (e.g., 03112004)"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      disabled={busy || step === "result"}
                    />
                  </div>
                )}

                {error && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="mt-6 flex justify-end gap-3">
                  {step === "result" && (
                    <Button variant="outline" onClick={reset}>
                      Start Over
                    </Button>
                  )}
                  {step !== "result" && (
                    <Button
                      onClick={runFlow}
                      isLoading={busy}
                      disabled={!files.length}
                      variant="brand"
                      className="w-full sm:w-auto"
                    >
                      {busy
                        ? t.assessment.processing
                        : t.assessment.startAssessment}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Transactions Table (Visible after processing) */}
            {transactions.length > 0 && (
              <Card className="overflow-hidden animate-fade-in-up border-purple-100/50 backdrop-blur-sm bg-white/80 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white text-sm font-bold shadow-lg shadow-purple-500/30">
                      2
                    </div>
                    {t.assessment.extractedTransactions}
                  </CardTitle>
                  <CardDescription>
                    Data extracted via Typhoon OCR. Please verify completeness.
                  </CardDescription>
                </CardHeader>

                {/* Transaction Summary Cards */}
                <div className="px-6 pb-4 grid grid-cols-3 gap-4">
                  <div className="rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-white p-4 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-xs font-medium text-emerald-700 mb-1 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Total Income
                    </div>
                    <div className="text-2xl font-bold text-emerald-900">
                      {formatTHB(
                        transactions
                          .filter((t) => t.type === "Income")
                          .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {transactions.filter((t) => t.type === "Income").length}{" "}
                      transactions
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50 to-white p-4 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Total Expense
                    </div>
                    <div className="text-2xl font-bold text-amber-900">
                      {formatTHB(
                        transactions
                          .filter((t) => t.type === "Expense")
                          .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {transactions.filter((t) => t.type === "Expense").length}{" "}
                      transactions
                    </div>
                  </div>

                  <div className="rounded-xl border border-purple-200/50 bg-gradient-to-br from-purple-50 to-white p-4 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="text-xs font-medium text-purple-700 mb-1 flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                      Net Cash Flow
                    </div>
                    <div className="text-2xl font-bold text-purple-900">
                      {formatTHB(
                        transactions
                          .filter((t) => t.type === "Income")
                          .reduce((sum, t) => sum + t.amount, 0) -
                          transactions
                            .filter((t) => t.type === "Expense")
                            .reduce((sum, t) => sum + t.amount, 0)
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {transactions.length} total transactions
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100">
                  <div className="px-6 py-3 bg-slate-50 flex items-center justify-between">
                    <div className="text-xs font-medium text-slate-700">
                      Showing all {transactions.length} transactions
                    </div>
                    <div className="text-xs text-slate-500">
                      Scroll to view more ↓
                    </div>
                  </div>
                  <div className="max-h-[500px] overflow-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-purple-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3 font-semibold text-purple-900">
                            #
                          </th>
                          <th className="px-6 py-3 font-semibold text-purple-900">
                            Date
                          </th>
                          <th className="px-6 py-3 font-semibold text-purple-900">
                            Description
                          </th>
                          <th className="px-6 py-3 font-semibold text-purple-900">
                            Type
                          </th>
                          <th className="px-6 py-3 font-semibold text-purple-900 text-right">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((t, i) => (
                          <tr
                            key={i}
                            className="hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-6 py-3 text-slate-400 text-xs">
                              {i + 1}
                            </td>
                            <td className="px-6 py-3 text-slate-600 whitespace-nowrap">
                              {t.date}
                            </td>
                            <td className="px-6 py-3 text-slate-900 font-medium">
                              {t.description}
                            </td>
                            <td className="px-6 py-3">
                              <span
                                className={cn(
                                  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                  t.type === "Income"
                                    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                    : "bg-amber-50 text-amber-700 ring-amber-600/20"
                                )}
                              >
                                {t.type}
                              </span>
                            </td>
                            <td className="px-6 py-3 text-right font-semibold text-slate-900 tabular-nums">
                              {formatTHB(t.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {transactions.length > 10 && (
                    <div className="border-t border-slate-100 px-6 py-2 bg-slate-50 text-center">
                      <div className="text-xs text-slate-500">
                        ✓ All {transactions.length} transactions displayed above
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="space-y-6">
            {step === "result" && result ? (
              <div className="space-y-6 animate-fade-in-up">
                {/* Score Card */}
                <Card className="border-purple-100 bg-gradient-to-b from-white to-purple-50/30 shadow-2xl shadow-purple-900/10 hover:shadow-purple-900/20 transition-all duration-500 overflow-hidden relative">
                  {/* Glowing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-500/5" />
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl" />
                  <CardHeader className="pb-2 relative">
                    <CardTitle className="text-center text-purple-900 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 animate-pulse" />
                      {t.assessment.creditScore}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center pb-8 relative">
                    <Gauge value={result.credit_score} />
                    <div className="mt-4 flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-lg ring-1 ring-purple-200/50">
                      <span className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></span>
                      <span className="text-sm font-semibold text-slate-700">
                        {result.risk_grade}
                      </span>
                    </div>
                    <button
                      onClick={handleDispute}
                      className="mt-4 text-xs text-slate-400 hover:text-[#4E2A84] underline decoration-dotted underline-offset-4 transition-colors"
                    >
                      🚩 {t.assessment.dispute}
                    </button>
                  </CardContent>
                </Card>

                {/* Bank Report */}
                <Card className="border-purple-100/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                      Bank-Ready Report
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReportRow label="Industry" value={result.industry} />
                    <ReportRow
                      label="Est. Monthly Income"
                      value={formatTHB(result.monthly_income_est)}
                    />
                    <ReportRow
                      label="Proxy Net Profit"
                      value={formatTHB(result.proxy_net_profit)}
                    />
                    <div className="my-4 border-t border-dashed border-slate-200"></div>
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-medium text-slate-500">
                        Recommended Loan
                      </span>
                      <span className="text-xl font-bold text-purple-600">
                        {formatTHB(result.recommended_loan_amount)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Explainability */}
                <Card className="border-purple-100/50 bg-white/80 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
                      Score Factors (SHAP)
                    </CardTitle>
                    <CardDescription>Why you got this score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Waterfall contributions={result.shap.contributions} />
                  </CardContent>
                </Card>

                {/* Download PDF Button */}
                <Button
                  onClick={handleDownloadPDF}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-600/40 transition-all duration-300 hover:-translate-y-1"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Report as PDF
                </Button>

                {/* Legal Compliance Notice */}
                <Card className="border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-white backdrop-blur-sm overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl" />
                  <CardContent className="pt-4 pb-4 relative">
                    <div className="text-xs text-blue-800 space-y-2">
                      <div className="font-semibold flex items-center gap-2">
                        <Scale className="h-4 w-4 text-blue-600" />
                        Legal Compliance Notice
                      </div>
                      <p className="leading-relaxed">
                        การประเมินนี้ใช้ AI ที่ผ่านการตรวจสอบตาม{" "}
                        <strong>PDPA</strong> และ{" "}
                        <strong>BOT Guidelines</strong>
                        คุณมีสิทธิ์ร้องเรียน ขอคำอธิบาย
                        และทบทวนผลตามกฎหมายคุ้มครองผู้บริโภค
                      </p>
                      <div className="flex gap-2 pt-2">
                        <div className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] rounded-md font-medium">
                          ✓ PDPA Compliant
                        </div>
                        <div className="px-2 py-1 bg-blue-100 text-blue-700 text-[10px] rounded-md font-medium">
                          ✓ BOT Aligned
                        </div>
                        <div className="px-2 py-1 bg-purple-100 text-purple-700 text-[10px] rounded-md font-medium">
                          ✓ XAI Enabled
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Placeholder State */
              <div className="sticky top-24 rounded-2xl border border-dashed border-purple-200/50 bg-gradient-to-br from-white/50 to-purple-50/30 backdrop-blur-sm p-8 text-center animate-fade-in-up shadow-lg shadow-purple-500/5">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-violet-100 shadow-inner">
                  <BarChart3 className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  No Analysis Yet
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  Upload documents and run analysis to see your credit score and
                  report here.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-slate-900/95 backdrop-blur-sm px-5 py-4 text-white shadow-2xl shadow-slate-900/50 animate-fade-in-up border border-slate-700/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold">Dispute Registered</h4>
            <p className="text-xs text-slate-300">
              Reference ID: <span className="font-mono text-emerald-400">{disputeId}</span>. A compliance officer will review within 24 hours.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-slate-600">{label}</span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}
