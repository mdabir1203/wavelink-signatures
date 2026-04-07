import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepMilestonesProps {
  lang: Language;
}

const StepMilestones = ({ lang }: StepMilestonesProps) => {
  const milestones = [
    { labelKey: "sell10" as const, rate: "7%", badge: "🥉" },
    { labelKey: "sell20" as const, rate: "14%", badge: "🥈" },
    { labelKey: "sell30" as const, rate: "20%", badge: "🥇" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "milestonesTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "milestonesSubtitle")}</p>
      </div>

      <div className="space-y-3">
        {milestones.map((m, i) => (
          <motion.div
            key={m.labelKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="relative glass-card rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-wavelink-teal/20 to-wavelink-blue/20 flex items-center justify-center shrink-0">
                <span className="text-xl">{m.badge}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{t(lang, m.labelKey)}</p>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUp className="w-3 h-3 text-wavelink-teal" />
                  <span className="text-xs text-muted-foreground">Commission rate</span>
                </div>
              </div>
              <span className="text-2xl font-mono font-bold text-wavelink-teal">{m.rate}</span>
            </div>
            {i < milestones.length - 1 && (
              <div className="absolute left-[2.35rem] top-[4rem] w-px h-3 bg-border" />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-xl p-4 text-center animate-pulse-glow"
      >
        <p className="text-sm font-semibold font-body">
          {t(lang, "milestoneTip")}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default StepMilestones;
