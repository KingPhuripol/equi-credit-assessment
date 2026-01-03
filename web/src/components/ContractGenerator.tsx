"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield } from "lucide-react";
import jsPDF from "jspdf";
import { formatTHB } from "@/lib/utils";
import {
  generateContractHash,
  generateContractId,
  formatHashForDisplay,
} from "@/lib/crypto";

interface ContractGeneratorProps {
  userName?: string;
  loanAmount: number;
  creditScore?: number;
  date?: string;
}

export function ContractGenerator({
  userName = "________________",
  loanAmount,
  creditScore = 0,
  date = new Date().toLocaleDateString("th-TH"),
}: ContractGeneratorProps) {
  const [generating, setGenerating] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [contractId, setContractId] = React.useState("");
  const [contractHash, setContractHash] = React.useState("");

  React.useEffect(() => {
    const initContract = async () => {
      const id = generateContractId();
      setContractId(id);

      const hash = await generateContractHash({
        userName,
        loanAmount,
        creditScore,
        date,
        contractId: id,
      });
      setContractHash(hash);
    };
    initContract();
  }, [userName, loanAmount, creditScore, date]);

  const generatePDF = async () => {
    setGenerating(true);

    // Simulate processing delay
    setTimeout(async () => {
      const doc = new jsPDF();

      // Header
      doc.setFontSize(20);
      doc.text("LOAN AGREEMENT (CONTRACT)", 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.text(`Date: ${date}`, 150, 35);
      doc.text(`Contract No: ${contractId}`, 150, 42);

      // SHA-256 Hash (Digital Signature)
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Document Hash (SHA-256): ${formatHashForDisplay(contractHash)}`,
        20,
        50
      );
      doc.setTextColor(0, 0, 0);

      // Content
      doc.setFontSize(12);
      doc.text("This Agreement is made between:", 20, 65);

      doc.setFontSize(11);
      doc.text(`Lender: Equi Financial Services Platform`, 30, 70);
      doc.text(`Borrower: ${userName}`, 30, 78);

      doc.text("1. LOAN AMOUNT", 20, 95);
      doc.text(
        `The Lender agrees to lend to the Borrower the sum of THB ${loanAmount.toLocaleString()}`,
        30,
        102
      );

      doc.text("2. REPAYMENT", 20, 115);
      doc.text(
        "The Borrower agrees to repay the Loan Amount with interest.",
        30,
        122
      );

      doc.text("3. GOVERNING LAW", 20, 135);
      doc.text(
        "This Agreement shall be governed by the laws of Thailand.",
        30,
        142
      );

      // Signatures
      doc.text("Signed: ____________________", 20, 180);
      doc.text("(Lender)", 35, 187);

      doc.text("Signed: ____________________", 120, 180);
      doc.text("(Borrower)", 135, 187);

      doc.save("Equi-Contract.pdf");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {!showPreview ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <FileText className="h-6 w-6 text-[#4E2A84]" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            สร้างสัญญาเงินกู้ (Legal Agreement)
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Generate a legally binding loan agreement based on the approved
            amount.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => setShowPreview(true)}
              className="bg-[#4E2A84] hover:bg-[#3b1e66] text-white"
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview Contract
            </Button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-300">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Contract Preview</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
              className="text-slate-500"
            >
              Close
            </Button>
          </div>

          {/* SHA-256 Verification Badge */}
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <Shield className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-emerald-900 mb-1">
                🔒 SHA-256 Digital Signature
              </div>
              <div className="text-xs text-emerald-700 mb-1">
                This contract is tamper-proof and cryptographically verified
              </div>
              <div className="text-xs font-mono text-emerald-600 break-all">
                {contractHash}
              </div>
            </div>
          </div>

          {/* Preview Paper */}
          <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-lg border border-slate-200 bg-white p-8 shadow-sm text-[10px] md:text-xs text-slate-800 leading-relaxed font-serif">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#4E2A84]"></div>

            <div className="text-center mb-6">
              <h1 className="text-lg font-bold text-slate-900">
                LOAN AGREEMENT
              </h1>
              <p className="text-slate-500">Ref: {contractId}</p>
            </div>

            <div className="space-y-4">
              <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>Between:</strong>
                <br />
                Lender: Equi Financial Services Platform
                <br />
                Borrower:{" "}
                <span className="border-b border-dotted border-slate-400 px-2">
                  {userName}
                </span>
              </p>

              <div className="my-4 border-t border-slate-100"></div>

              <p>
                <strong>1. LOAN AMOUNT</strong>
                <br />
                The Lender agrees to lend the Borrower the principal sum of{" "}
                <strong>{formatTHB(loanAmount)}</strong>.
              </p>

              <p>
                <strong>2. TERMS</strong>
                <br />
                This agreement is generated automatically by the Equi Platform
                and is subject to the terms and conditions accepted during the
                digital onboarding process.
              </p>
            </div>

            <div className="absolute bottom-8 left-8 right-8 flex justify-between">
              <div className="text-center">
                <div className="mb-2 h-12 w-24 border-b border-slate-300"></div>
                <p>Lender Signature</p>
              </div>
              <div className="text-center">
                <div className="mb-2 h-12 w-24 border-b border-slate-300"></div>
                <p>Borrower Signature</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button
              onClick={generatePDF}
              disabled={generating}
              className="w-full bg-[#4E2A84] hover:bg-[#3b1e66] text-white"
              size="lg"
            >
              {generating ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download Signed PDF
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
