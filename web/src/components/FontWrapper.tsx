"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export function FontWrapper({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();

  // Use a composite font stack that prioritizes Mitr (Thai) as requested.
  // This ensures the entire site uses the Mitr font for both English and Thai.
  const fontFamily = "var(--font-mitr), var(--font-geist-sans), sans-serif";

  return (
    <div style={{ fontFamily }} className="min-h-screen flex flex-col">
      {children}
    </div>
  );
}
