import { motion } from "framer-motion";
import { Language, t } from "@/lib/i18n";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  lang: Language;
}

const ProgressBar = ({ currentStep, totalSteps, lang }: ProgressBarProps) => {
  const percentage = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="px-6 pt-6 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted-foreground">
          {t(lang, "progressLabel")} ⏳
        </span>
        <span className="text-xs font-mono text-wavelink-teal font-bold">
          {percentage}%
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-wavelink-teal to-wavelink-cyan"
              initial={{ width: 0 }}
              animate={{
                width: i < currentStep ? "100%" : i === currentStep ? "50%" : "0%",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
