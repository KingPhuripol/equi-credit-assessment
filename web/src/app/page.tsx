"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  ScanLine,
  BarChart3,
  Lightbulb,
  Upload,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50 py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 via-transparent to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl mb-6">
              {t.hero.title} <span className="text-purple-600">Equi AI</span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-slate-700 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="group bg-[#4E2A84] hover:bg-[#3b1e66] text-white"
                >
                  {t.hero.startAssessment}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/fairness">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-purple-600 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                >
                  {t.hero.viewFairness}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#4E2A84] py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 text-center">
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white mb-2">
                <TrendingUp className="h-6 w-6" />
              </div>
              <dd className="text-4xl font-bold tracking-tight text-white">
                {t.stats.accuracy}
              </dd>
              <dt className="text-base leading-7 text-purple-200">
                {t.stats.accuracyLabel}
              </dt>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white mb-2">
                <Clock className="h-6 w-6" />
              </div>
              <dd className="text-4xl font-bold tracking-tight text-white">
                {t.stats.speed}
              </dd>
              <dt className="text-base leading-7 text-purple-200">
                {t.stats.speedLabel}
              </dt>
            </div>
            <div className="flex flex-col items-center gap-y-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 text-white mb-2">
                <Users className="h-6 w-6" />
              </div>
              <dd className="text-4xl font-bold tracking-tight text-white">
                {t.stats.users}
              </dd>
              <dt className="text-base leading-7 text-purple-200">
                {t.stats.usersLabel}
              </dt>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem */}
            <div className="relative p-8 rounded-3xl bg-red-50 border border-red-100">
              <div className="absolute -top-6 -left-6 bg-red-100 p-4 rounded-2xl">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-4">
                {t.problemSolution.problemTitle}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.problemSolution.problemDesc}
              </p>
            </div>

            {/* Solution */}
            <div className="relative p-8 rounded-3xl bg-green-50 border border-green-100">
              <div className="absolute -top-6 -left-6 bg-green-100 p-4 rounded-2xl">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-4">
                {t.problemSolution.solutionTitle}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                {t.problemSolution.solutionDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="text-lg font-semibold leading-7 text-purple-600 mb-2">
              {t.features.howItWorks}
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {t.features.title}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload className="h-8 w-8 text-purple-600" />}
              title={t.features.card1.title}
              desc={t.features.card1.desc}
            />
            <FeatureCard
              icon={<ScanLine className="h-8 w-8 text-purple-600" />}
              title={t.features.card2.title}
              desc={t.features.card2.desc}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-purple-600" />}
              title={t.features.card3.title}
              desc={t.features.card3.desc}
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 px-6 py-16 sm:px-16 lg:flex lg:items-center lg:justify-between shadow-2xl shadow-purple-900/20">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
                {t.trust.title}
              </h2>
              <p className="mt-4 text-xl text-purple-50 leading-relaxed">
                {t.trust.desc}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-base font-medium text-white">
                  ✓ {t.trust.badges.pdpa}
                </div>
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-base font-medium text-white">
                  ✓ {t.trust.badges.bot}
                </div>
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-base font-medium text-white">
                  ✓ {t.trust.badges.consumer}
                </div>
                <div className="px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-xl text-base font-medium text-white">
                  ✓ {t.trust.badges.aiEthics}
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-purple-500 border-2 border-purple-600 flex items-center justify-center text-xs text-white font-medium"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-purple-100">
                <span className="text-white font-bold">500+</span>{" "}
                {t.trust.assessmentsRun}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="border-none shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-2">
      <CardHeader>
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
          {icon}
        </div>
        <CardTitle className="text-2xl mb-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg leading-relaxed">
          {desc}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
