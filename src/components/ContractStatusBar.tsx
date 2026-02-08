import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, CheckCircle2, Users, FileCheck } from "lucide-react";

interface ContractStatusBarProps {
  status: "draft" | "pending" | "signed";
  signerCount: number;
  signedCount: number;
}

const steps = [
  { key: "draft", label: "Draft Created", icon: FileCheck },
  { key: "pending", label: "Awaiting Signatures", icon: Clock },
  { key: "signed", label: "Fully Executed", icon: CheckCircle2 },
];

const ContractStatusBar: React.FC<ContractStatusBarProps> = ({
  status,
  signerCount,
  signedCount,
}) => {
  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-5 card-shadow border border-border"
    >
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`text-xs font-body font-medium ${
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-3 ${
                    index < currentIndex ? "bg-primary/40" : "bg-border"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between text-xs font-body">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span>
              {signedCount}/{signerCount} signed
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            <span>Encrypted & Verified</span>
          </div>
        </div>
        {status === "pending" && (
          <span className="text-status-pending font-medium animate-pulse-soft">
            Waiting for signatures...
          </span>
        )}
        {status === "signed" && (
          <span className="text-status-signed font-medium">✓ All parties have signed</span>
        )}
      </div>
    </motion.div>
  );
};

export default ContractStatusBar;
