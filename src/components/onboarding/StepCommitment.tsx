import { motion } from "framer-motion";
import { Check, LogOut } from "lucide-react";
import { useState } from "react";
import { Language, t } from "@/lib/i18n";

interface StepCommitmentProps {
  lang: Language;
  onAllChecked: (checked: boolean) => void;
}

const StepCommitment = ({ lang, onAllChecked }: StepCommitmentProps) => {
  const commitmentKeys = ["commit1", "commit2", "commit3", "commit4"] as const;
  const [checked, setChecked] = useState<boolean[]>(new Array(4).fill(false));

  const toggle = (i: number) => {
    const next = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(next);
    onAllChecked(next.every(Boolean));
  };

  const allChecked = checked.every(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "commitTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "commitSubtitle")}</p>
      </div>

      <div className="space-y-3">
        {commitmentKeys.map((key, i) => (
          <motion.button
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 rounded-xl p-4 text-left transition-all ${
              checked[i]
                ? "bg-wavelink-teal/5 border-2 border-wavelink-teal/30"
                : "glass-card"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                checked[i]
                  ? "bg-wavelink-teal border-wavelink-teal"
                  : "border-muted-foreground/30"
              }`}
            >
              {checked[i] && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className="text-sm font-body">{t(lang, key)}</span>
          </motion.button>
        ))}
      </div>

      {allChecked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-xl p-4 text-center border-wavelink-teal/30 animate-pulse-glow"
        >
          <p className="text-sm text-wavelink-teal font-semibold font-body">
            ✓ {t(lang, "commitReady")}
          </p>
        </motion.div>
      )}

      {!allChecked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60"
        >
          <LogOut className="w-3 h-3" />
          <span>{t(lang, "commitExit")}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default StepCommitment;
