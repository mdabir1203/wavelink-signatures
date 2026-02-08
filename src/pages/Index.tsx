import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Send, Eye, PenLine, RotateCcw } from "lucide-react";
import ContractHeader from "@/components/ContractHeader";
import ContractDocument from "@/components/ContractDocument";
import ContractStatusBar from "@/components/ContractStatusBar";
import SignaturePad from "@/components/SignaturePad";
import SignerForm from "@/components/SignerForm";
import SignedStamp from "@/components/SignedStamp";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface SignerInfo {
  name: string;
  email: string;
  title: string;
  organization: string;
  govId?: string;
  taxId?: string;
}

const initialSigner: SignerInfo = {
  name: "",
  email: "",
  title: "",
  organization: "",
  govId: "",
  taxId: "",
};

const generateContractId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "WL-";
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

const Index = () => {
  const [contractId] = useState(generateContractId());
  const [status, setStatus] = useState<"draft" | "pending" | "signed">("draft");
  const [ambassadorInfo, setAmbassadorInfo] = useState<SignerInfo>(initialSigner);
  const [companyInfo] = useState<SignerInfo>({
    name: "Wave Link Team",
    email: "waavelink@gmail.com",
    title: "Partnerships & Sustainability",
    organization: "Wave Link",
  });
  const [ambassadorSignature, setAmbassadorSignature] = useState<string | null>(null);
  const [companySigned] = useState(true);
  const [showStamp, setShowStamp] = useState(false);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAmbassadorChange = useCallback(
    (field: keyof SignerInfo, value: string) => {
      setAmbassadorInfo((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const isFormValid = () => {
    return (
      ambassadorInfo.name.trim() !== "" &&
      ambassadorInfo.email.trim() !== "" &&
      ambassadorInfo.title.trim() !== "" &&
      ambassadorInfo.organization.trim() !== "" &&
      (ambassadorInfo.govId || "").trim() !== "" &&
      (ambassadorInfo.taxId || "").trim() !== "" &&
      ambassadorSignature !== null
    );
  };

  const handleSign = () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including KYC details (Government ID & TIN) and provide your signature.",
        variant: "destructive",
      });
      return;
    }

    setStatus("pending");
    setTimeout(() => {
      setStatus("signed");
      setShowStamp(true);
      toast({
        title: "Contract Signed Successfully",
        description: "The agreement has been fully executed. All parties have signed.",
      });
    }, 2000);
  };

  const handleReset = () => {
    setStatus("draft");
    setShowStamp(false);
    setAmbassadorInfo(initialSigner);
    setAmbassadorSignature(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top navigation bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-display font-semibold text-foreground">
              Wave Link Contract Portal
            </span>
          </div>
          <div className="flex items-center gap-2">
            {status === "signed" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-xs font-body"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                New Contract
              </Button>
            )}
            <Button variant="ghost" size="sm" className="text-xs font-body">
              <Eye className="w-3.5 h-3.5 mr-1.5" />
              Preview
            </Button>
            <Button variant="ghost" size="sm" className="text-xs font-body">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export PDF
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Status bar */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <ContractStatusBar
          status={status}
          signerCount={2}
          signedCount={status === "signed" ? 2 : companySigned ? 1 : 0}
        />
      </div>

      {/* Main document */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-xl document-shadow border border-border overflow-hidden"
          >
            {/* Document content */}
            <div className="watermark relative p-10 md:p-14">
              <div className="relative z-10">
                <ContractHeader
                  contractId={contractId}
                  status={status}
                  date={currentDate}
                />

                <ContractDocument />

                {/* Signature section */}
                <div className="mt-10 pt-8 border-t-2 border-document-border">
                  <h3 className="text-sm font-display font-semibold text-document-header tracking-wide mb-2">
                    AGREEMENT SIGN-OFF
                  </h3>
                  <p className="text-xs font-body text-document-muted mb-6">
                    Both parties must complete KYC verification before this agreement is considered binding.
                    Ambassador KYC is required before the first payout per Section 1.3.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Company signer (pre-filled) */}
                    <div className="space-y-4">
                      <SignerForm
                        signer={companyInfo}
                        onChange={() => {}}
                        disabled={true}
                        label="Company Representative"
                      />
                      <div className="rounded-lg border-2 border-signature-border bg-signature-bg p-4">
                        <p className="text-xs font-mono text-document-muted mb-1">
                          Signed digitally
                        </p>
                        <p className="text-lg font-display italic text-signature-ink">
                          Wave Link Team
                        </p>
                        <p className="text-[10px] font-mono text-document-muted mt-1">
                          {currentDate} • IP: 192.168.***
                        </p>
                      </div>
                    </div>

                    {/* Ambassador signer */}
                    <div className="space-y-4">
                      <SignerForm
                        signer={ambassadorInfo}
                        onChange={handleAmbassadorChange}
                        disabled={status === "signed"}
                        label="Ambassador"
                        showKyc={true}
                      />
                      <SignaturePad
                        onSignatureChange={setAmbassadorSignature}
                        disabled={status === "signed"}
                      />
                    </div>
                  </div>

                  {/* Sign button */}
                  {status !== "signed" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 flex justify-center"
                    >
                      <Button
                        onClick={handleSign}
                        disabled={status === "pending"}
                        size="lg"
                        className="px-10 font-body font-semibold tracking-wide"
                      >
                        {status === "pending" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <PenLine className="w-4 h-4 mr-2" />
                            Sign & Execute Agreement
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Signed stamp overlay */}
              <SignedStamp
                show={showStamp}
                signerName={ambassadorInfo.name || "Ambassador"}
                date={currentDate}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-5xl mx-auto px-6 pb-10"
      >
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© 2026 Wave Link — Smart Digital Solutions</span>
            <span className="text-border">|</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-status-signed animate-pulse-soft" />
            <span>Secure Document Portal</span>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
