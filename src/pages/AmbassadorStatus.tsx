import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Copy, Share2, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getReferralStats } from "@/lib/contracts";

interface Stats {
  contract_id: string;
  ambassador_name: string | null;
  status: string;
  signed_referrals: number;
  points: number;
}

const AmbassadorStatus = () => {
  const { token } = useParams();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    getReferralStats(token)
      .then((r) => setStats(r.stats as Stats))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const referralLink = stats
    ? `${window.location.origin}/?ref=${stats.contract_id}`
    : "";

  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Copied!", description: "Referral link copied." });
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Wave Link",
          text: "Become a Wave Link Sustainability Ambassador with me:",
          url: referralLink,
        });
      } catch {}
    } else {
      copy();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wavelink-light to-background">
        <Loader2 className="w-8 h-8 animate-spin text-wavelink-teal" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 gap-3 text-center bg-gradient-to-br from-wavelink-light to-background">
        <p className="text-lg font-semibold font-display">Ambassador not found</p>
        <p className="text-sm text-muted-foreground font-body">
          This status link is invalid or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto px-6 py-10 gap-6 bg-gradient-to-br from-wavelink-light to-background">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-1"
      >
        <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">
          Wave Link Ambassador
        </p>
        <h1 className="text-3xl font-bold font-display">
          {stats.ambassador_name || "Ambassador"}
        </h1>
        <p className="text-xs font-mono text-wavelink-teal">{stats.contract_id}</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 180 }}
        className="glass-card rounded-3xl p-8 text-center space-y-3 animate-pulse-glow"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wavelink-teal to-wavelink-blue flex items-center justify-center mx-auto shadow-lg">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <p className="text-5xl font-bold font-display bg-gradient-to-r from-wavelink-teal to-wavelink-blue bg-clip-text text-transparent">
          {stats.points}
        </p>
        <p className="text-sm font-semibold font-body">Bonus Points</p>
        <p className="text-xs text-muted-foreground font-body">
          {stats.signed_referrals} signed referral{stats.signed_referrals === 1 ? "" : "s"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-5 space-y-3"
      >
        <div>
          <p className="text-xs font-semibold text-foreground">🎁 Your Referral Link</p>
          <p className="text-[11px] text-muted-foreground font-body mt-1">
            Every friend who signs earns you 1 bonus point.
          </p>
        </div>
        <code className="text-[10px] font-mono text-muted-foreground bg-muted px-3 py-2 rounded-lg block break-all">
          {referralLink}
        </code>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={copy}
            className="py-2.5 rounded-xl bg-muted text-foreground text-sm font-semibold flex items-center justify-center gap-1.5 font-body"
          >
            <Copy className="w-3.5 h-3.5" /> Copy
          </button>
          <button
            onClick={share}
            className="py-2.5 rounded-xl bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground text-sm font-semibold flex items-center justify-center gap-1.5 font-body"
          >
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
        </div>
      </motion.div>

      <p className="text-[11px] text-center text-muted-foreground font-body">
        Status: <span className="font-semibold text-foreground">{stats.status}</span>
      </p>
    </div>
  );
};

export default AmbassadorStatus;