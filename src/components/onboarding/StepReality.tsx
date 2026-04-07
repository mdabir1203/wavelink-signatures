import { motion } from "framer-motion";
import { AlertTriangle, Heart, Coffee } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepRealityProps {
  lang: Language;
}

const StepReality = ({ lang }: StepRealityProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "realityTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "realitySubtitle")}</p>
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="font-semibold text-sm">{t(lang, "realityHardTitle")}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-body">
            {t(lang, "realityHardText")}
          </p>
          <p className="text-xs text-muted-foreground italic font-body">
            {t(lang, "realityHardQuote")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-5 space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-wavelink-teal/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-wavelink-teal" />
            </div>
            <h3 className="font-semibold text-sm">{t(lang, "realityUpsideTitle")}</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed font-body">
            {t(lang, "realityUpsideText")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          className="glass-card rounded-xl p-4 flex items-center gap-3"
        >
          <Coffee className="w-5 h-5 text-wavelink-cyan shrink-0" />
          <p className="text-xs text-muted-foreground font-body">{t(lang, "realityCoffee")}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepReality;
