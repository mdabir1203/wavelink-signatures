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
      "This Sustainability Ambassador Partnership Agreement (\"Agreement\") is entered into between Wave Link, a technology-driven brand focused on smart digital solutions (\"Company\"), based in Chakaria, Bangladesh, and the undersigned Ambassador (\"Ambassador\"), collectively referred to as the \"Parties.\"",
      "The purpose of this Agreement is to establish the terms and conditions under which the Ambassador will represent and promote Wave Link's sustainability mission—helping individuals and businesses transition from traditional paper-based networking to smart, NFC-powered digital solutions that reduce waste and environmental impact.",
    ],
  },
  {
    title: "2. AMBASSADOR RESPONSIBILITIES",
    content: [
      "The Ambassador agrees to: (a) Actively promote Wave Link's sustainable digital products, including WaveLink NFC Smart Business Cards and WaveLink NFC Tags, through social media, networking events, and personal outreach; (b) Advocate for the environmental benefits of replacing traditional paper business cards with reusable NFC-enabled alternatives; (c) Participate in a minimum of two (2) Wave Link–sponsored sustainability campaigns or digital events per quarter; (d) Create authentic, engaging content that highlights Wave Link's mission of making communication faster, branding stronger, and everyday work more efficient; (e) Provide quarterly reports on outreach activities, referrals, and community engagement metrics.",
    ],
  },
  {
    title: "3. COMPANY OBLIGATIONS",
    content: [
      "Wave Link agrees to provide the Ambassador with: (a) A personalized WaveLink NFC Smart Business Card (White Edition, premium 1.00mm PVC with UV printing) for personal use and demonstration; (b) A set of WaveLink NFC Tags (NTAG215/216) for promotional purposes; (c) Monthly compensation as outlined in Schedule A attached hereto; (d) Priority access to new product launches and upcoming smart-tech category expansions; (e) Marketing materials, brand guidelines, and digital assets for content creation; (f) Dedicated support and training on Wave Link products and sustainability messaging.",
    ],
  },
  {
    title: "4. TERM & TERMINATION",
    content: [
      "This Agreement shall commence on the Effective Date and continue for a period of twelve (12) months, unless terminated earlier by either Party with thirty (30) days' written notice. Upon termination, the Ambassador shall cease all representation of the Company and return any Company materials in their possession. Wave Link reserves the right to terminate immediately if the Ambassador engages in conduct that damages the Company's reputation or violates this Agreement.",
    ],
  },
  {
    title: "5. INTELLECTUAL PROPERTY",
    content: [
      "All content created by the Ambassador in connection with this Agreement shall be jointly owned by the Parties. The Company grants the Ambassador a non-exclusive, revocable license to use Wave Link's trademarks, logo, and branding materials solely for purposes outlined in this Agreement. The Ambassador shall not modify or alter Wave Link's brand identity without prior written consent.",
    ],
  },
  {
    title: "6. CONFIDENTIALITY",
    content: [
      "The Ambassador agrees to maintain strict confidentiality regarding all proprietary information, including but not limited to: product roadmaps, upcoming smart-tech category expansions, business strategies, pricing structures, customer data, and unreleased product specifications disclosed by the Company during the term of this Agreement and for a period of two (2) years following termination.",
    ],
  },
  {
    title: "7. SUSTAINABILITY COMMITMENT",
    content: [
      "Both Parties acknowledge and affirm their shared commitment to environmental sustainability. The Ambassador agrees to promote the eco-friendly benefits of NFC-powered digital networking solutions as a replacement for traditional paper-based cards, emphasizing: (a) Reduction in paper waste and deforestation; (b) Elimination of repeated printing costs and associated carbon emissions; (c) Long-lasting, rewritable digital profiles that adapt without physical reproduction; (d) Wave Link's vision of building a smarter, more connected, and greener future.",
    ],
  },
  {
    title: "8. GOVERNING LAW",
    content: [
      "This Agreement shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising from this Agreement shall first be resolved through good-faith negotiation between the Parties. If unresolved, disputes shall be submitted to binding arbitration in accordance with applicable arbitration rules. Contact for all correspondence: waavelink@gmail.com.",
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
