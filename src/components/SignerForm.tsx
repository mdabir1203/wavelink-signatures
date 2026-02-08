import React from "react";
import { motion } from "framer-motion";

interface SignerInfo {
  name: string;
  email: string;
  title: string;
  organization: string;
  govId?: string;
  taxId?: string;
}

interface SignerFormProps {
  signer: SignerInfo;
  onChange: (field: keyof SignerInfo, value: string) => void;
  disabled?: boolean;
  label: string;
  showKyc?: boolean;
}

const SignerForm: React.FC<SignerFormProps> = ({ signer, onChange, disabled = false, label, showKyc = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-3"
    >
      <label className="text-sm font-semibold font-body text-document-text tracking-wide uppercase block">
        {label}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Full Name</label>
          <input
            type="text"
            value={signer.name}
            onChange={(e) => onChange("name", e.target.value)}
            disabled={disabled}
            placeholder="Enter full name"
            maxLength={100}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Email Address</label>
          <input
            type="email"
            value={signer.email}
            onChange={(e) => onChange("email", e.target.value)}
            disabled={disabled}
            placeholder="email@example.com"
            maxLength={255}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Title / Role</label>
          <input
            type="text"
            value={signer.title}
            onChange={(e) => onChange("title", e.target.value)}
            disabled={disabled}
            placeholder="e.g. Marketing Director"
            maxLength={100}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Organization</label>
          <input
            type="text"
            value={signer.organization}
            onChange={(e) => onChange("organization", e.target.value)}
            disabled={disabled}
            placeholder="Company / Individual"
            maxLength={100}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
      </div>

      {/* KYC Fields */}
      {showKyc && (
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-mono font-semibold text-primary tracking-wider uppercase">
              KYC Verification (Required)
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-mono text-document-muted mb-1 block">
                Government ID Number (NID / Passport)
              </label>
              <input
                type="text"
                value={signer.govId || ""}
                onChange={(e) => onChange("govId", e.target.value)}
                disabled={disabled}
                placeholder="e.g. 1234567890123"
                maxLength={50}
                className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-document-muted mb-1 block">
                TIN (Tax Identification Number)
              </label>
              <input
                type="text"
                value={signer.taxId || ""}
                onChange={(e) => onChange("taxId", e.target.value)}
                disabled={disabled}
                placeholder="e.g. 123456789012"
                maxLength={50}
                className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SignerForm;
