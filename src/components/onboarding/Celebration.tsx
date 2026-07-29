import { motion } from "framer-motion";

const COLORS = ["--wavelink-teal", "--wavelink-cyan", "--wavelink-blue", "--wavelink-navy"];

/** Emotional payoff: a burst of light particles when the journey completes. */
const Celebration = () => {
  const pieces = Array.from({ length: 34 });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((_, i) => {
        const angle = (i / pieces.length) * Math.PI * 2;
        const distance = 140 + (i % 5) * 45;
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-1/2 block rounded-full"
            style={{
              width: 6 + (i % 3) * 3,
              height: 6 + (i % 3) * 3,
              background: `hsl(var(${COLORS[i % COLORS.length]}))`,
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance + 80,
              opacity: 0,
              scale: 1.1,
            }}
            transition={{ duration: 1.6 + (i % 4) * 0.25, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

export default Celebration;
