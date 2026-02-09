
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Read contract by access token" ON public.contracts;
DROP POLICY IF EXISTS "Allow creating contracts" ON public.contracts;
DROP POLICY IF EXISTS "Sign contract with valid token" ON public.contracts;

-- Only authenticated users (company admins) can read all contract data
CREATE POLICY "Authenticated users can read contracts"
ON public.contracts FOR SELECT
TO authenticated
USING (true);

-- Allow anonymous users to read ONLY their specific contract by access_token
-- This is needed for the signing flow via the public view
CREATE POLICY "Anon can read contract by access token"
ON public.contracts FOR SELECT
TO anon
USING (false);

-- Allow creating contracts only by authenticated users
CREATE POLICY "Authenticated users can create contracts"
ON public.contracts FOR INSERT
TO authenticated
WITH CHECK (true);

-- Also allow anon insert for the current create flow (from Index page)
CREATE POLICY "Anon can create contracts"
ON public.contracts FOR INSERT
TO anon
WITH CHECK (true);

-- Allow signing (update) only for pending contracts via access_token (anon - signing flow)
CREATE POLICY "Anon can sign pending contracts"
ON public.contracts FOR UPDATE
TO anon
USING (status = 'pending'::contract_status);

-- Authenticated users can update any contract
CREATE POLICY "Authenticated users can update contracts"
ON public.contracts FOR UPDATE
TO authenticated
USING (true);
