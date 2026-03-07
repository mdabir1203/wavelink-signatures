import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SignedStampProps {
  show: boolean;
  signerName: string;
  date: string;
}

const SignedStamp: React.FC<SignedStampProps> = ({ show, signerName, date }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 3, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: -15, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
        >
          <div className="border-4 border-status-signed rounded-lg px-8 py-4 text-center transform">
            <p className="text-2xl font-display font-bold text-status-signed tracking-widest">
              SIGNED
            </p>
            <div className="w-full h-px bg-status-signed/40 my-1" />
            <p className="text-xs font-mono text-status-signed/80">{signerName}</p>
            <p className="text-[10px] font-mono text-status-signed/60">{date}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignedStamp;
