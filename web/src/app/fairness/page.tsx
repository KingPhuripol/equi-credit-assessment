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
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t.fairness.title}
            </h1>
            <p className="mt-2 text-slate-600">{t.fairness.subtitle}</p>
          </div>
          {/* Feature C: Badge */}
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border shadow-sm transition-colors ${
              isMitigated
                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                : "bg-amber-100 text-amber-800 border-amber-200"
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
        <Card className="mb-8 border-purple-100 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Audit Progress
                  </span>
                  <span className="text-sm font-medium text-purple-600">
                    {processedCount} / 1000 Applicants
                  </span>
                </div>
                <Progress
                  value={progress}
                  className="h-3 bg-slate-100"
                  indicatorClassName="bg-purple-600"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2 bg-slate-100 p-3 rounded-lg">
                  <Switch
                    id="mitigate-mode"
                    checked={isMitigated}
                    onCheckedChange={setIsMitigated}
                  />
                  <Label
                    htmlFor="mitigate-mode"
                    className="cursor-pointer font-medium"
                  >
                    {t.fairness.mitigation}
                  </Label>
                </div>

                <Button
                  onClick={runAudit}
                  disabled={isAuditing}
                  className="bg-[#4E2A84] hover:bg-[#3b1e66] min-w-[140px]"
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#4E2A84]" />
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
              <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                <span className="text-slate-600">Disparate Impact Ratio:</span>
                <span
                  className={`font-bold ${
                    isMitigated ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {isMitigated ? "0.99 (Excellent)" : "0.93 (Acceptable)"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Regional Fairness Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#4E2A84]" />
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
                      fill="#6C757D"
                      radius={[0, 4, 4, 0]}
                      animationDuration={1000}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3 text-sm">
                <span className="text-slate-600">Regional Parity Gap:</span>
                <span
                  className={`font-bold ${
                    isMitigated ? "text-emerald-600" : "text-red-500"
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
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Real-time Audit Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] overflow-y-auto rounded-md border bg-slate-900 p-4 font-mono text-xs text-green-400">
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
