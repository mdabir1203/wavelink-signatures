-- Security improvements: Protect sensitive data

-- Add security audit columns for server-side tracking only
ALTER TABLE public.contracts 
ADD COLUMN IF NOT EXISTS ambassador_signature_hash TEXT;

-- Clear any plaintext signature data (clients should not store this)
-- In production, signature data should be stored separately with encryption
UPDATE public.contracts 
SET ambassador_signature_data = NULL 
WHERE ambassador_signature_data IS NOT NULL 
  AND ambassador_signature_data NOT LIKE 'data:image%';

-- Add comment documenting security requirements
COMMENT ON COLUMN public.contracts.ambassador_gov_id IS 'KYC: Government ID - MUST be encrypted at rest and access restricted to server-side operations only';
COMMENT ON COLUMN public.contracts.ambassador_tax_id IS 'KYC: TIN - MUST be encrypted at rest and access restricted to server-side operations only';
COMMENT ON COLUMN public.contracts.ambassador_signature_data IS 'DEPRECATED: Use signature_hash instead. Signature images should be stored separately with encryption.';
COMMENT ON COLUMN public.contracts.ip_address IS 'Should be captured server-side only, not from client user agent';
COMMENT ON COLUMN public.contracts.user_agent IS 'Should be captured server-side only, not from client';

-- Update the public view to NEVER expose sensitive KYC or signature data
DROP VIEW IF EXISTS public.contracts_public CASCADE;

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
  FROM public.contracts
  WHERE true;

-- SECURITY NOTE: The following columns are NEVER exposed to clients:
-- - ambassador_gov_id (sensitive PII)
-- - ambassador_tax_id (sensitive PII)
-- - ambassador_signature_data (large base64 data, privacy concern)
-- - ambassador_signature_hash (internal verification only)
-- - ip_address (privacy)
-- - user_agent (privacy)
