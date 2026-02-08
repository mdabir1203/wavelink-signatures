import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.95.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // CREATE: Save a new contract
    if (req.method === "POST" && action === "create") {
      const body = await req.json();
      const { contract_id, company_name, company_email, company_title, company_organization } = body;

      if (!contract_id) {
        return new Response(
          JSON.stringify({ error: "contract_id is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from("contracts")
        .insert({
          contract_id,
          status: "pending",
          company_name: company_name || "Wave Link",
          company_email: company_email || "waavelink@gmail.com",
          company_title: company_title || "Partnerships & Sustainability",
          company_organization: company_organization || "Wave Link",
          company_signed_at: new Date().toISOString(),
          company_signature_data: "Wave Link Team",
        })
        .select("id, contract_id, access_token")
        .single();

      if (error) {
        console.error("Create error:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, contract: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // READ: Get contract by access token
    if (req.method === "GET" && action === "get") {
      const token = url.searchParams.get("token");

      if (!token) {
        return new Response(
          JSON.stringify({ error: "Access token is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { data, error } = await supabase
        .from("contracts")
        .select(
          "id, contract_id, status, company_name, company_email, company_title, company_organization, company_signed_at, ambassador_name, ambassador_email, ambassador_title, ambassador_organization, ambassador_signed_at, created_at, updated_at"
        )
        .eq("access_token", token)
        .maybeSingle();

      if (error) {
        console.error("Get error:", error);
        return new Response(
          JSON.stringify({ error: error.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (!data) {
        return new Response(
          JSON.stringify({ error: "Contract not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, contract: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // SIGN: Ambassador signs the contract
    if (req.method === "POST" && action === "sign") {
      const body = await req.json();
      const {
        access_token,
        ambassador_name,
        ambassador_email,
        ambassador_title,
        ambassador_organization,
        ambassador_gov_id,
        ambassador_tax_id,
        ambassador_signature_data,
      } = body;

      if (!access_token) {
        return new Response(
          JSON.stringify({ error: "Access token is required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Validate required KYC fields
      if (!ambassador_name || !ambassador_email || !ambassador_gov_id || !ambassador_tax_id || !ambassador_signature_data) {
        return new Response(
          JSON.stringify({ error: "All KYC fields (name, email, government ID, TIN) and signature are required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Verify contract exists and is pending
      const { data: existing, error: fetchError } = await supabase
        .from("contracts")
        .select("id, status")
        .eq("access_token", access_token)
        .maybeSingle();

      if (fetchError || !existing) {
        return new Response(
          JSON.stringify({ error: "Contract not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (existing.status === "signed") {
        return new Response(
          JSON.stringify({ error: "Contract has already been signed" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get IP and user agent from request
      const ip_address = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unknown";
      const user_agent = req.headers.get("user-agent") || "unknown";

      const { data, error } = await supabase
        .from("contracts")
        .update({
          status: "signed",
          ambassador_name,
          ambassador_email,
          ambassador_title: ambassador_title || null,
          ambassador_organization: ambassador_organization || null,
          ambassador_gov_id,
          ambassador_tax_id,
          ambassador_signature_data,
          ambassador_signed_at: new Date().toISOString(),
          ip_address,
          user_agent,
        })
        .eq("access_token", access_token)
        .eq("status", "pending")
        .select("id, contract_id, status, ambassador_signed_at")
        .single();

      if (error) {
        console.error("Sign error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to sign contract" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, contract: data }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Invalid action. Use: create, get, sign" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
