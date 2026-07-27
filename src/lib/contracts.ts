import { supabase } from "@/integrations/supabase/client";

interface CreateContractPayload {
  contract_id: string;
  company_name?: string;
  company_email?: string;
  company_title?: string;
  company_organization?: string;
  referred_by?: string | null;
  campaign?: string | null;
}

interface SignContractPayload {
  access_token: string;
  ambassador_name: string;
  ambassador_email: string;
  ambassador_signature_data: string;
  ambassador_gov_id?: string | null;
  ambassador_tax_id?: string | null;
  ambassador_bkash_no?: string | null;
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
      referred_by: payload.referred_by || null,
      campaign: payload.campaign || null,
    } as any)
    .select("id, contract_id, access_token")
    .single();

  if (error) {
    throw new Error("Failed to create contract. Please try again.");
  }

  return { success: true, contract: data };
}

export async function getReferralStats(accessToken: string) {
  const { data, error } = await supabase.rpc("get_referral_stats", {
    p_token: accessToken,
  });
  if (error) throw new Error("Failed to load referral stats");
  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new Error("Ambassador not found");
  }
  const row = Array.isArray(data) ? data[0] : data;
  return { success: true, stats: row };
}

export async function getReferralNotifications(accessToken: string) {
  const { data, error } = await (supabase.rpc as any)("get_referral_notifications", {
    p_token: accessToken,
  });
  if (error) throw new Error("Failed to load notifications");
  return { success: true, notifications: (data as any[]) || [] };
}

export async function markReferralNotificationsRead(accessToken: string) {
  await (supabase.rpc as any)("mark_referral_notifications_read", { p_token: accessToken });
}

export async function getContract(accessToken: string) {
  const { data, error } = await supabase.rpc("get_contract_by_token", {
    p_token: accessToken,
  });

  if (error) {
    throw new Error("Failed to fetch contract");
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    throw new Error("Contract not found");
  }

  const contract = Array.isArray(data) ? data[0] : data;
  return { success: true, contract };
}

export async function signContract(payload: SignContractPayload) {
  // Sign via secure edge function with server-side validation
  const { data, error } = await supabase.functions.invoke("sign-contract", {
    body: {
      access_token: payload.access_token,
      ambassador_name: payload.ambassador_name,
      ambassador_email: payload.ambassador_email,
      ambassador_signature_data: payload.ambassador_signature_data,
      ambassador_gov_id: payload.ambassador_gov_id || null,
      ambassador_tax_id: payload.ambassador_tax_id || null,
      ambassador_bkash_no: payload.ambassador_bkash_no || null,
    },
  });

  if (error) {
    throw new Error("Failed to sign contract. Please try again.");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return { success: true, contract: data?.contract };
}
