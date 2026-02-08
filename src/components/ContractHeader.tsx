import React from "react";
import { motion } from "framer-motion";
import wavelinkLogo from "@/assets/wavelink-logo.png";

interface ContractHeaderProps {
  contractId: string;
  status: "draft" | "pending" | "signed";
  date: string;
}

const statusConfig = {
  draft: {
    label: "DRAFT",
    className: "bg-status-draft/15 text-status-draft border-status-draft/30",
  },
  pending: {
    label: "PENDING SIGNATURE",
    className: "bg-status-pending/15 text-status-pending border-status-pending/30",
  },
  signed: {
    label: "FULLY EXECUTED",
    className: "bg-status-signed/15 text-status-signed border-status-signed/30",
  },
};

const ContractHeader: React.FC<ContractHeaderProps> = ({ contractId, status, date }) => {
  const statusInfo = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-document-border pb-6 mb-8"
    >
      {/* Top bar with logo and status */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={wavelinkLogo}
            alt="Wavelink"
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-2xl font-display font-bold text-document-header tracking-tight">
              WAVELINK
            </h1>
            <p className="text-xs font-body text-document-muted tracking-[0.2em] uppercase mt-0.5">
              Sustainability Solutions
            </p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <span
            className={`inline-block px-3 py-1 text-[11px] font-mono font-semibold tracking-wider border rounded-full ${statusInfo.className}`}
          >
            {statusInfo.label}
          </span>
        </div>
      </div>

      {/* Document title */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-display font-semibold text-document-header mb-1">
          Sustainability Ambassador Program
        </h2>
        <p className="text-base font-display text-document-header/80">
          Partnership Agreement
        </p>
        <div className="w-16 h-0.5 bg-primary mx-auto mt-3 rounded-full" />
      </div>

      {/* Contract meta */}
      <div className="flex justify-between items-center text-xs font-mono text-document-muted">
        <span>Contract ID: {contractId}</span>
        <span>Date: {date}</span>
      </div>
    </motion.div>
  );
};

export default ContractHeader;
