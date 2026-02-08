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
  ambassador_gov_id: string;
  ambassador_tax_id: string;
  ambassador_signature_data: string;
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
  const { data, error } = await supabase
    .from("contracts")
    .update({
      status: "signed" as any,
      ambassador_name: payload.ambassador_name,
      ambassador_email: payload.ambassador_email,
      ambassador_title: payload.ambassador_title,
      ambassador_organization: payload.ambassador_organization,
      ambassador_gov_id: payload.ambassador_gov_id,
      ambassador_tax_id: payload.ambassador_tax_id,
      ambassador_signature_data: payload.ambassador_signature_data,
      ambassador_signed_at: new Date().toISOString(),
      ip_address: "client",
      user_agent: navigator.userAgent,
    } as any)
    .eq("access_token", payload.access_token)
    .select("id, contract_id, status, ambassador_signed_at")
    .single();

  if (error) {
    throw new Error(error.message || "Failed to sign contract");
  }

  return { success: true, contract: data };
}
