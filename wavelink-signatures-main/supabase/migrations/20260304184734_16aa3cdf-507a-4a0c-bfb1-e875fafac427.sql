
-- 1. Drop the contracts_public view (exposes access_token)
DROP VIEW IF EXISTS public.contracts_public;

-- 2. Recreate without access_token and sensitive fields
CREATE VIEW public.contracts_public
WITH (security_invoker = on) AS
SELECT
  id, contract_id, status,
  company_name, company_title, company_organization,
  ambassador_name, ambassador_title, ambassador_organization,
  company_signed_at, ambassador_signed_at,
  created_at, updated_at
FROM public.contracts;

-- 3. Drop overly permissive SELECT policies
DROP POLICY IF EXISTS "Anon read by access token" ON public.contracts;
DROP POLICY IF EXISTS "Auth users read all" ON public.contracts;

-- 4. Create admin-only SELECT policy
CREATE POLICY "Admins can read all contracts"
ON public.contracts FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5. Drop anon UPDATE policy (signing moves to edge function)
DROP POLICY IF EXISTS "Anon sign pending contracts" ON public.contracts;

-- 6. Create security definer function for token-based contract lookup
CREATE OR REPLACE FUNCTION public.get_contract_by_token(p_token uuid)
RETURNS TABLE (
  id uuid,
  contract_id text,
  status contract_status,
  company_name text,
  company_email text,
  company_title text,
  company_organization text,
  ambassador_name text,
  ambassador_email text,
  ambassador_title text,
  ambassador_organization text,
  company_signed_at timestamptz,
  ambassador_signed_at timestamptz,
  company_signature_data text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    c.id, c.contract_id, c.status,
    c.company_name, c.company_email, c.company_title, c.company_organization,
    c.ambassador_name, c.ambassador_email, c.ambassador_title, c.ambassador_organization,
    c.company_signed_at, c.ambassador_signed_at, c.company_signature_data,
    c.created_at, c.updated_at
  FROM contracts c
  WHERE c.access_token = p_token
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.get_contract_by_token(uuid) TO anon, authenticated;
