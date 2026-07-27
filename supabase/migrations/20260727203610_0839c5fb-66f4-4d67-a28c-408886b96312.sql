
-- 1. Add campaign column to contracts
ALTER TABLE public.contracts ADD COLUMN IF NOT EXISTS campaign text;
CREATE INDEX IF NOT EXISTS contracts_referred_by_campaign_idx ON public.contracts (referred_by, campaign);

-- 2. Update referral stats RPC to return per-campaign breakdown as JSON
DROP FUNCTION IF EXISTS public.get_referral_stats(uuid);
CREATE OR REPLACE FUNCTION public.get_referral_stats(p_token uuid)
RETURNS TABLE(
  contract_id text,
  ambassador_name text,
  status contract_status,
  signed_referrals bigint,
  points bigint,
  campaigns jsonb
)
LANGUAGE sql
STABLE SECURITY DEFINER
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
    ), 0) AS points,
    COALESCE((
      SELECT jsonb_agg(row_to_json(x) ORDER BY x.signed DESC)
      FROM (
        SELECT
          COALESCE(NULLIF(r.campaign, ''), 'direct') AS campaign,
          COUNT(*) FILTER (WHERE r.status = 'signed'::contract_status) AS signed,
          COUNT(*) FILTER (WHERE r.status = 'pending'::contract_status) AS pending,
          COUNT(*) AS total
        FROM contracts r
        WHERE r.referred_by = me.contract_id
        GROUP BY 1
      ) x
    ), '[]'::jsonb) AS campaigns
  FROM me;
$$;

-- 3. Referral notifications table
CREATE TABLE IF NOT EXISTS public.referral_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_contract_id text NOT NULL,
  referred_contract_id text NOT NULL,
  referred_ambassador_name text,
  campaign text,
  channel text NOT NULL DEFAULT 'in_app',
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS referral_notifications_referrer_idx
  ON public.referral_notifications (referrer_contract_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE ON public.referral_notifications TO authenticated;
GRANT ALL ON public.referral_notifications TO service_role;
ALTER TABLE public.referral_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all referral notifications"
ON public.referral_notifications FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Token-gated notifications RPC (list + unread count)
CREATE OR REPLACE FUNCTION public.get_referral_notifications(p_token uuid)
RETURNS TABLE(
  id uuid,
  referred_contract_id text,
  referred_ambassador_name text,
  campaign text,
  read_at timestamptz,
  created_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT n.id, n.referred_contract_id, n.referred_ambassador_name,
         n.campaign, n.read_at, n.created_at
  FROM public.referral_notifications n
  JOIN public.contracts c ON c.contract_id = n.referrer_contract_id
  WHERE c.access_token = p_token
  ORDER BY n.created_at DESC
  LIMIT 100;
$$;
GRANT EXECUTE ON FUNCTION public.get_referral_notifications(uuid) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.mark_referral_notifications_read(p_token uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_contract text;
  v_count integer;
BEGIN
  SELECT contract_id INTO v_contract
  FROM public.contracts WHERE access_token = p_token LIMIT 1;
  IF v_contract IS NULL THEN RETURN 0; END IF;

  UPDATE public.referral_notifications
     SET read_at = now()
   WHERE referrer_contract_id = v_contract AND read_at IS NULL;
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;
GRANT EXECUTE ON FUNCTION public.mark_referral_notifications_read(uuid) TO anon, authenticated;
