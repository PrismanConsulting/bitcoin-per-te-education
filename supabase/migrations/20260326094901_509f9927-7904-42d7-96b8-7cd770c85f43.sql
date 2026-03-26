
-- Drop the view since it causes issues
DROP VIEW IF EXISTS public_profiles;

-- Create a security definer function for nickname uniqueness check
CREATE OR REPLACE FUNCTION public.is_nickname_taken(check_nickname text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE nickname = check_nickname
    AND deleted_at IS NULL
  );
$$;

-- Grant execute to anon and authenticated
GRANT EXECUTE ON FUNCTION public.is_nickname_taken(text) TO anon, authenticated;
