
-- Drop the old public SELECT policy
DROP POLICY IF EXISTS "Anyone can view profiles" ON profiles;

-- Create owner-only SELECT policy
CREATE POLICY "Users can select own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create public view exposing only non-sensitive fields
CREATE OR REPLACE VIEW public_profiles AS
  SELECT id, nickname, created_at
  FROM profiles
  WHERE deleted_at IS NULL;

-- Grant access to the view for anon and authenticated roles
GRANT SELECT ON public_profiles TO anon, authenticated;
