
-- Tighten: Only admins can update contracts (authenticated)
DROP POLICY IF EXISTS "Auth users update all" ON public.contracts;
CREATE POLICY "Admin users update contracts"
ON public.contracts FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Tighten: INSERT with check only sets status to pending/draft
DROP POLICY IF EXISTS "Anyone can create contracts" ON public.contracts;
CREATE POLICY "Anyone can create contracts"
ON public.contracts FOR INSERT
TO anon, authenticated
WITH CHECK (status IN ('draft'::contract_status, 'pending'::contract_status));
