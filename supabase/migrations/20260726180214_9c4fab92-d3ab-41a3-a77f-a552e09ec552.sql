-- Add referral tracking column
ALTER TABLE public.contracts
  ADD COLUMN IF NOT EXISTS referred_by TEXT;

CREATE INDEX IF NOT EXISTS contracts_referred_by_idx
  ON public.contracts (referred_by);

-- Public RPC: given an access token, return the ambassador's referral code + stats
CREATE OR REPLACE FUNCTION public.get_referral_stats(p_token uuid)
RETURNS TABLE (
  contract_id text,
  ambassador_name text,
  status contract_status,
  signed_referrals bigint,
  points bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH me AS (
    SELECT c.contract_id, c.ambassador_name, c.status
    FROM contracts c
    WHERE c.access_token = p_token
    LIMIT 1
  )
  SELECT
    me.contract_id,
    me.ambassador_name,
    me.status,
    COALESCE((
      SELECT COUNT(*) FROM contracts r
      WHERE r.referred_by = me.contract_id
        AND r.status = 'signed'::contract_status
    ), 0) AS signed_referrals,
    COALESCE((
      SELECT COUNT(*) FROM contracts r
      WHERE r.referred_by = me.contract_id
        AND r.status = 'signed'::contract_status
    ), 0) AS points
  FROM me;
$$;

GRANT EXECUTE ON FUNCTION public.get_referral_stats(uuid) TO anon, authenticated;