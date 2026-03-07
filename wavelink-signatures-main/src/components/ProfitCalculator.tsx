import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, X, Calculator, CreditCard, Building2, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfitCalculatorProps {
    open: boolean;
    onClose: () => void;
}

type SaleType = "cards" | "organization" | "single";

type StandVariant = "semi" | "full";
type SingleVariant = "card" | "stand_semi" | "stand_full";

const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ open, onClose }) => {
    const [saleType, setSaleType] = useState<SaleType>("cards");
    const [standVariant, setStandVariant] = useState<StandVariant>("semi");
    const [singleVariant, setSingleVariant] = useState<SingleVariant>("card");
    const [quantity, setQuantity] = useState<string>("10");
    const [showOrgList, setShowOrgList] = useState(false);

    const qty = Math.max(1, Number(quantity) || 0);

    const unitPrice = useMemo(() => {
        if (saleType === "cards") return 599;
        if (saleType === "organization") return standVariant === "semi" ? 1212 : 1515;
        if (saleType === "single") {
            if (singleVariant === "card") return 599;
            if (singleVariant === "stand_semi") return 1212;
            return 1515;
        }
        return 599;
    }, [saleType, standVariant, singleVariant]);

    const result = useMemo(() => {
        const totalRevenue = unitPrice * qty;

        if (saleType === "cards") {
            let rate = 0;
            if (qty >= 30) rate = 20;
            else if (qty >= 20) rate = 14;
            else if (qty >= 10) rate = 7;
            else rate = 5; // below milestone, single unit rate

            const commission = (totalRevenue * rate) / 100;
            return { rate, commission, totalRevenue, milestone: getMilestoneLabel(qty) };
        }

        if (saleType === "organization") {
            const rate = 20;
            const commission = (totalRevenue * rate) / 100;
            return { rate, commission, totalRevenue, milestone: "Large Organization" };
        }

        // single unit
        const rate = 5;
        const commission = (totalRevenue * rate) / 100;
        return { rate, commission, totalRevenue, milestone: "Single Unit" };
    }, [saleType, unitPrice, qty]);

    function getMilestoneLabel(qty: number): string {
        if (qty >= 30) return "🔥 30+ Cards — Top Tier!";
        if (qty >= 20) return "💪 20+ Cards — Great Progress!";
        if (qty >= 10) return "🚀 10+ Cards — Milestone Reached!";
        return "📦 Below 10 — Single Unit Rate";
    }

    const saleTypes = [
        { id: "cards" as SaleType, label: "Cards", icon: CreditCard, desc: "NFC Digital Cards" },
        { id: "organization" as SaleType, label: "Stand", icon: Building2, desc: "Review Stands & Partnerships" },
        { id: "single" as SaleType, label: "Single Unit", icon: ShoppingBag, desc: "Individual Sales" },
    ];

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-transparent border-b border-border p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-display font-bold text-foreground">
                                                Profit Potential Calculator
                                            </h2>
                                            <p className="text-xs font-body text-muted-foreground">
                                                দেখুন আপনি কত আয় করতে পারবেন
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 space-y-5 overflow-y-auto">
                                {/* Pricing Info */}
                                <div className="rounded-xl border border-border bg-accent/10 p-3 mb-1">
                                    <p className="text-[10px] font-display font-semibold text-muted-foreground tracking-widest uppercase mb-2">
                                        Product Pricing
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="text-center rounded-lg bg-background/60 px-2 py-2">
                                            <p className="text-[10px] font-body text-muted-foreground">Card</p>
                                            <p className="text-sm font-display font-bold text-foreground">৳599</p>
                                        </div>
                                        <div className="text-center rounded-lg bg-background/60 px-2 py-2">
                                            <p className="text-[10px] font-body text-muted-foreground">Stand (Semi)</p>
                                            <p className="text-sm font-display font-bold text-foreground">৳1,212</p>
                                        </div>
                                        <div className="text-center rounded-lg bg-background/60 px-2 py-2">
                                            <p className="text-[10px] font-body text-muted-foreground">Stand (Full)</p>
                                            <p className="text-sm font-display font-bold text-foreground">৳1,515</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Org List Section */}
                                <div className="rounded-xl border border-border overflow-hidden">
                                    <button
                                        onClick={() => setShowOrgList(!showOrgList)}
                                        className="w-full flex items-center justify-between p-3 bg-blue-500/5 hover:bg-blue-500/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Building2 className="w-4 h-4 text-blue-500" />
                                            <span className="text-xs font-display font-semibold text-blue-600 tracking-wide uppercase">
                                                Check the List of Org You Can Sell
                                            </span>
                                            <span className="text-[9px] font-body text-blue-400 ml-1">(শুধু চট্টগ্রাম)</span>
                                        </div>
                                        {showOrgList ? (
                                            <ChevronUp className="w-4 h-4 text-blue-500" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-blue-500" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {showOrgList && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-3 space-y-2 border-t border-border">
                                                    {[
                                                        { name: "Gyms & Fitness Centers", emoji: "🏋️", count: "৩৫০+" },
                                                        { name: "Boutique Shops", emoji: "🛍️", count: "৮০০+" },
                                                        { name: "Sports Zones/Turfs", emoji: "⚽", count: "৩০+" },
                                                        { name: "Theme Parks", emoji: "🎢", count: "৮-১০টি" },
                                                        { name: "Educational Institutions", emoji: "🎓", count: "১,৫০০+" },
                                                        { name: "SME Enterprises", emoji: "🏢", count: "১০,০০০+" },
                                                        { name: "Digital Marketplaces", emoji: "🛒", count: "৫০০+ (সক্রিয়)" },
                                                        { name: "Consultancy Houses", emoji: "💼", count: "৮০০+" },
                                                        { name: "Coaching Centres", emoji: "📚", count: "৬০০+" },
                                                        { name: "Wellness Centres/Spas", emoji: "🧘", count: "১৫০+" },
                                                        { name: "High-quality Salons", emoji: "💇", count: "২৫০+" },
                                                    ].map((org) => (
                                                        <div
                                                            key={org.name}
                                                            className="flex items-center justify-between px-3 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-base">{org.emoji}</span>
                                                                <span className="text-xs font-body font-semibold text-foreground">{org.name}</span>
                                                            </div>
                                                            <span className="text-[10px] font-mono text-muted-foreground">{org.count}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Sale Type Selector */}
                                <div>
                                    <label className="text-xs font-display font-semibold text-foreground tracking-wide uppercase mb-2 block">
                                        Sale Type
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {saleTypes.map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => { setSaleType(type.id); setQuantity(type.id === "single" ? "1" : "10"); }}
                                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 ${saleType === type.id
                                                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-600"
                                                    : "border-border bg-accent/20 text-muted-foreground hover:border-emerald-300"
                                                    }`}
                                            >
                                                <type.icon className="w-5 h-5" />
                                                <span className="text-xs font-body font-semibold">{type.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Single Unit Variant Selector */}
                                {saleType === "single" && (
                                    <div>
                                        <label className="text-xs font-display font-semibold text-foreground tracking-wide uppercase mb-2 block">
                                            Product Type
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => setSingleVariant("card")}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${singleVariant === "card"
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-border bg-accent/20 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <p className="text-xs font-body font-semibold text-foreground">Card</p>
                                                <p className="text-sm font-display font-bold text-emerald-500">৳599</p>
                                            </button>
                                            <button
                                                onClick={() => setSingleVariant("stand_semi")}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${singleVariant === "stand_semi"
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-border bg-accent/20 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <p className="text-[10px] font-body font-semibold text-foreground">Stand (Semi)</p>
                                                <p className="text-sm font-display font-bold text-emerald-500">৳1,212</p>
                                            </button>
                                            <button
                                                onClick={() => setSingleVariant("stand_full")}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${singleVariant === "stand_full"
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-border bg-accent/20 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <p className="text-[10px] font-body font-semibold text-foreground">Stand (Full)</p>
                                                <p className="text-sm font-display font-bold text-emerald-500">৳1,515</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Stand Variant Selector */}
                                {saleType === "organization" && (
                                    <div>
                                        <label className="text-xs font-display font-semibold text-foreground tracking-wide uppercase mb-2 block">
                                            Stand Type
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => setStandVariant("semi")}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${standVariant === "semi"
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-border bg-accent/20 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <p className="text-xs font-body font-semibold text-foreground">Semi Customized</p>
                                                <p className="text-sm font-display font-bold text-emerald-500">৳1,212</p>
                                            </button>
                                            <button
                                                onClick={() => setStandVariant("full")}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 text-center ${standVariant === "full"
                                                    ? "border-emerald-500 bg-emerald-500/10"
                                                    : "border-border bg-accent/20 hover:border-emerald-300"
                                                    }`}
                                            >
                                                <p className="text-xs font-body font-semibold text-foreground">Full Customized</p>
                                                <p className="text-sm font-display font-bold text-emerald-500">৳1,515</p>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Inputs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-display font-semibold text-foreground tracking-wide uppercase mb-1.5 block">
                                            Unit Price (৳)
                                        </label>
                                        <div className="w-full px-3 py-2.5 rounded-lg border border-border bg-accent/20 text-sm font-mono text-foreground">
                                            ৳{unitPrice.toLocaleString()}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-display font-semibold text-foreground tracking-wide uppercase mb-1.5 block">
                                            Quantity
                                        </label>
                                        <input
                                            type="number"
                                            min={1}
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Quick quantity buttons for cards */}
                                {saleType === "cards" && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-body text-muted-foreground">Quick:</span>
                                        {[10, 20, 30, 50].map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => setQuantity(String(q))}
                                                className={`px-3 py-1 rounded-full text-xs font-body font-semibold transition-all ${qty === q
                                                    ? "bg-emerald-500 text-white"
                                                    : "bg-accent/30 text-muted-foreground hover:bg-emerald-500/20"
                                                    }`}
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Result */}
                                <motion.div
                                    key={`${saleType}-${unitPrice}-${quantity}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 p-5"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Calculator className="w-4 h-4 text-emerald-500" />
                                        <span className="text-xs font-display font-semibold text-emerald-600 tracking-wide uppercase">
                                            Your Estimated Earnings
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 mb-3">
                                        <div className="text-center">
                                            <p className="text-[10px] font-body text-muted-foreground mb-0.5">Total Revenue</p>
                                            <p className="text-sm font-display font-bold text-foreground">
                                                ৳{result.totalRevenue.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-body text-muted-foreground mb-0.5">Commission Rate</p>
                                            <p className="text-sm font-display font-bold text-emerald-600">{result.rate}%</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-body text-muted-foreground mb-0.5">Your Earnings</p>
                                            <p className="text-lg font-display font-bold text-emerald-500">
                                                ৳{result.commission.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-background/50 rounded-lg px-3 py-2 text-center">
                                        <p className="text-xs font-body text-muted-foreground">{result.milestone}</p>
                                    </div>
                                </motion.div>

                                {/* Commission Rate Table */}
                                {saleType === "cards" && (
                                    <div className="rounded-lg border border-border overflow-hidden">
                                        <table className="w-full text-xs font-body">
                                            <thead>
                                                <tr className="bg-accent/30">
                                                    <th className="text-left px-3 py-2 font-semibold text-foreground">Milestone</th>
                                                    <th className="text-center px-3 py-2 font-semibold text-foreground">Rate</th>
                                                    <th className="text-right px-3 py-2 font-semibold text-foreground">Earnings @৳{unitPrice}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { cards: 10, rate: 7 },
                                                    { cards: 20, rate: 14 },
                                                    { cards: 30, rate: 20 },
                                                ].map((m) => (
                                                    <tr
                                                        key={m.cards}
                                                        className={`border-t border-border ${qty >= m.cards ? "bg-emerald-500/5" : ""
                                                            }`}
                                                    >
                                                        <td className="px-3 py-2 text-muted-foreground">
                                                            {qty >= m.cards ? "✅" : "⬜"} Sell {m.cards} Cards
                                                        </td>
                                                        <td className="px-3 py-2 text-center font-semibold text-foreground">{m.rate}%</td>
                                                        <td className="px-3 py-2 text-right font-mono text-foreground">
                                                            ৳{((unitPrice * m.cards * m.rate) / 100).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfitCalculator;
