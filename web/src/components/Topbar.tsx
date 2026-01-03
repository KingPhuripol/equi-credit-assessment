"use client";

import Link from "next/link";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

export function Topbar() {
  const { t, language, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: language === "en" ? "Home" : "หน้าแรก" },
    { href: "/assessment", label: t.topbar.assessment },
    { href: "/fairness", label: t.topbar.fairness },
    { href: "/technology", label: t.topbar.technology },
    { href: "/legal", label: t.topbar.legal },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-600/10 animate-gradient-rotate"></div>
      
      {/* Glass morphism layer */}
      <div className="absolute inset-0 border-b border-purple-200/30 bg-white/70 backdrop-blur-2xl"></div>

      {/* Content */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-all group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-900/30 group-hover:shadow-xl group-hover:shadow-purple-900/50 group-hover:-translate-y-1 transition-all duration-300">
            <ShieldCheck size={22} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight text-purple-700 group-hover:text-purple-600 transition-colors">
            Equi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {item.label}
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 group-hover:w-full transition-all duration-300"></div>
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-purple-200 text-slate-700 font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="text-lg">{language === "en" ? "🇬🇧" : "🇹🇭"}</span>
            <span className="text-sm font-bold">{language === "en" ? "EN" : "TH"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 hover:bg-purple-100 rounded-lg transition-all duration-300"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-slate-900" />
            ) : (
              <Menu size={24} className="text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 md:hidden border-b border-purple-200/30 bg-white/95 backdrop-blur-xl shadow-lg">
          <nav className="flex flex-col p-4 gap-2 max-w-7xl mx-auto px-6">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-slate-700 font-semibold hover:bg-purple-50 hover:text-purple-600 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
