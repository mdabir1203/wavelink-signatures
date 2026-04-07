import { motion } from "framer-motion";
import { Language, t } from "@/lib/i18n";

interface StepWelcomeProps {
  lang: Language;
}

const StepWelcome = ({ lang }: StepWelcomeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
        className="animate-float"
      >
        <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-wavelink-teal to-wavelink-blue flex items-center justify-center shadow-lg">
          <span className="text-5xl">🌊</span>
        </div>
      </motion.div>

      <div className="space-y-3">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold tracking-tight font-display"
        >
          {t(lang, "welcomeTitle")}{" "}
          <span className="bg-gradient-to-r from-wavelink-teal to-wavelink-blue bg-clip-text text-transparent">
            {t(lang, "welcomeHighlight")}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-base leading-relaxed max-w-sm font-body"
        >
          {t(lang, "welcomeSubtitle")}{" "}
          <span className="text-wavelink-teal font-semibold">Sustainability Ambassador</span>.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-2xl p-5 w-full max-w-sm"
      >
        <p className="text-sm text-muted-foreground italic font-body">
          {t(lang, "welcomeQuote")}
        </p>
        <p className="text-xs text-wavelink-teal mt-3 font-medium">
          {t(lang, "welcomeQuoteAuthor")}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-muted-foreground/70 italic font-body"
      >
        {t(lang, "welcomeTagline")}
      </motion.p>
    </motion.div>
  );
};

export default StepWelcome;
