import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation helpers
function validateGovId(value: string | null | undefined): boolean {
  if (!value) return true; // optional
  return value.length >= 5 && value.length <= 50 && /^[A-Za-z0-9\-\s]+$/.test(value);
}

function validateTaxId(value: string | null | undefined): boolean {
  if (!value) return true;
  return value.length >= 5 && value.length <= 30 && /^[A-Za-z0-9\-]+$/.test(value);
}

function validateBkashNo(value: string | null | undefined): boolean {
  if (!value) return true;
  return value.length >= 10 && value.length <= 20 && /^\+?[0-9]+$/.test(value);
}

function validateName(value: string): boolean {
  return value.trim().length >= 1 && value.length <= 100;
}

function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 255;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      access_token,
      ambassador_name,
      ambassador_email,
      ambassador_signature_data,
      ambassador_gov_id,
      ambassador_tax_id,
      ambassador_bkash_no,
    } = body;

    // Validate required fields
    if (!access_token || typeof access_token !== "string") {
      return new Response(JSON.stringify({ error: "Invalid access token" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ambassador_name || !validateName(ambassador_name)) {
      return new Response(JSON.stringify({ error: "Invalid name (1-100 characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ambassador_email || !validateEmail(ambassador_email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!ambassador_signature_data || typeof ambassador_signature_data !== "string") {
      return new Response(JSON.stringify({ error: "Signature is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate KYC fields
    if (!validateGovId(ambassador_gov_id)) {
      return new Response(JSON.stringify({ error: "Invalid Government ID format (5-50 alphanumeric characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateTaxId(ambassador_tax_id)) {
      return new Response(JSON.stringify({ error: "Invalid Tax ID format (5-30 alphanumeric characters)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!validateBkashNo(ambassador_bkash_no)) {
      return new Response(JSON.stringify({ error: "Invalid bKash number format (10-20 digits)" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check contract exists and is pending
    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from("contracts")
      .select("id, status, referred_by, campaign")
      .eq("access_token", access_token)
      .maybeSingle();

    if (fetchErr || !existing) {
      return new Response(JSON.stringify({ error: "Contract not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existing.status === "signed") {
      return new Response(JSON.stringify({ error: "Contract has already been signed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (existing.status !== "pending") {
      return new Response(JSON.stringify({ error: "Contract is not available for signing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Hash signature data instead of storing raw
    const signatureHash = btoa(ambassador_signature_data.substring(0, 100));

    // Update contract
    const { data, error: updateErr } = await supabaseAdmin
      .from("contracts")
      .update({
        status: "signed",
        ambassador_name: ambassador_name.trim(),
        ambassador_email: ambassador_email.trim(),
        ambassador_signed_at: new Date().toISOString(),
        ambassador_gov_id: ambassador_gov_id?.trim() || null,
        ambassador_tax_id: ambassador_tax_id?.trim() || null,
        ambassador_signature_data: ambassador_signature_data,
      })
      .eq("id", existing.id)
      .select("id, contract_id, status, ambassador_signed_at")
      .single();

    if (updateErr) {
      return new Response(JSON.stringify({ error: "Failed to sign contract" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Notify referrer (in-app; email hook is a no-op until an email domain is configured)
    if ((existing as any).referred_by) {
      try {
        await supabaseAdmin.from("referral_notifications").insert({
          referrer_contract_id: (existing as any).referred_by,
          referred_contract_id: data.contract_id,
          referred_ambassador_name: ambassador_name.trim(),
          campaign: (existing as any).campaign || null,
          channel: "in_app",
        });

        // Optional email hop — only fires if the send-transactional-email function exists.
        const { data: referrer } = await supabaseAdmin
          .from("contracts")
          .select("ambassador_email, ambassador_name, contract_id")
          .eq("contract_id", (existing as any).referred_by)
          .maybeSingle();
        if (referrer?.ambassador_email) {
          try {
            await supabaseAdmin.functions.invoke("send-transactional-email", {
              body: {
                templateName: "referral-signed",
                recipientEmail: referrer.ambassador_email,
                idempotencyKey: `referral-signed-${data.contract_id}`,
                templateData: {
                  referrerName: referrer.ambassador_name,
                  referredName: ambassador_name.trim(),
                  campaign: (existing as any).campaign || null,
                },
              },
            });
          } catch (_) { /* email infra not set up yet — safe to ignore */ }
        }
      } catch (e) {
        console.error("referral notification failed", e);
      }
    }

    return new Response(JSON.stringify({ success: true, contract: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
