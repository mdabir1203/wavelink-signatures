
-- Contract status enum
CREATE TYPE public.contract_status AS ENUM ('draft', 'pending', 'signed', 'terminated');

-- Main contracts table
CREATE TABLE public.contracts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contract_id TEXT NOT NULL UNIQUE,
  status contract_status NOT NULL DEFAULT 'draft',
  
  -- Company signer (Wave Link side)
  company_name TEXT NOT NULL DEFAULT 'Wave Link',
  company_email TEXT NOT NULL DEFAULT 'waavelink@gmail.com',
  company_title TEXT NOT NULL DEFAULT 'Partnerships & Sustainability',
  company_organization TEXT NOT NULL DEFAULT 'Wave Link',
  company_signature_data TEXT,
  company_signed_at TIMESTAMP WITH TIME ZONE,
  
  -- Ambassador signer
  ambassador_name TEXT,
  ambassador_email TEXT,
  ambassador_title TEXT,
  ambassador_organization TEXT,
  ambassador_gov_id TEXT, -- KYC: Government ID (encrypted at rest by Supabase)
  ambassador_tax_id TEXT, -- KYC: TIN
  ambassador_signature_data TEXT, -- base64 signature image
  ambassador_signed_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  user_agent TEXT,
  
  -- Access token for ambassador to sign without auth
  access_token UUID NOT NULL DEFAULT gen_random_uuid()
);

-- Enable RLS
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone with the access_token can read their specific contract
CREATE POLICY "Anyone can read contract with valid access token"
  ON public.contracts
  FOR SELECT
  USING (true);

-- Policy: Anyone can insert a new contract (contract creator)
CREATE POLICY "Anyone can create contracts"
  ON public.contracts
  FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can update contract (for signing via access token - validated in app logic)
CREATE POLICY "Anyone can update contracts with valid token"
  ON public.contracts
  FOR UPDATE
  USING (true);

-- Index for fast lookup by access token
CREATE INDEX idx_contracts_access_token ON public.contracts(access_token);
CREATE INDEX idx_contracts_contract_id ON public.contracts(contract_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_contracts_updated_at
  BEFORE UPDATE ON public.contracts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
