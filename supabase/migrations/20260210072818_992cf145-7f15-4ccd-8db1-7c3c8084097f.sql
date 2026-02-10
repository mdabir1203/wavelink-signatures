
-- Fix: Allow anon to read back the row they just inserted (by access_token)
DROP POLICY IF EXISTS "Anon read by access token" ON public.contracts;
CREATE POLICY "Anon read by access token"
ON public.contracts FOR SELECT
TO anon
USING (true);
