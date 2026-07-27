import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createContract } from "@/lib/contracts";
import ProgressBar from "@/components/onboarding/ProgressBar";
import LanguageSelector from "@/components/onboarding/LanguageSelector";
import StepWelcome from "@/components/onboarding/StepWelcome";
import StepRole from "@/components/onboarding/StepRole";
import StepReality from "@/components/onboarding/StepReality";
import StepMilestones from "@/components/onboarding/StepMilestones";
import StepPerks from "@/components/onboarding/StepPerks";
import StepProducts from "@/components/onboarding/StepProducts";
import StepRules from "@/components/onboarding/StepRules";
import StepCommitment from "@/components/onboarding/StepCommitment";
import StepSignature, { SignaturePayload } from "@/components/onboarding/StepSignature";
import { Language, t } from "@/lib/i18n";

const generateContractId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "WL-";
  for (let i = 0; i < 8; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
};

const Index = () => {
  const [lang, setLang] = useState<Language>("en");
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [statusLink, setStatusLink] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<string | null>(null);
  const [commitmentDone, setCommitmentDone] = useState(false);
  const [signaturePayload, setSignaturePayload] = useState<SignaturePayload | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref && /^WL-[A-Z0-9]{4,20}$/.test(ref)) {
      setReferredBy(ref);
    }
    const c = params.get("campaign");
    if (c && /^[A-Za-z0-9_-]{1,40}$/.test(c)) {
      setCampaign(c);
    }
  }, []);

  const steps = [
    { key: "welcome", cta: t(lang, "welcomeCta") },
    { key: "role", cta: t(lang, "roleCta") },
    { key: "reality", cta: t(lang, "realityCta") },
    { key: "milestones", cta: t(lang, "milestonesCta") },
    { key: "perks", cta: t(lang, "perksCta") },
    { key: "products", cta: t(lang, "productsCta") },
    { key: "rules", cta: t(lang, "rulesCta") },
    { key: "commitment", cta: t(lang, "commitCta") },
    { key: "signature", cta: submitting ? t(lang, "submitting") : t(lang, "signCta") },
  ];

  const isLast = currentStep === steps.length - 1;

  const renderStep = () => {
    switch (steps[currentStep].key) {
      case "welcome": return <StepWelcome lang={lang} />;
      case "role": return <StepRole lang={lang} />;
      case "reality": return <StepReality lang={lang} />;
      case "milestones": return <StepMilestones lang={lang} />;
      case "perks": return <StepPerks lang={lang} />;
      case "products": return <StepProducts lang={lang} />;
      case "rules": return <StepRules lang={lang} />;
      case "commitment": return <StepCommitment lang={lang} onAllChecked={setCommitmentDone} />;
      case "signature": return <StepSignature lang={lang} onSignatureComplete={setSignaturePayload} />;
      default: return null;
    }
  };

  const canProceed = () => {
    if (steps[currentStep].key === "commitment") return commitmentDone;
    if (isLast) return !!signaturePayload && !submitting;
    return true;
  };

  const handleSubmit = async () => {
    if (!signaturePayload || submitting) return;
    setSubmitting(true);

    try {
      const contractId = generateContractId();
      const result = await createContract({
        contract_id: contractId,
        company_name: "Wave Link Team",
        company_email: "waavelink@gmail.com",
        company_title: "Sustainability Ambassador / Partner",
        company_organization: "Wave Link",
        referred_by: referredBy,
        campaign: campaign,
      });

      const baseUrl = window.location.origin;
      const link = `${baseUrl}/sign/${result.contract.access_token}`;
      const meLink = `${baseUrl}/me/${result.contract.access_token}`;
      const refLink = `${baseUrl}/?ref=${result.contract.contract_id}`;
      setShareLink(link);
      setStatusLink(meLink);
      setReferralLink(refLink);
      setCompleted(true);

      toast({ title: t(lang, "doneTitle"), description: t(lang, "doneSubtitle") });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
      setSubmitting(false);
    }
  };

  const next = () => {
    if (isLast) handleSubmit();
    else setCurrentStep((s) => s + 1);
  };

  const back = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center gap-6 bg-gradient-to-br from-wavelink-light to-background">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative"
        >
          <CheckCircle2 className="w-20 h-20 text-wavelink-teal" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-wavelink-cyan" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h1 className="text-3xl font-bold font-display">{t(lang, "doneTitle")}</h1>
          <p className="text-muted-foreground max-w-xs font-body">{t(lang, "doneSubtitle")}</p>
          <p className="text-sm text-wavelink-teal font-medium italic font-body">{t(lang, "doneQuote")}</p>
        </motion.div>

        {shareLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-sm space-y-3"
          >
            <div className="glass-card rounded-xl p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground">Signing Link:</p>
              <code className="text-[10px] font-mono text-muted-foreground bg-muted px-3 py-2 rounded-lg block break-all">
                {shareLink}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareLink);
                  toast({ title: "Copied!", description: "Link copied to clipboard." });
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground text-sm font-semibold"
              >
                Copy Signing Link 📋
              </button>
            </div>

            {referralLink && (
              <div className="glass-card rounded-xl p-4 space-y-2 border-2 border-wavelink-teal/30">
                <p className="text-xs font-semibold text-foreground">🎁 Your Referral Link (earn bonus points):</p>
                <code className="text-[10px] font-mono text-muted-foreground bg-muted px-3 py-2 rounded-lg block break-all">
                  {referralLink}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    toast({ title: "Copied!", description: "Share it — every signed referral = 1 bonus point." });
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground text-sm font-semibold"
                >
                  Copy Referral Link 🎁
                </button>
              </div>
            )}

            {statusLink && (
              <a
                href={statusLink}
                className="block text-center text-xs text-wavelink-teal font-semibold underline underline-offset-4"
              >
                View my ambassador status page →
              </a>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a href="/admin/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Admin Dashboard →
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-gradient-to-br from-wavelink-light to-background">
      <LanguageSelector lang={lang} onSelect={setLang} />
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} lang={lang} />

      <div className="flex-1 flex flex-col py-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <div key={currentStep}>
            {renderStep()}
          </div>
        </AnimatePresence>
      </div>

      <div className="px-8 pb-8 space-y-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={next}
          disabled={!canProceed()}
          className={`w-full bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all font-body ${
            !canProceed() ? "opacity-50 cursor-not-allowed" : "hover:shadow-xl"
          }`}
        >
          {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {steps[currentStep].cta}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </motion.button>

        {currentStep > 0 && (
          <button
            onClick={back}
            className="w-full text-muted-foreground text-sm py-2 flex items-center justify-center gap-1 hover:text-foreground transition-colors font-body"
          >
            <ArrowLeft className="w-3 h-3" />
            {t(lang, "back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
