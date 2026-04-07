import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Language, LANGUAGES, t } from "@/lib/i18n";

interface LanguageSelectorProps {
  lang: Language;
  onSelect: (lang: Language) => void;
}

const LanguageSelector = ({ lang, onSelect }: LanguageSelectorProps) => {
  return (
    <div className="flex items-center gap-2 px-6 pt-4">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex gap-1.5">
        {LANGUAGES.map((l) => (
          <motion.button
            key={l.code}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(l.code)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              lang === l.code
                ? "bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.flag} {l.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
