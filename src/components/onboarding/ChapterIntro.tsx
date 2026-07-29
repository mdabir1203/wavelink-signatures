import { AnimatePresence, motion } from "framer-motion";
import { Language } from "@/lib/i18n";
import { chapterLabel, getChapter } from "@/lib/journey";

interface Props {
  step: number;
  lang: Language;
  show: boolean;
}

/** Cinematic chapter card that briefly takes over the screen between steps. */
const ChapterIntro = ({ step, lang, show }: Props) => {
  const chapter = getChapter(lang, step);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 px-10 text-center backdrop-blur-md"
          style={{ background: "hsl(var(--wavelink-deep) / 0.82)" }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.45em" }}
            transition={{ duration: 0.7 }}
            className="text-[10px] font-mono uppercase text-wavelink-cyan"
          >
            {chapterLabel(lang)} {chapter.number}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl text-primary-foreground"
          >
            {chapter.title}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-wavelink-cyan to-transparent"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-xs font-body text-sm italic text-primary-foreground/80"
          >
            {chapter.whisper}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChapterIntro;
