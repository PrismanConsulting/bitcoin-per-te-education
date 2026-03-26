
-- Recreate the view with SECURITY INVOKER (not SECURITY DEFINER)
DROP VIEW IF EXISTS public_profiles;
CREATE VIEW public_profiles WITH (security_invoker = true) AS
  SELECT id, nickname, created_at
  FROM profiles
  WHERE deleted_at IS NULL;

GRANT SELECT ON public_profiles TO anon, authenticated;
