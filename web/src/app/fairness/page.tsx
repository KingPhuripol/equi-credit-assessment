"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Scale,
  MapPin,
  Users,
  Play,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Initial biased data (simulated)
const initialData = {
  gender: {
    male: { rate: 88, total: 520 },
    female: { rate: 82, total: 480 },
  },
  region: {
    bangkok: { rate: 90, total: 600 },
    upcountry: { rate: 75, total: 400 },
  },
};

// Mitigated data (simulated AIF360 reweighing)
const mitigatedData = {
  gender: {
    male: { rate: 86, total: 520 },
    female: { rate: 86, total: 480 },
  },
  region: {
    bangkok: { rate: 85, total: 600 },
    upcountry: { rate: 84, total: 400 },
  },
};

export default function FairnessPage() {
  const { t } = useLanguage();
  const [isAuditing, setIsAuditing] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [processedCount, setProcessedCount] = React.useState(0);
  const [isMitigated, setIsMitigated] = React.useState(false);
  const [currentData, setCurrentData] = React.useState(initialData);
  const [auditComplete, setAuditComplete] = React.useState(false);

  const runAudit = () => {
    setIsAuditing(true);
    setProgress(0);
    setProcessedCount(0);
    setAuditComplete(false);
  };

  React.useEffect(() => {
    if (isAuditing) {
      const interval = setInterval(() => {
        setProcessedCount((prev) => {
          const next = prev + 25;
          if (next >= 1000) {
            clearInterval(interval);
            setIsAuditing(false);
            setAuditComplete(true);
            return 1000;
          }
          return next;
        });
        setProgress((prev) => {
          const next = prev + 2.5;
          return next > 100 ? 100 : next;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAuditing]);

  React.useEffect(() => {
    if (isMitigated) {
      setCurrentData(mitigatedData);
    } else {
      setCurrentData(initialData);
    }
  }, [isMitigated]);

  const genderChartData = [
    {
      name: "Male",
      approvalRate: currentData.gender.male.rate,
      applicants: currentData.gender.male.total,
    },
    {
      name: "Female",
      approvalRate: currentData.gender.female.rate,
      applicants: currentData.gender.female.total,
    },
  ];

  const regionChartData = [
    {
      name: "Bangkok",
      approvalRate: currentData.region.bangkok.rate,
      applicants: currentData.region.bangkok.total,
    },
    {
      name: "Upcountry",
      approvalRate: currentData.region.upcountry.rate,
      applicants: currentData.region.upcountry.total,
    },
  ];

  return (
    <main className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-12">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-200/40 blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/30 to-violet-200/30 blur-3xl animate-blob-slow" />
        <div className="absolute -bottom-20 left-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-emerald-700">
              <Scale className="mr-2 h-4 w-4 animate-pulse" />
              AI Fairness Audit
            </div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              {t.fairness.title}
            </h1>
            <p className="mt-3 text-lg text-slate-600">{t.fairness.subtitle}</p>
          </div>
          {/* Feature C: Badge */}
          <div
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold border-2 shadow-lg transition-all duration-500 ${
              isMitigated
                ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border-emerald-300 shadow-emerald-500/20"
                : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-300 shadow-amber-500/20"
            }`}
          >
            {isMitigated ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <Scale className="h-5 w-5" />
            )}
            {isMitigated ? t.fairness.badgeCertified : t.fairness.badgeStandard}
          </div>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 border-purple-200/50 shadow-xl shadow-purple-500/10 bg-white/80 backdrop-blur-sm overflow-hidden relative animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Audit Progress
                  </span>
                  <span className="text-sm font-semibold text-purple-600">
                    {processedCount} / 1000 Applicants
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-4 bg-slate-100 rounded-full overflow-hidden"
                  indicatorClassName="bg-gradient-to-r from-purple-500 to-violet-600 transition-all duration-300"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-50 to-slate-100 p-4 rounded-xl border border-slate-200/50 shadow-inner">
                  <Switch
                    id="mitigate-mode"
                    checked={isMitigated}
                    onCheckedChange={setIsMitigated}
                  />
                  <Label
                    htmlFor="mitigate-mode"
                    className="cursor-pointer font-semibold text-slate-700"
                  >
                    {t.fairness.mitigation}
                  </Label>
                </div>

                <Button
                  onClick={runAudit}
                  disabled={isAuditing}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 min-w-[160px] shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      {t.fairness.auditing}
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      {t.fairness.runAudit}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Gender Parity Chart */}
          <Card className="border-purple-100/50 bg-white/80 backdrop-blur-sm shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle>{t.fairness.genderParity}</CardTitle>
              </div>
              <CardDescription>
                Approval rates across genders (Target: Equal)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genderChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      cursor={{ fill: "transparent" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="approvalRate"
                      name="Approval Rate (%)"
                      fill="#4E2A84"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-4 text-sm border border-slate-200/50">
                <span className="text-slate-600 font-medium">Disparate Impact Ratio:</span>
                <span
                  className={`font-bold px-3 py-1 rounded-full ${
                    isMitigated ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {isMitigated ? "0.99 (Excellent)" : "0.93 (Acceptable)"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Regional Fairness Chart */}
          <Card className="border-purple-100/50 bg-white/80 backdrop-blur-sm shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/15 transition-all duration-500 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle>{t.fairness.regionalParity}</CardTitle>
              </div>
              <CardDescription>
                Approval rates: Bangkok vs. Upcountry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" unit="%" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                      cursor={{ fill: "transparent" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="approvalRate"
                      name="Approval Rate (%)"
                      fill="url(#barGradient)"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4E2A84" />
                        <stop offset="100%" stopColor="#7c3aed" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-4 text-sm border border-slate-200/50">
                <span className="text-slate-600 font-medium">Regional Parity Gap:</span>
                <span
                  className={`font-bold px-3 py-1 rounded-full ${
                    isMitigated ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {isMitigated
                    ? "1.2% (Negligible)"
                    : "15.0% (Significant Bias)"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audit Log */}
        <Card className="mt-6 border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-xl shadow-slate-500/10 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Real-time Audit Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] overflow-y-auto rounded-xl border border-slate-700/50 bg-gradient-to-br from-slate-900 to-slate-800 p-4 font-mono text-xs text-green-400 shadow-inner">
              {processedCount > 0 && (
                <>
                  <div className="mb-1 opacity-50">
                    Initializing AIF360 audit engine...
                  </div>
                  <div className="mb-1 opacity-50">
                    Loading 1,000 applicant profiles...
                  </div>
                  {Array.from({
                    length: Math.min(Math.floor(processedCount / 50), 10),
                  }).map((_, i) => (
                    <div key={i} className="mb-1">
                      [AUDIT] Batch #{i + 1}: Processed 50 applicants. Bias
                      detected:{" "}
                      {isMitigated ? "None" : "Gender/Region skew found"}.
                    </div>
                  ))}
                  {auditComplete && (
                    <>
                      <div className="mt-2 text-emerald-400 font-bold">
                        ✓ Audit Complete.{" "}
                        {isMitigated
                          ? "Algorithm is FAIR."
                          : "Algorithm shows BIAS."}
                      </div>
                      <div className="text-emerald-400">
                        Generating compliance report hash:{" "}
                        {Math.random().toString(36).substring(7)}...
                      </div>
                    </>
                  )}
                </>
              )}
              {processedCount === 0 && (
                <div className="text-slate-500 italic">
                  Ready to start audit...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
