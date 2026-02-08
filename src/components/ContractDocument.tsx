import React from "react";
import { motion } from "framer-motion";

interface ContractSection {
  title: string;
  content: string[];
}

const contractSections: ContractSection[] = [
  {
    title: "1. PURPOSE & SCOPE",
    content: [
      "This Sustainability Ambassador Partnership Agreement (\"Agreement\") is entered into between Wavelink Sustainability Solutions (\"Company\") and the undersigned Ambassador (\"Ambassador\"), collectively referred to as the \"Parties.\"",
      "The purpose of this Agreement is to establish the terms and conditions under which the Ambassador will represent and promote Wavelink's sustainability initiatives, products, and brand values within their community and professional networks.",
    ],
  },
  {
    title: "2. AMBASSADOR RESPONSIBILITIES",
    content: [
      "The Ambassador agrees to: (a) Actively promote Wavelink's sustainability mission and products through social media, events, and personal networks; (b) Participate in a minimum of two (2) Wavelink-sponsored sustainability events per quarter; (c) Create authentic, engaging content that aligns with Wavelink's brand guidelines and sustainability messaging; (d) Provide quarterly reports on outreach activities and community engagement metrics.",
    ],
  },
  {
    title: "3. COMPANY OBLIGATIONS",
    content: [
      "Wavelink agrees to provide the Ambassador with: (a) A comprehensive sustainability ambassador toolkit including branded materials, product samples, and educational resources; (b) Monthly compensation as outlined in Schedule A attached hereto; (c) Priority access to new product launches and sustainability initiatives; (d) Professional development opportunities in sustainability leadership.",
    ],
  },
  {
    title: "4. TERM & TERMINATION",
    content: [
      "This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months, unless terminated earlier by either Party with thirty (30) days' written notice. Upon termination, the Ambassador shall cease all representation of the Company and return any Company materials in their possession.",
    ],
  },
  {
    title: "5. INTELLECTUAL PROPERTY",
    content: [
      "All content created by the Ambassador in connection with this Agreement shall be jointly owned by the Parties. The Company grants the Ambassador a non-exclusive, revocable license to use Wavelink's trademarks and branding materials solely for purposes outlined in this Agreement.",
    ],
  },
  {
    title: "6. CONFIDENTIALITY",
    content: [
      "The Ambassador agrees to maintain strict confidentiality regarding all proprietary information, trade secrets, business strategies, and unreleased product information disclosed by the Company during the term of this Agreement and for a period of two (2) years following termination.",
    ],
  },
  {
    title: "7. COMPLIANCE & ETHICS",
    content: [
      "The Ambassador shall comply with all applicable laws, regulations, and industry standards, including but not limited to FTC guidelines regarding endorsements and testimonials. All promotional content must clearly disclose the Ambassador's relationship with Wavelink.",
    ],
  },
  {
    title: "8. GOVERNING LAW",
    content: [
      "This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is incorporated, without regard to conflict of law principles. Any disputes arising from this Agreement shall be resolved through binding arbitration.",
    ],
  },
];

const ContractDocument: React.FC = () => {
  return (
    <div className="space-y-6">
      {contractSections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 + 0.2 }}
          className="group"
        >
          <h3 className="text-sm font-display font-semibold text-document-header tracking-wide mb-2">
            {section.title}
          </h3>
          {section.content.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-sm font-body text-document-text leading-relaxed mb-2 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </motion.div>
      ))}

      {/* Legal footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-6 mt-8 border-t border-document-border"
      >
        <p className="text-[11px] font-body text-document-muted leading-relaxed">
          IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date set forth below.
          This document constitutes the entire agreement between the Parties and supersedes all prior
          negotiations, representations, or agreements relating to this subject matter. This Agreement
          may be executed in counterparts, each of which shall be deemed an original.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-3 h-3 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[10px] font-mono text-document-muted">
            Document secured with SHA-256 hash verification
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ContractDocument;
