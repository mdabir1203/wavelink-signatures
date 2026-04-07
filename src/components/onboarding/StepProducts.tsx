import { motion } from "framer-motion";
import { Store, CreditCard, Building2 } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface StepProductsProps {
  lang: Language;
}

const StepProducts = ({ lang }: StepProductsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 gap-5"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold font-display">{t(lang, "productsTitle")}</h2>
        <p className="text-muted-foreground text-sm font-body">{t(lang, "productsSubtitle")}</p>
      </div>

      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card rounded-2xl p-5 space-y-3 border-2 border-wavelink-teal/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wavelink-teal/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-wavelink-teal" />
              </div>
              <h3 className="font-semibold text-sm">{t(lang, "reviewStands")}</h3>
            </div>
            <span className="text-wavelink-teal font-mono text-sm font-bold bg-wavelink-teal/10 px-3 py-1 rounded-full">
              20%
            </span>
          </div>
          <div className="flex items-center gap-2 pl-1">
            <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t(lang, "qualifyingOrgs")}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-5 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-wavelink-blue/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-wavelink-blue" />
              </div>
              <h3 className="font-semibold text-sm">{t(lang, "singleUnit")}</h3>
            </div>
            <span className="text-wavelink-blue font-mono text-sm font-bold bg-wavelink-blue/10 px-3 py-1 rounded-full">
              5%
            </span>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="glass-card rounded-xl p-4 space-y-2"
        >
          <p className="text-xs font-semibold text-foreground">{t(lang, "netRevenue")}</p>
          <p className="text-xs text-muted-foreground">{t(lang, "netRevenueDesc")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="glass-card rounded-xl p-4 space-y-2"
        >
          <p className="text-xs font-semibold text-foreground">{t(lang, "payoutTiming")}</p>
          <p className="text-xs text-muted-foreground">{t(lang, "payoutTimingDesc")}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepProducts;
