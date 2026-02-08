import { supabase } from "@/integrations/supabase/client";

const FUNCTIONS_URL = `https://jesymicnypefgscytugp.supabase.co/functions/v1`;

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
  const response = await fetch(`${FUNCTIONS_URL}/contracts?action=create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create contract");
  }
  return data;
}

export async function getContract(accessToken: string) {
  const response = await fetch(
    `${FUNCTIONS_URL}/contracts?action=get&token=${encodeURIComponent(accessToken)}`,
    {
      method: "GET",
      headers: {
        "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch contract");
  }
  return data;
}

export async function signContract(payload: SignContractPayload) {
  const response = await fetch(`${FUNCTIONS_URL}/contracts?action=sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to sign contract");
  }
  return data;
}
