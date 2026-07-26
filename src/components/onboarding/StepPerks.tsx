import { motion } from "framer-motion";
import { Video, Camera, Users, Flame, Trophy, Gift } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepPerksProps {
  lang: Language;
}

const StepPerks = ({ lang }: StepPerksProps) => {
  const perks = [
    { icon: Video, titleKey: "perkVideoTitle" as const, descKey: "perkVideoDesc" as const, tint: "wavelink-teal" },
    { icon: Camera, titleKey: "perkPhotoTitle" as const, descKey: "perkPhotoDesc" as const, tint: "wavelink-blue" },
    { icon: Users, titleKey: "perkReferralTitle" as const, descKey: "perkReferralDesc" as const, tint: "wavelink-teal" },
    { icon: Flame, titleKey: "perkStreakTitle" as const, descKey: "perkStreakDesc" as const, tint: "wavelink-blue" },
    { icon: Trophy, titleKey: "perkLeaderTitle" as const, descKey: "perkLeaderDesc" as const, tint: "wavelink-teal" },
    { icon: Gift, titleKey: "perkSwagTitle" as const, descKey: "perkSwagDesc" as const, tint: "wavelink-blue" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "perksTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "perksSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {perks.map((p, i) => (
          <motion.div
            key={p.titleKey}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className="glass-card rounded-xl p-4 flex items-start gap-3"
          >
            <div className={`w-10 h-10 rounded-xl bg-${p.tint}/10 flex items-center justify-center shrink-0`}>
              <p.icon className={`w-5 h-5 text-${p.tint}`} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm">{t(lang, p.titleKey)}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{t(lang, p.descKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl p-4 text-center animate-pulse-glow"
      >
        <p className="text-sm font-semibold font-body">{t(lang, "perksTip")}</p>
      </motion.div>
    </motion.div>
  );
};

export default StepPerks;