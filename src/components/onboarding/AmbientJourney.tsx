import { motion } from "framer-motion";

/** Living ambient background: drifting light orbs + slow wave layers. */
const AmbientJourney = ({ step }: { step: number }) => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(60% 45% at 20% 15%, hsl(var(--wavelink-cyan) / 0.28), transparent 70%), radial-gradient(55% 50% at 85% 25%, hsl(var(--wavelink-teal) / 0.22), transparent 70%), radial-gradient(70% 50% at 50% 100%, hsl(var(--wavelink-blue) / 0.18), transparent 70%)",
        }}
      />

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: 220 + i * 90,
            height: 220 + i * 90,
            left: `${10 + i * 30}%`,
            top: `${15 + i * 22}%`,
            background: `hsl(var(--wavelink-${["cyan", "teal", "blue"][i]}) / 0.16)`,
          }}
          animate={{
            x: [0, 28 * (i % 2 ? -1 : 1), 0],
            y: [0, -34 - step * 2, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 14 + i * 4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <svg className="absolute bottom-0 w-[200%] h-48 opacity-40" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <motion.path
          d="M0,110 C240,180 480,40 720,110 C960,180 1200,40 1440,110 L1440,200 L0,200 Z"
          fill="hsl(var(--wavelink-teal) / 0.18)"
          animate={{ x: [0, -180, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,140 C260,80 520,190 780,130 C1040,70 1240,170 1440,130 L1440,200 L0,200 Z"
          fill="hsl(var(--wavelink-cyan) / 0.14)"
          animate={{ x: [0, 160, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default AmbientJourney;
