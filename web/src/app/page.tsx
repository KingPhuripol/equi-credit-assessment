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
  Sparkles,
  Shield,
  Zap,
  Brain,
  LineChart,
  Lock,
  Award,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="flex flex-col min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Hero Section - Premium Design like Typhoon */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Main gradient blobs */}
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-300/40 to-purple-100/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-t from-cyan-300/30 to-transparent rounded-full blur-3xl animate-blob-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-purple-100/20 to-transparent rounded-full blur-3xl animate-float"></div>
          
          {/* Floating particles */}
          <div className="absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-particle-float opacity-60"></div>
          <div className="absolute top-40 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-particle-float opacity-60" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 bg-purple-300 rounded-full animate-particle-float opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-violet-400 rounded-full animate-particle-float opacity-40" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5MzMzRUEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-32 sm:pt-32 sm:pb-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex animate-fade-in-down">
              <div className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-violet-100 border border-purple-200/50 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-default">
                <div className="relative">
                  <Sparkles className="h-4 w-4 text-purple-600 animate-pulse-glow" />
                </div>
                <span className="text-sm font-bold text-purple-700">{t.hero.badge || "LegalTech Competition Entry 2026"}</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="block text-slate-900">{t.hero.title}</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-rotate bg-[length:200%_auto]">
                Equi AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-8 text-lg sm:text-xl lg:text-2xl leading-relaxed text-slate-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex items-center justify-center gap-4 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/assessment">
                <Button
                  size="lg"
                  className="group/btn relative overflow-hidden bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-8 py-6 text-lg rounded-2xl font-bold shadow-xl shadow-purple-500/25 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center">
                    {t.hero.startAssessment}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-2" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
              <Link href="/fairness">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-2xl font-bold border-2 border-purple-200 hover:border-purple-400 bg-white/80 backdrop-blur-sm hover:bg-purple-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {t.hero.viewFairness}
                </Button>
              </Link>
            </div>

            {/* Scroll indicator */}
            <div className="mt-20 animate-bounce-slow">
              <div className="mx-auto w-6 h-10 rounded-full border-2 border-purple-300 flex items-start justify-center p-2">
                <div className="w-1 h-3 bg-purple-400 rounded-full animate-fade-in-down"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos/Partners Section - Infinite Marquee */}
      <section className="py-16 bg-gradient-to-b from-white to-purple-50/30 border-y border-purple-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
          <p className="text-center text-lg font-bold text-purple-600">Trusted Technology Partners</p>
        </div>
        
        {/* Marquee Container - Infinite scroll */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-infinite">
            {/* First set of logos */}
            <div className="flex items-center gap-20 px-10 min-w-max">
              <img src="/Mahidol_U (2).png" alt="Mahidol University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/Logo_of_Chulalongkorn_University.svg.png" alt="Chulalongkorn University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/KMUTT_CI_Primary_Logo-Full.png" alt="KMUTT" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/CMU_sub-logo.svg.png" alt="CMU" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/superai_logo.png" alt="Super AI" className="h-16 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/areazero-full-1200x360-transparent.png" alt="Area Zero" className="h-14 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
            </div>
            {/* Duplicate set 2 */}
            <div className="flex items-center gap-20 px-10 min-w-max">
              <img src="/Mahidol_U (2).png" alt="Mahidol University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/Logo_of_Chulalongkorn_University.svg.png" alt="Chulalongkorn University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/KMUTT_CI_Primary_Logo-Full.png" alt="KMUTT" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/CMU_sub-logo.svg.png" alt="CMU" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/superai_logo.png" alt="Super AI" className="h-16 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/areazero-full-1200x360-transparent.png" alt="Area Zero" className="h-14 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
            </div>
            {/* Duplicate set 3 for seamless */}
            <div className="flex items-center gap-20 px-10 min-w-max">
              <img src="/Mahidol_U (2).png" alt="Mahidol University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/Logo_of_Chulalongkorn_University.svg.png" alt="Chulalongkorn University" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/KMUTT_CI_Primary_Logo-Full.png" alt="KMUTT" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/CMU_sub-logo.svg.png" alt="CMU" className="h-20 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/superai_logo.png" alt="Super AI" className="h-16 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
              <img src="/areazero-full-1200x360-transparent.png" alt="Area Zero" className="h-14 w-auto brightness-110 hover:scale-110 transition-all duration-300 drop-shadow-md" />
            </div>
          </div>
          
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-blob-slow"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Platform Performance</h2>
            <p className="text-purple-200 text-lg">Real-time metrics from our AI credit assessment system</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <StatCard
              icon={<TrendingUp className="h-8 w-8" />}
              value={t.stats.accuracy}
              label={t.stats.accuracyLabel}
              delay="0"
            />
            <StatCard
              icon={<Zap className="h-8 w-8" />}
              value={t.stats.speed}
              label={t.stats.speedLabel}
              delay="0.1"
            />
            <StatCard
              icon={<Users className="h-8 w-8" />}
              value={t.stats.users}
              label={t.stats.usersLabel}
              delay="0.2"
            />
          </div>
        </div>
      </section>

      {/* Problem / Solution Section - Premium Cards */}
      <section className="py-24 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem Card */}
            <div className="group relative animate-fade-in-left">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative p-8 rounded-3xl bg-white border-2 border-red-100 hover:border-red-300 transition-colors">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.problemSolution.problemTitle}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t.problemSolution.problemDesc}
                </p>
              </div>
            </div>

            {/* Solution Card */}
            <div className="group relative animate-fade-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative p-8 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-300 transition-colors">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {t.problemSolution.solutionTitle}
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t.problemSolution.solutionDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Premium */}
      <section className="py-24 bg-gradient-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-purple-200 to-transparent rounded-full blur-3xl opacity-40 -mr-48"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-20">
            <h2 className="text-lg font-semibold leading-7 text-purple-600 mb-2 animate-fade-in-down">
              {t.features.howItWorks}
            </h2>
            <p className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-gradient animate-fade-in-up">
              {t.features.title}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Upload className="h-8 w-8 text-purple-600" />}
              title={t.features.card1.title}
              desc={t.features.card1.desc}
              delay="0"
            />
            <FeatureCard
              icon={<ScanLine className="h-8 w-8 text-purple-600" />}
              title={t.features.card2.title}
              desc={t.features.card2.desc}
              delay="0.1"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-purple-600" />}
              title={t.features.card3.title}
              desc={t.features.card3.desc}
              delay="0.2"
            />
          </div>
        </div>
      </section>

      {/* Trust Section - Premium */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-purple-100 to-transparent rounded-full blur-3xl opacity-40 -mr-48 -mb-48"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-primary px-6 py-16 sm:px-16 lg:py-24 shadow-2xl shadow-purple-900/20 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative lg:flex lg:items-center lg:justify-between gap-16">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6 animate-fade-in-left">
                  {t.trust.title}
                </h2>
                <p className="mt-6 text-lg sm:text-xl text-purple-50 leading-relaxed animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
                  {t.trust.desc}
                </p>
                <div className="mt-10 flex flex-wrap gap-3 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                  <Badge text={t.trust.badges.pdpa} />
                  <Badge text={t.trust.badges.bot} />
                  <Badge text={t.trust.badges.consumer} />
                  <Badge text={t.trust.badges.aiEthics} />
                </div>
              </div>
              
              <div className="mt-12 lg:mt-0 lg:flex-shrink-0 flex flex-col items-center lg:items-end gap-8 animate-fade-in-right">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full bg-white/20 border-2 border-white backdrop-blur-sm flex items-center justify-center text-xs text-white font-bold hover:translate-y-1 transition-transform"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-3xl text-white font-bold">500+</div>
                  <div className="text-purple-50">
                    {t.trust.assessmentsRun}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  delay,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: string;
}) {
  return (
    <div 
      className="flex flex-col items-center gap-y-3 animate-fade-in-up text-white group"
      style={{ animationDelay: `${parseFloat(delay) + 0.4}s` }}
    >
      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse-ring">
        {icon}
      </div>
      <dd className="text-3xl sm:text-4xl font-bold tracking-tight group-hover:animate-bounce-slow">
        {value}
      </dd>
      <dt className="text-base sm:text-lg leading-7 text-purple-100 group-hover:text-white transition-colors">
        {label}
      </dt>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: string;
}) {
  return (
    <div
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${parseFloat(delay) + 0.3}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      <Card className="relative border-2 border-purple-100 hover:border-purple-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 p-8 bg-white group-hover:animate-card-float overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-purple-50 to-transparent pointer-events-none transition-opacity duration-300"></div>
        
        <CardHeader className="relative mb-6 p-0">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 group-hover:bg-purple-200 transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse-ring">
            {icon}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-gradient transition-all">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative p-0">
          <CardDescription className="text-base text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
            {desc}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="px-4 py-2 bg-white/15 backdrop-blur-sm hover:bg-white/25 rounded-xl text-base font-medium text-white border border-white/20 transition-all hover:scale-105">
      ✓ {text}
    </div>
  );
}
