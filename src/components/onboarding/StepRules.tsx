import { motion } from "framer-motion";
import { Shield, Eye, Clock, Headphones, MapPin } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepRulesProps {
  lang: Language;
}

const StepRules = ({ lang }: StepRulesProps) => {
  const rules = [
    { icon: Shield, titleKey: "rule1Title" as const, textKey: "rule1Text" as const },
    { icon: Eye, titleKey: "rule2Title" as const, textKey: "rule2Text" as const },
    { icon: Clock, titleKey: "rule3Title" as const, textKey: "rule3Text" as const },
    { icon: Headphones, titleKey: "rule4Title" as const, textKey: "rule4Text" as const },
    { icon: MapPin, titleKey: "rule5Title" as const, textKey: "rule5Text" as const },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "rulesTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "rulesSubtitle")}</p>
      </div>

      <div className="space-y-3">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.titleKey}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className="glass-card rounded-xl p-4 flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-wavelink-teal/10 flex items-center justify-center shrink-0 mt-0.5">
              <rule.icon className="w-4 h-4 text-wavelink-teal" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5">{t(lang, rule.titleKey)}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{t(lang, rule.textKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StepRules;
