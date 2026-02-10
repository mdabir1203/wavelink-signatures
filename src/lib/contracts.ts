import { supabase } from "@/integrations/supabase/client";

interface CreateContractPayload {
  contract_id: string;
  company_name?: string;
  company_email?: string;
  company_title?: string;
  company_organization?: string;
}

interface SignContractPayload {
  access_token: string;
  ambassador_name: string;
  ambassador_email: string;
  ambassador_title: string;
  ambassador_organization: string;
  ambassador_signature_data: string;
  ambassador_gov_id?: string | null;
  ambassador_tax_id?: string | null;
  // NOTE: KYC data (gov_id, tax_id) should NOT be sent from client
  // These must be collected and validated server-side only
}

export async function createContract(payload: CreateContractPayload) {
  const { data, error } = await supabase
    .from("contracts")
    .insert({
      contract_id: payload.contract_id,
      status: "pending" as any,
      company_name: payload.company_name || "Wave Link",
      company_email: payload.company_email || "waavelink@gmail.com",
      company_title: payload.company_title || "Partnerships & Sustainability",
      company_organization: payload.company_organization || "Wave Link",
      company_signed_at: new Date().toISOString(),
      company_signature_data: "Wave Link Team",
    })
    .select("id, contract_id, access_token")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to create contract");
  }

  return { success: true, contract: data };
}

export async function getContract(accessToken: string) {
  // Use the public view which hides sensitive KYC fields
  const { data, error } = await supabase
    .from("contracts_public" as any)
    .select("*")
    .eq("access_token", accessToken)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to fetch contract");
  }

  if (!data) {
    throw new Error("Contract not found");
  }

  return { success: true, contract: data };
}

export async function signContract(payload: SignContractPayload) {
  // First verify the contract exists and is pending
  const { data: existing, error: fetchError } = await supabase
    .from("contracts_public" as any)
    .select("id, status")
    .eq("access_token", payload.access_token)
    .maybeSingle();

  if (fetchError || !existing) {
    throw new Error("Contract not found");
  }

  if ((existing as any).status === "signed") {
    throw new Error("Contract has already been signed");
  }

  // Update the contract with ambassador details
  // Build an update object and attempt to write. If the DB schema is missing the
  // newer `ambassador_signature_hash` column (schema cache mismatch), retry
  // without that field to avoid crashing the client.
  const signatureHash = payload.ambassador_signature_data
    ? btoa(payload.ambassador_signature_data.substring(0, 100))
    : null;

  const updateObj: any = {
    status: "signed",
    ambassador_name: payload.ambassador_name,
    ambassador_email: payload.ambassador_email,
    ambassador_title: payload.ambassador_title,
    ambassador_organization: payload.ambassador_organization,
    ambassador_signed_at: new Date().toISOString(),
    ambassador_gov_id: payload.ambassador_gov_id ?? null,
    ambassador_tax_id: payload.ambassador_tax_id ?? null,
  };

  if (signatureHash) updateObj.ambassador_signature_hash = signatureHash;

  let res = await supabase
    .from("contracts")
    .update(updateObj as any)
    .eq("access_token", payload.access_token)
    .select("id, contract_id, status, ambassador_signed_at")
    .single();

  // If the error complains about missing column, retry without ambassador_signature_hash
  if (res.error && /ambassador_signature_hash/.test(String(res.error.message))) {
    delete updateObj.ambassador_signature_hash;
    res = await supabase
      .from("contracts")
      .update(updateObj as any)
      .eq("access_token", payload.access_token)
      .select("id, contract_id, status, ambassador_signed_at")
      .single();
  }

  if (res.error) {
    throw new Error(res.error.message || "Failed to sign contract");
  }

  return { success: true, contract: res.data };
}
