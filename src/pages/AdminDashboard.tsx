import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, FileSpreadsheet, Loader2, FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { exportContractsCsv } from "@/lib/exportCsv";

interface Contract {
  id: string;
  contract_id: string;
  status: string;
  company_name: string;
  company_email: string;
  ambassador_name: string | null;
  ambassador_email: string | null;
  ambassador_title: string | null;
  ambassador_organization: string | null;
  ambassador_signed_at: string | null;
  company_signed_at: string | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; className: string }> = {
  signed: { icon: <CheckCircle2 className="w-3.5 h-3.5" />, className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  pending: { icon: <Clock className="w-3.5 h-3.5" />, className: "bg-amber-100 text-amber-700 border-amber-200" },
  draft: { icon: <FileText className="w-3.5 h-3.5" />, className: "bg-muted text-muted-foreground border-border" },
  terminated: { icon: <AlertCircle className="w-3.5 h-3.5" />, className: "bg-red-100 text-red-700 border-red-200" },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("role", "admin")
      .maybeSingle();

    if (!roles) {
      await supabase.auth.signOut();
      navigate("/admin/login");
      return;
    }

    const { data, error } = await supabase
      .from("contracts")
      .select("id, contract_id, status, company_name, company_email, ambassador_name, ambassador_email, ambassador_title, ambassador_organization, ambassador_signed_at, company_signed_at, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "Failed to load contracts.", variant: "destructive" });
    } else {
      setContracts((data as Contract[]) || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const handleExportCsv = () => {
    exportContractsCsv(contracts);
    toast({ title: "Exported", description: "CSV file downloaded." });
  };

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "—";

  const signed = contracts.filter((c) => c.status === "signed").length;
  const pending = contracts.filter((c) => c.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-display font-semibold text-foreground">
              Wave Link — Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs font-body" onClick={handleExportCsv}>
              <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5" />
              Export CSV
            </Button>
            <Button variant="ghost" size="sm" className="text-xs font-body" onClick={handleLogout}>
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Contracts", value: contracts.length, color: "text-foreground" },
            { label: "Signed", value: signed, color: "text-emerald-600" },
            { label: "Pending", value: pending, color: "text-amber-600" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border border-border p-5"
            >
              <p className="text-xs font-body text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body text-xs">Contract ID</TableHead>
                <TableHead className="font-body text-xs">Status</TableHead>
                <TableHead className="font-body text-xs">Ambassador</TableHead>
                <TableHead className="font-body text-xs">Email</TableHead>
                <TableHead className="font-body text-xs">Organization</TableHead>
                <TableHead className="font-body text-xs">Created</TableHead>
                <TableHead className="font-body text-xs">Signed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-sm font-body text-muted-foreground">
                    No contracts yet.
                  </TableCell>
                </TableRow>
              ) : (
                contracts.map((c) => {
                  const sc = statusConfig[c.status] || statusConfig.draft;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.contract_id}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-[10px] font-body gap-1 ${sc.className}`}>
                          {sc.icon}
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-body text-sm">{c.ambassador_name || "—"}</TableCell>
                      <TableCell className="font-body text-xs text-muted-foreground">{c.ambassador_email || "—"}</TableCell>
                      <TableCell className="font-body text-sm">{c.ambassador_organization || "—"}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{formatDate(c.created_at)}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{formatDate(c.ambassador_signed_at)}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
