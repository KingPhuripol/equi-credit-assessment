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
  Brain,
  FileSearch,
  BarChart3,
  Shield,
  Scale,
  Cpu,
  Database,
  Lock,
  CheckCircle2,
  Activity,
  Server,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const techStack = [
  {
    icon: <FileSearch className="h-8 w-8 text-purple-600" />,
    layer: "Document Intelligence Layer",
    task: "OCR & Key Information Extraction (KIE)",
    model: "Typhoon OCR (Thai LLM optimized)",
    technique: "Deep Learning-based OCR with Layout Analysis",
    architecture: "Donut (Document Understanding Transformer) / LayoutLMv3",
    why: "State-of-the-art for Thai documents - ได้รับการพัฒนาโดย SCB 10X/VISTEC เหมาะกับการอ่านลายมือและเอกสารไทยที่มี Layout ซับซ้อน",
    framework: "PaddleOCR + Transformers (Hugging Face)",
  },
  {
    icon: <Brain className="h-8 w-8 text-purple-600" />,
    layer: "NLP & Classification Layer",
    task: "Industry Classification & Transaction Categorization",
    model: "WangChanBERTa (wangchanberta-base-att-spm-uncased)",
    technique: "Zero-Shot Classification & Named Entity Recognition (NER)",
    architecture: "RoBERTa architecture trained on Thai corpus",
    why: "โมเดลภาษาไทยที่เทรนมากับคลังข้อมูลขนาดใหญ่ (Thai Wikipedia, Common Crawl) เข้าใจบริบทภาษาไทยดีเยี่ยม",
    framework: "Transformers + Zero-Shot Pipeline",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
    layer: "Core Scoring Engine",
    task: "Credit Scoring Regression/Classification",
    model: "XGBoost (Extreme Gradient Boosting)",
    technique: "Gradient Boosting on Decision Trees (GBDT)",
    architecture: "Ensemble of gradient-boosted decision trees",
    why: "มาตรฐานโลกของ FinTech และผู้ชนะ Kaggle ส่วนใหญ่สำหรับการทำ Scoring กับข้อมูลแบบตาราง (Tabular Data)",
    framework: "XGBoost / LightGBM with Feature Engineering",
  },
  {
    icon: <Scale className="h-8 w-8 text-purple-600" />,
    layer: "XAI & Fairness Layer",
    task: "Explainability & Bias Detection",
    model: "SHAP (SHapley Additive exPlanations)",
    technique: "Game Theory-based Feature Attribution",
    architecture: "Shapley Values + Disparate Impact Analysis",
    why: "อธิบาย Blackbox Model ได้อย่างถูกต้องตามหลักคณิตศาสตร์ และเป็นที่ยอมรับในกฎหมาย GDPR/PDPA",
    framework: "SHAP + AI Fairness 360 (AIF360) by IBM",
  },
  {
    icon: <Lock className="h-8 w-8 text-purple-600" />,
    layer: "Security & Contract Layer",
    task: "Contract Generation & Integrity Check",
    model: "SHA-256 Cryptographic Hashing",
    technique: "Tamper-proof Digital Signature",
    architecture: "Cryptographic Hash Function + PDF Generation",
    why: "ทุกครั้งที่เจนไฟล์ PDF สัญญา ระบบจะนำข้อมูลทั้งหมดมา Hash เก็บไว้ หากมีการแก้ไขตัวเลขแม้แต่จุดเดียว ค่า Hash จะเปลี่ยนทันที",
    framework: "jsPDF + CryptoJS (SHA-256)",
  },
];

export default function TechnologyPage() {
  const { t } = useLanguage();
  const [selectedLayer, setSelectedLayer] = React.useState(0);
  const [systemStats, setSystemStats] = React.useState({
    requests: 124,
    latency: 45,
    cpu: 12,
    memory: 34,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        requests: prev.requests + Math.floor(Math.random() * 5),
        latency: 40 + Math.floor(Math.random() * 15),
        cpu: 10 + Math.floor(Math.random() * 20),
        memory: 30 + Math.floor(Math.random() * 10),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: "OCR Accuracy (Thai)",
      value: "98.7%",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      label: "Credit Score AUROC",
      value: "0.89",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      label: "Fairness Parity (Gender)",
      value: "99.2%",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
    {
      label: "Processing Time",
      value: "<3s",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />,
    },
  ];

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
            <Cpu className="mr-2 h-4 w-4" />
            AI-Powered Infrastructure
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
            {t.technology.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t.technology.subtitle}
          </p>
        </div>

        {/* Live System Monitor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Total Requests
                </p>
                <p className="text-2xl font-mono text-emerald-400">
                  {systemStats.requests.toLocaleString()}
                </p>
              </div>
              <Activity className="h-8 w-8 text-emerald-500 opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Avg Latency
                </p>
                <p className="text-2xl font-mono text-blue-400">
                  {systemStats.latency}ms
                </p>
              </div>
              <Zap className="h-8 w-8 text-blue-500 opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  CPU Load
                </p>
                <p className="text-2xl font-mono text-purple-400">
                  {systemStats.cpu}%
                </p>
              </div>
              <Cpu className="h-8 w-8 text-purple-500 opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-slate-900 border-slate-800 text-white">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold">
                  Memory Usage
                </p>
                <p className="text-2xl font-mono text-amber-400">
                  {systemStats.memory}%
                </p>
              </div>
              <Server className="h-8 w-8 text-amber-500 opacity-50" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <Card
              key={i}
              className="border-purple-100 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-2">{metric.icon}</div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Architecture Layers */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            System Architecture Breakdown
          </h2>

          {/* Layer Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {techStack.map((layer, i) => (
              <button
                key={i}
                onClick={() => setSelectedLayer(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedLayer === i
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white text-slate-700 border border-slate-200 hover:border-purple-300"
                }`}
              >
                {layer.icon}
                <span className="hidden sm:inline">Layer {i + 1}</span>
              </button>
            ))}
          </div>

          {/* Selected Layer Detail */}
          <Card className="border-purple-200 bg-white shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  {techStack[selectedLayer].icon}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-purple-100 mb-1">
                    {techStack[selectedLayer].task}
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    {techStack[selectedLayer].layer}
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    {techStack[selectedLayer].technique}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    AI Model
                  </h3>
                  <p className="text-lg font-bold text-purple-600 mb-1">
                    {techStack[selectedLayer].model}
                  </p>
                  <p className="text-sm text-slate-600">
                    {techStack[selectedLayer].architecture}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    Framework
                  </h3>
                  <p className="text-sm font-mono bg-slate-100 px-3 py-2 rounded-md text-slate-700 border border-slate-200">
                    {techStack[selectedLayer].framework}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Why This Technology?
                </h3>
                <p className="text-slate-700 leading-relaxed bg-purple-50 p-4 rounded-lg border border-purple-100">
                  {techStack[selectedLayer].why}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Engineering Section */}
        <Card className="border-purple-100 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <CardTitle>Advanced Feature Engineering</CardTitle>
                <CardDescription>
                  ตัวแปรที่ระบบสร้างขึ้นเพื่อเพิ่มความแม่นยำของการประเมิน
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  consistency_index
                </div>
                <div className="text-sm text-slate-600">
                  ความสม่ำเสมอของรายได้
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  expense_to_income_ratio
                </div>
                <div className="text-sm text-slate-600">
                  สัดส่วนหนี้ต่อรายได้
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  operating_cash_flow
                </div>
                <div className="text-sm text-slate-600">
                  กระแสเงินสดหมุนเวียน
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  income_volatility
                </div>
                <div className="text-sm text-slate-600">
                  ความผันผวนของรายได้
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  transaction_frequency
                </div>
                <div className="text-sm text-slate-600">
                  ความถี่ในการทำธุรกรรม
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="font-mono text-sm text-purple-600 mb-1">
                  industry_risk_factor
                </div>
                <div className="text-sm text-slate-600">
                  ปัจจัยความเสี่ยงตามอาชีพ
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-white text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-purple-200" />
          <h2 className="text-2xl font-bold mb-2">Enterprise-Grade Security</h2>
          <p className="text-purple-100 max-w-2xl mx-auto">
            ระบบผ่านการตรวจสอบมาตรฐาน PDPA (Thailand) และ GDPR (EU) พร้อมระบบ
            Audit Trail ครบถ้วนสำหรับการตรวจสอบย้อนหลัง
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              ✓ PDPA Compliant
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              ✓ SHA-256 Encryption
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              ✓ XAI Transparency
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
              ✓ Bias Audit
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
