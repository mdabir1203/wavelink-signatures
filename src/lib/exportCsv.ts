interface ContractRow {
  contract_id: string;
  status: string;
  company_name: string;
  company_email: string;
  ambassador_name: string | null;
  ambassador_email: string | null;
  ambassador_title: string | null;
  ambassador_organization: string | null;
  ambassador_gov_id?: string | null;
  ambassador_tax_id?: string | null;
  ambassador_bkash_no?: string | null;
  ambassador_signed_at: string | null;
  company_signed_at: string | null;
  created_at: string;
  referred_by?: string | null;
  campaign?: string | null;
}

export function exportContractsCsv(contracts: ContractRow[]) {
  const headers = [
    "Contract ID",
    "Status",
    "Company",
    "Company Email",
    "Ambassador Name",
    "Ambassador Email",
    "Ambassador Title",
    "Ambassador Organization",
    "Ambassador GOV ID",
    "Ambassador Tax ID",
    "Ambassador bKash No",
    "Created",
    "Company Signed",
    "Ambassador Signed",
    "Referred By",
    "Campaign",
  ];

  const rows = contracts.map((c) => [
    c.contract_id,
    c.status,
    c.company_name,
    c.company_email,
    c.ambassador_name || "",
    c.ambassador_email || "",
    c.ambassador_title || "",
    c.ambassador_organization || "",
    c.ambassador_gov_id || "",
    c.ambassador_tax_id || "",
    c.ambassador_bkash_no || "",
    c.created_at,
    c.company_signed_at || "",
    c.ambassador_signed_at || "",
    c.referred_by || "",
    c.campaign || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wavelink-contracts-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

interface CampaignRow {
  referrer_contract_id: string;
  referrer_name: string | null;
  campaign: string;
  total: number;
  signed: number;
  pending: number;
}

export function exportCampaignMetricsCsv(rows: CampaignRow[]) {
  const headers = ["Referrer Contract", "Referrer Name", "Campaign", "Total", "Signed", "Pending"];
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      [r.referrer_contract_id, r.referrer_name || "", r.campaign, r.total, r.signed, r.pending]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `wavelink-campaign-metrics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
