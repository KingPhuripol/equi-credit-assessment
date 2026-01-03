"use client";

import Link from "next/link";
import { ShieldCheck, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export function Topbar() {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4E2A84] text-white">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Equi
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <Link
            href="/assessment"
            className="hover:text-purple-600 transition-colors"
          >
            {t.topbar.assessment}
          </Link>
          <Link
            href="/fairness"
            className="hover:text-purple-600 transition-colors"
          >
            {t.topbar.fairness}
          </Link>
          <Link
            href="/technology"
            className="hover:text-purple-600 transition-colors"
          >
            {t.topbar.technology}
          </Link>
          <Link
            href="/legal"
            className="hover:text-purple-600 transition-colors"
          >
            {t.topbar.legal}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Language toggle removed as requested - System is now English only */}
        </div>
      </div>
    </header>
  );
}
