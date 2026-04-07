import { motion } from "framer-motion";
import { Shield, Scale, FileCheck } from "lucide-react";
import OnboardingSignaturePad from "./OnboardingSignaturePad";
import { useState } from "react";
import { Language, t } from "@/lib/i18n";

export interface SignaturePayload {
  signatureData: string;
  signatureType: "drawn" | "typed";
  partnerName: string;
  partnerEmail: string;
  partnerPhone: string;
  partnerGovId: string;
  partnerTaxId: string;
}

interface StepSignatureProps {
  onSignatureComplete: (data: SignaturePayload) => void;
  lang: Language;
}

const StepSignature = ({ onSignatureComplete, lang }: StepSignatureProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [govId, setGovId] = useState("");
  const [taxId, setTaxId] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [signatureType, setSignatureType] = useState<"drawn" | "typed">("drawn");
  const [agreed, setAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);

  const isReady = name.trim() && email.trim() && govId.trim() && taxId.trim() && signatureData && agreed;

  const handleSignatureChange = (data: string | null, type: "drawn" | "typed") => {
    setSignatureData(data);
    setSignatureType(type);
  };

  if (isReady) {
    onSignatureComplete({
      signatureData: signatureData!,
      signatureType,
      partnerName: name,
      partnerEmail: email,
      partnerPhone: phone,
      partnerGovId: govId,
      partnerTaxId: taxId,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5 overflow-y-auto"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "signTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "signSubtitle")}</p>
      </div>

      {/* Legal badges */}
      <div className="flex gap-2">
        {[
          { icon: Shield, label: "ICT Act 2006" },
          { icon: Scale, label: "Digital Security Act" },
          { icon: FileCheck, label: "Evidence Act §65B" },
        ].map((law) => (
          <div key={law.label} className="flex-1 flex flex-col items-center gap-1 glass-card rounded-xl p-2.5">
            <law.icon className="w-4 h-4 text-wavelink-teal" />
            <span className="text-[9px] text-muted-foreground text-center leading-tight">{law.label}</span>
          </div>
        ))}
      </div>

      {/* Partner info */}
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t(lang, "fullName")}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-wavelink-teal transition-colors"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t(lang, "emailAddress")}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-wavelink-teal transition-colors"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t(lang, "phone")}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-wavelink-teal transition-colors"
        />
        <input
          type="text"
          value={govId}
          onChange={(e) => setGovId(e.target.value)}
          placeholder={t(lang, "govId")}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-wavelink-teal transition-colors"
        />
        <input
          type="text"
          value={taxId}
          onChange={(e) => setTaxId(e.target.value)}
          placeholder={t(lang, "taxId")}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-wavelink-teal transition-colors"
        />
      </div>

      {/* Agreement preview */}
      <div className="glass-card rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAgreement(!showAgreement)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium"
        >
          <span>{t(lang, "viewAgreement")}</span>
          <span className="text-wavelink-teal text-xs">{showAgreement ? "Hide" : "Show"}</span>
        </button>
        {showAgreement && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="px-4 pb-4">
            <pre className="text-[10px] text-muted-foreground whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto font-body">
{`SUSTAINABILITY AMBASSADOR PERFORMANCE AGREEMENT — WAVE LINK

This digital agreement is executed under:
• ICT Act 2006, Section 7 — Electronic Records & Digital Signatures
• Digital Security Act 2018
• Evidence Act 1872, Section 65B — Admissibility of Electronic Evidence

TERMS:
1. The Ambassador agrees to sell Wave Link NFC products on a commission basis.
2. Commission is strictly performance-based — no time-based vesting.
3. Commission rates: 7% (10 cards), 14% (20 cards), 20% (30 cards).
4. Review Stand & Partnership sales: 20% commission.
5. Single unit direct sales: 5% commission.
6. KYC verification required for all deals.
7. 14-day accountability reporting cycle via WhatsApp.
8. Either party may terminate with 30 days written notice.

LEGAL VALIDITY:
Under Section 7 of the ICT Act 2006, electronic signatures carry the same legal weight as handwritten signatures.`}
            </pre>
          </motion.div>
        )}
      </div>

      {/* Signature pad */}
      <OnboardingSignaturePad onSignatureChange={handleSignatureChange} lang={lang} />

      {/* Agreement checkbox */}
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-4 h-4 rounded accent-wavelink-teal"
        />
        <span className="text-xs text-muted-foreground leading-relaxed font-body">
          {t(lang, "agreeText")}
        </span>
      </label>
    </motion.div>
  );
};

export default StepSignature;
