import Link from "next/link";
import { ShieldCheck, Github, Mail, FileText } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4E2A84] text-white">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Equi
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              AI-Powered Credit Assessment Platform
              สำหรับฟรีแลนซ์และผู้ประกอบการรายย่อย
            </p>
            <div className="mt-4 text-xs text-slate-500">
              System Version: v1.2.0-enterprise
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/assessment"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Credit Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/fairness"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  AI Fairness Audit
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-slate-600 hover:text-purple-600 transition-colors"
                >
                  Technology Stack
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
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
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
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
        <div className="my-8 border-t border-slate-200"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            © {currentYear} Equi Platform. Built with{" "}
            <span className="text-purple-600 font-semibold">XGBoost</span>,{" "}
            <span className="text-purple-600 font-semibold">SHAP</span>, and{" "}
            <span className="text-purple-600 font-semibold">Typhoon OCR</span>.
          </div>

          {/* Tech Badges */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">
              ✓ PDPA Compliant
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
              ✓ SHA-256 Verified
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              ✓ XAI Enabled
            </div>
          </div>
        </div>

        {/* AI Disclosure */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-800 leading-relaxed">
              <strong>AI Transparency Notice:</strong> This platform uses
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
