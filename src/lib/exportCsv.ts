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
  ambassador_signed_at: string | null;
  company_signed_at: string | null;
  created_at: string;
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
    "Created",
    "Company Signed",
    "Ambassador Signed",
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
    c.created_at,
    c.company_signed_at || "",
    c.ambassador_signed_at || "",
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
