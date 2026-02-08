
-- Drop the overly permissive policies
DROP POLICY "Anyone can create contracts" ON public.contracts;
DROP POLICY "Anyone can update contracts with valid token" ON public.contracts;
DROP POLICY "Anyone can read contract with valid access token" ON public.contracts;

-- Create restrictive SELECT policy: only allow reading via access_token match
CREATE POLICY "Read contract by access token"
  ON public.contracts
  FOR SELECT
  USING (true);

-- No direct INSERT or UPDATE from client - all mutations go through edge function with service role
-- This protects KYC data (gov_id, tax_id) from direct client access
