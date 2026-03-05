import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrgListPopupProps {
    open: boolean;
    onClose: () => void;
}

const orgList = [
    { name: "Gyms & Fitness Centers", emoji: "🏋️", desc: "Health clubs, yoga studios, CrossFit centers" },
    { name: "Boutique Shops", emoji: "🛍️", desc: "Fashion boutiques, specialty retail stores" },
    { name: "Sports Zones", emoji: "⚽", desc: "Sports complexes, gaming zones, arenas" },
    { name: "Theme Parks", emoji: "🎢", desc: "Amusement parks, water parks, entertainment zones" },
    { name: "Educational Institutions", emoji: "🎓", desc: "Schools, colleges, universities, training centers" },
    { name: "SME Enterprises", emoji: "🏢", desc: "Small & medium businesses of all types" },
    { name: "Online Digital Marketplaces", emoji: "🛒", desc: "E-commerce platforms, loyalty card systems" },
    { name: "Consultancy Houses", emoji: "💼", desc: "Business consulting, legal, financial advisory" },
    { name: "Coaching Centres", emoji: "📚", desc: "Tutoring centers, skill development institutes" },
    { name: "Wellness Centres", emoji: "🧘", desc: "Spas, meditation centers, alternative therapy" },
    { name: "High-quality Hair Salons", emoji: "💇", desc: "Premium salons, barbershops, beauty parlors" },
];

const OrgListPopup: React.FC<OrgListPopupProps> = ({ open, onClose }) => {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="bg-card rounded-2xl border border-border shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500/10 via-blue-400/5 to-transparent border-b border-border p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                            <Building2 className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-display font-bold text-foreground">
                                                Target Organizations
                                            </h2>
                                            <p className="text-xs font-body text-muted-foreground">
                                                এই প্রতিষ্ঠানগুলোতে বিক্রি করতে পারবেন
                                            </p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-8 h-8 p-0">
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-5 overflow-y-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4 text-blue-500" />
                                    <p className="text-xs font-display font-semibold text-blue-600 tracking-wide uppercase">
                                        Qualifying Organizations — 20% Commission
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {orgList.map((org, index) => (
                                        <motion.div
                                            key={org.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-xl border border-border bg-accent/10 hover:bg-accent/20 transition-colors"
                                        >
                                            <span className="text-xl flex-shrink-0">{org.emoji}</span>
                                            <div className="min-w-0">
                                                <p className="text-sm font-body font-semibold text-foreground">{org.name}</p>
                                                <p className="text-[11px] font-body text-muted-foreground truncate">{org.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-4 rounded-xl border-2 border-blue-500/20 bg-blue-500/5 p-4 text-center">
                                    <p className="text-xs font-body text-muted-foreground">
                                        উপরের যেকোনো প্রতিষ্ঠানে <strong>Review Stand</strong> বিক্রি করলে আপনি পাবেন
                                    </p>
                                    <p className="text-2xl font-display font-bold text-blue-500 mt-1">20% Commission</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default OrgListPopup;
