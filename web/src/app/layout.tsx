import type { Metadata } from "next";
import { Geist, Geist_Mono, Mitr } from "next/font/google";
import "./globals.css";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { FontWrapper } from "@/components/FontWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mitr = Mitr({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-mitr",
});

export const metadata: Metadata = {
  title: "Equi: Enterprise AI Credit Assessment Platform",
  description:
    "AI-powered credit scoring for freelancers: Typhoon OCR, WangChanBERTa NLP, XGBoost scoring, SHAP explainability, and AIF360 fairness audit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${mitr.variable} antialiased font-sans`}
      >
        <LanguageProvider>
          <FontWrapper>
            <Topbar />
            {children}
            <Footer />
          </FontWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
