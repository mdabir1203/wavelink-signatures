import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PenLine, CheckCircle2, AlertCircle, Loader2, Download } from "lucide-react";
import ContractHeader from "@/components/ContractHeader";
import ContractDocument from "@/components/ContractDocument";
import ContractStatusBar from "@/components/ContractStatusBar";
import SignaturePad from "@/components/SignaturePad";
import SignerForm from "@/components/SignerForm";
import SignedStamp from "@/components/SignedStamp";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { getContract, signContract } from "@/lib/contracts";
import { useExportPdf } from "@/hooks/useExportPdf";

interface SignerInfo {
  name: string;
  email: string;
  govId?: string;
  taxId?: string;
}

const initialSigner: SignerInfo = {
  name: "",
  email: "",
  govId: "",
  taxId: "",
};

const SignContract = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [status, setStatus] = useState<"draft" | "pending" | "signed">("pending");
  const [ambassadorInfo, setAmbassadorInfo] = useState<SignerInfo>(initialSigner);
  const [ambassadorSignature, setAmbassadorSignature] = useState<string | null>(null);
  const [showStamp, setShowStamp] = useState(false);
  const [signing, setSigning] = useState(false);
  const { exportPdf, exporting } = useExportPdf();

  useEffect(() => {
    if (!token) {
      setError("Invalid signing link");
      setLoading(false);
      return;
    }

    getContract(token)
      .then((res) => {
        const c = res.contract as any;
        setContract(c);
        if (c.status === "signed") {
          setStatus("signed");
          setShowStamp(true);
          setAmbassadorInfo({
            name: c.ambassador_name || "",
            email: c.ambassador_email || "",
          });
        }
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

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
      ambassadorSignature !== null
    );
  };

  const handleSign = async () => {
    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and provide your signature.",
        variant: "destructive",
      });
      return;
    }

    if (!token) return;

    setSigning(true);
    try {
      // SECURITY: Do NOT send KYC data (govId, taxId) from client
      // These must be collected and validated through secure server-side endpoints only
      await signContract({
        access_token: token,
        ambassador_name: ambassadorInfo.name,
        ambassador_email: ambassadorInfo.email,
        ambassador_signature_data: ambassadorSignature!,
      });

      setStatus("signed");
      setShowStamp(true);
      toast({
        title: "Contract Signed Successfully",
        description: "The agreement has been fully executed. All parties have signed.",
      });
    } catch (err: any) {
      toast({
        title: "Signing Failed",
        description: err.message || "An error occurred while signing the contract.",
        variant: "destructive",
      });
    } finally {
      setSigning(false);
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-sm font-body text-muted-foreground">Loading contract...</p>
        </div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <AlertCircle className="w-10 h-10 text-destructive mx-auto" />
          <h2 className="text-lg font-display font-semibold text-foreground">
            Contract Not Found
          </h2>
          <p className="text-sm font-body text-muted-foreground">
            {error || "This signing link is invalid or has expired. Please contact Wave Link for a new link."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
      >
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-display font-semibold text-foreground">
              Wave Link — Sign Agreement
            </span>
          </div>
          <div className="flex items-center gap-2">
            {status === "signed" && (
              <div className="flex items-center gap-1.5 text-xs font-body text-status-signed">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Signed & Executed
              </div>
            )}
            {contract && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-body"
                disabled={exporting || !ambassadorSignature}
                onClick={() => {
                  if (!ambassadorSignature) {
                    toast({
                      title: "Missing Signature",
                      description: "Please provide your digital signature before exporting the contract.",
                      variant: "destructive",
                    });
                    return;
                  }

                  const companyInfo = {
                    name: contract.company_name || "Wave Link Team",
                    email: contract.company_email || "",
                  };
                  // SECURITY: Sanitize ambassador info to exclude KYC data (govId, taxId)
                  const sanitizedAmbassadorInfo = {
                    name: ambassadorInfo.name,
                    email: ambassadorInfo.email,
                  };
                  const contractDate = contract.created_at
                    ? new Date(contract.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : currentDate;
                  exportPdf({
                    contractId: contract.contract_id,
                    date: contractDate,
                    status,
                    companyInfo,
                    ambassadorInfo: sanitizedAmbassadorInfo,
                    ambassadorSignatureData: ambassadorSignature,
                    companySignedDate: contract.company_signed_at
                      ? new Date(contract.company_signed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : undefined,
                    ambassadorSignedDate: contract.ambassador_signed_at
                      ? new Date(contract.ambassador_signed_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : undefined,
                  }).then(() => {
                    toast({ title: "PDF Exported", description: "Your contract has been downloaded." });
                  }).catch(() => {
                    toast({ title: "Export Failed", description: "Could not generate PDF.", variant: "destructive" });
                  });
                }}
              >
                {exporting ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5 mr-1.5" />
                )}
                {exporting ? "Generating..." : "Export PDF"}
              </Button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Status bar */}
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <ContractStatusBar
          status={status}
          signerCount={2}
          signedCount={status === "signed" ? 2 : 1}
        />
      </div>

      {/* Document */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl document-shadow border border-border overflow-hidden"
        >
          <div className="watermark relative p-10 md:p-14">
            <div className="relative z-10">
              <ContractHeader
                contractId={contract.contract_id}
                status={status}
                date={new Date(contract.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />

              <ContractDocument />

              {/* Signature section */}
              <div className="mt-10 pt-8 border-t-2 border-document-border">
                <h3 className="text-sm font-display font-semibold text-document-header tracking-wide mb-2">
                  AGREEMENT SIGN-OFF
                </h3>
                <p className="text-xs font-body text-document-muted mb-6">
                  Both parties must sign below for this agreement to be considered binding.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Company signer */}
                  <div className="space-y-4">
                    <SignerForm
                      signer={{
                        name: contract.company_name,
                        email: contract.company_email,
                        title: contract.company_title,
                        organization: contract.company_organization,
                      }}
                      onChange={() => {}}
                      disabled={true}
                      label="Company Representative"
                    />
                    <div className="rounded-lg border-2 border-signature-border bg-signature-bg p-4">
                      <p className="text-xs font-mono text-document-muted mb-1">Signed digitally</p>
                      <p className="text-lg font-display italic text-signature-ink">
                        {contract.company_name}
                      </p>
                      <p className="text-[10px] font-mono text-document-muted mt-1">
                        {contract.company_signed_at
                          ? new Date(contract.company_signed_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : currentDate}{" "}
                        • Verified
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
                      disabled={signing}
                      size="lg"
                      className="px-10 font-body font-semibold tracking-wide"
                    >
                      {signing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Processing & Signing...
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

            <SignedStamp
              show={showStamp}
              signerName={ambassadorInfo.name || "Ambassador"}
              date={currentDate}
            />
          </div>
        </motion.div>
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

export default SignContract;
