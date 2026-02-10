import React from "react";
import { motion } from "framer-motion";

interface SignerInfo {
  name: string;
  email: string;
  futureTitle?: string;
  govId?: string;
  taxId?: string;
  nid?: string;
  institution?: string;
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
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Future Title / Role</label>
          <input
            type="text"
            value={signer.futureTitle || ""}
            onChange={(e) => onChange("futureTitle", e.target.value)}
            disabled={disabled}
            placeholder="e.g. Sales Manager"
            maxLength={100}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">NID (Bangladesh)</label>
          <input
            type="text"
            value={signer.nid || ""}
            onChange={(e) => onChange("nid", e.target.value)}
            disabled={disabled}
            placeholder="e.g. 1234567890123"
            maxLength={20}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
        <div>
          <label className="text-[11px] font-mono text-document-muted mb-1 block">Institution</label>
          <input
            type="text"
            value={signer.institution || ""}
            onChange={(e) => onChange("institution", e.target.value)}
            disabled={disabled}
            placeholder="e.g. University / School Name"
            maxLength={100}
            className="w-full px-3 py-2 text-sm font-body bg-signature-bg border border-border rounded-md text-document-text placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignerForm;
