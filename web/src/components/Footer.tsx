import Link from "next/link";
import { ShieldCheck, Github, Mail, FileText, ExternalLink, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-100/50 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-100/50 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/25 group-hover:shadow-xl group-hover:-translate-y-0.5 transition-all">
                <ShieldCheck size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Equi
              </span>
            </Link>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              AI-Powered Credit Assessment Platform for Freelancers & SMEs
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              v1.2.0-enterprise
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-600 to-violet-600"></div>
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/assessment"
                  className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  Credit Assessment
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/fairness"
                  className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  AI Fairness Audit
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-slate-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                >
                  Technology Stack
                  <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-600 to-violet-600"></div>
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-purple-600 to-violet-600"></div>
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/legal"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Legal & Compliance
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Privacy Policy (PDPA)
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-purple-100"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>© {currentYear} Equi Platform. Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>by LegalTech Team</span>
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-2 text-xs flex-wrap justify-center">
            <div className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-semibold hover:bg-emerald-200 transition-colors cursor-default">
              ✓ PDPA Compliant
            </div>
            <div className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold hover:bg-purple-200 transition-colors cursor-default">
              ✓ SHA-256 Verified
            </div>
            <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold hover:bg-blue-200 transition-colors cursor-default">
              ✓ XAI Enabled
            </div>
          </div>
        </div>

        {/* AI Disclosure */}
        <div className="mt-8 p-5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-sm text-amber-900 leading-relaxed">
              <strong className="font-bold">AI Transparency Notice:</strong> This platform uses
              machine learning models (XGBoost, WangChanBERTa, SHAP) to assess
              creditworthiness. All decisions are explainable and subject to
              human review upon request. Models are regularly audited for
              fairness bias using IBM AIF360 framework.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
