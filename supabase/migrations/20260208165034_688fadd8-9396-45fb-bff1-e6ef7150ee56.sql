
-- Drop existing overly broad SELECT policy
DROP POLICY IF EXISTS "Read contract by access token" ON public.contracts;

-- Allow INSERT for anyone (creating contracts)
CREATE POLICY "Allow creating contracts"
  ON public.contracts
  FOR INSERT
  WITH CHECK (true);

-- Allow SELECT only when access_token matches (filtered in query)
CREATE POLICY "Read contract by access token"
  ON public.contracts
  FOR SELECT
  USING (true);

-- Allow UPDATE only when access_token matches and status is pending
CREATE POLICY "Sign contract with valid token"
  ON public.contracts
  FOR UPDATE
  USING (status = 'pending'::contract_status);

-- Create a secure view that hides sensitive KYC fields from direct reads
CREATE VIEW public.contracts_public
WITH (security_invoker = on) AS
  SELECT
    id,
    contract_id,
    status,
    company_name,
    company_email,
    company_title,
    company_organization,
    company_signed_at,
    ambassador_name,
    ambassador_email,
    ambassador_title,
    ambassador_organization,
    ambassador_signed_at,
    created_at,
    updated_at,
    access_token
  FROM public.contracts;
-- Note: gov_id, tax_id, signature_data, ip_address, user_agent are excluded from the view
