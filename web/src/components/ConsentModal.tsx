"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsentModalProps {
  onConsent: () => void;
}

export function ConsentModal({ onConsent }: ConsentModalProps) {
  const [checked, setChecked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const handleConfirm = () => {
    if (checked) {
      setIsOpen(false);
      onConsent();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
          >
            <div className="bg-[#4E2A84] px-6 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">PDPA Consent</h2>
                  <p className="text-purple-100 text-xs">
                    Data Privacy & Security
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6 space-y-4 text-sm text-slate-600">
                <p>
                  Welcome to <strong>Equi</strong>. Before we proceed with your
                  financial assessment, we need your consent to process your
                  data in accordance with the Personal Data Protection Act
                  (PDPA).
                </p>
                <div className="rounded-lg bg-slate-50 p-3 text-xs border border-slate-100">
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Your data is encrypted end-to-end.</li>
                    <li>Used solely for credit scoring simulation.</li>
                    <li>You can request data deletion at any time.</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-purple-100 bg-purple-50/50 p-4">
                <div className="flex h-5 items-center">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-600"
                  />
                </div>
                <label
                  htmlFor="consent"
                  className="text-sm font-medium text-slate-900 cursor-pointer select-none"
                >
                  I consent to the processing of my financial data under the
                  Personal Data Protection Act (PDPA).
                  <br />
                  <span className="text-xs font-normal text-slate-500">
                    (ข้าพเจ้ายินยอมให้ประมวลผลข้อมูลส่วนบุคคลตาม PDPA)
                  </span>
                </label>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleConfirm}
                  disabled={!checked}
                  className="w-full bg-[#4E2A84] hover:bg-[#3b1e66] text-white"
                  size="lg"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Confirm & Continue
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
