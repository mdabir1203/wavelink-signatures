
-- Fix: Drop all existing policies and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Anon can create contracts" ON public.contracts;
DROP POLICY IF EXISTS "Anon can read contract by access token" ON public.contracts;
DROP POLICY IF EXISTS "Anon can sign pending contracts" ON public.contracts;
DROP POLICY IF EXISTS "Authenticated users can create contracts" ON public.contracts;
DROP POLICY IF EXISTS "Authenticated users can read contracts" ON public.contracts;
DROP POLICY IF EXISTS "Authenticated users can update contracts" ON public.contracts;

-- Allow anyone to create contracts (anon or authenticated)
CREATE POLICY "Anyone can create contracts"
ON public.contracts FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Anon can only read via access_token (for signing page)
CREATE POLICY "Anon read by access token"
ON public.contracts FOR SELECT
TO anon
USING (false);

-- Anon can update pending contracts (signing)
CREATE POLICY "Anon sign pending contracts"
ON public.contracts FOR UPDATE
TO anon
USING (status = 'pending'::contract_status);

-- Authenticated users full read
CREATE POLICY "Auth users read all"
ON public.contracts FOR SELECT
TO authenticated
USING (true);

-- Authenticated users can update
CREATE POLICY "Auth users update all"
ON public.contracts FOR UPDATE
TO authenticated
USING (true);

-- Create user_roles table for admin access
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
