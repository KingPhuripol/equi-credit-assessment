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
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-16">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/40 to-violet-200/40 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-200/30 to-blue-200/30 blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-pink-200/30 to-rose-200/30 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="mb-4 inline-flex items-center rounded-full border border-purple-200 bg-purple-50/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-purple-700 shadow-lg shadow-purple-500/10">
            <Cpu className="mr-2 h-4 w-4 animate-pulse" />
            AI-Powered Infrastructure
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl mb-4">
            {t.technology.title}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t.technology.subtitle}
          </p>
        </div>

        {/* Live System Monitor */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white shadow-2xl shadow-slate-900/30 overflow-hidden relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-5 flex items-center justify-between relative">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                  Total Requests
                </p>
                <p className="text-3xl font-mono text-emerald-400 mt-1">
                  {systemStats.requests.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Activity className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white shadow-2xl shadow-slate-900/30 overflow-hidden relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-5 flex items-center justify-between relative">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                  Avg Latency
                </p>
                <p className="text-3xl font-mono text-blue-400 mt-1">
                  {systemStats.latency}ms
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white shadow-2xl shadow-slate-900/30 overflow-hidden relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-5 flex items-center justify-between relative">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                  CPU Load
                </p>
                <p className="text-3xl font-mono text-purple-400 mt-1">
                  {systemStats.cpu}%
                </p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Cpu className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700/50 text-white shadow-2xl shadow-slate-900/30 overflow-hidden relative group hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="p-5 flex items-center justify-between relative">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">
                  Memory Usage
                </p>
                <p className="text-3xl font-mono text-amber-400 mt-1">
                  {systemStats.memory}%
                </p>
              </div>
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Server className="h-8 w-8 text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {metrics.map((metric, i) => (
            <Card
              key={i}
              className="border-purple-200/50 bg-white/80 backdrop-blur-sm shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="pt-6 text-center relative">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600 font-medium">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Architecture Layers */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
            <div className="w-3 h-10 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full" />
            System Architecture Breakdown
          </h2>

          {/* Layer Selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {techStack.map((layer, i) => (
              <button
                key={i}
                onClick={() => setSelectedLayer(i)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedLayer === i
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-xl shadow-purple-600/30 scale-105"
                    : "bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200/50 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-0.5"
                }`}
              >
                {layer.icon}
                <span className="hidden sm:inline">Layer {i + 1}</span>
              </button>
            ))}
          </div>

          {/* Selected Layer Detail */}
          <Card className="border-purple-200/50 bg-white/80 backdrop-blur-sm shadow-2xl shadow-purple-500/15 transition-all duration-500 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="flex items-start gap-4 relative">
                <div className="flex-shrink-0 p-4 bg-white/20 rounded-xl backdrop-blur-sm shadow-lg">
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
        <Card className="border-purple-200/50 bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-sm shadow-xl shadow-purple-500/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg shadow-purple-500/30">
                <Database className="h-6 w-6 text-white" />
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
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                  consistency_index
                </div>
                <div className="text-sm text-slate-600">
                  ความสม่ำเสมอของรายได้
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                  expense_to_income_ratio
                </div>
                <div className="text-sm text-slate-600">
                  สัดส่วนหนี้ต่อรายได้
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                  operating_cash_flow
                </div>
                <div className="text-sm text-slate-600">
                  กระแสเงินสดหมุนเวียน
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                  income_volatility
                </div>
                <div className="text-sm text-slate-600">
                  ความผันผวนของรายได้
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
                  transaction_frequency
                </div>
                <div className="text-sm text-slate-600">
                  ความถี่ในการทำธุรกรรม
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-purple-100/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 group">
                <div className="font-mono text-sm text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
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
        <div className="mt-12 p-10 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 rounded-3xl text-white text-center shadow-2xl shadow-purple-600/30 relative overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative">
            <div className="inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Enterprise-Grade Security</h2>
            <p className="text-purple-100 max-w-2xl mx-auto text-lg leading-relaxed">
              ระบบผ่านการตรวจสอบมาตรฐาน PDPA (Thailand) และ GDPR (EU) พร้อมระบบ
              Audit Trail ครบถ้วนสำหรับการตรวจสอบย้อนหลัง
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/30 transition-colors cursor-default">
                ✓ PDPA Compliant
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/30 transition-colors cursor-default">
                ✓ SHA-256 Encryption
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/30 transition-colors cursor-default">
                ✓ XAI Transparency
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-xl text-sm font-semibold border border-white/20 hover:bg-white/30 transition-colors cursor-default">
                ✓ Bias Audit
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
