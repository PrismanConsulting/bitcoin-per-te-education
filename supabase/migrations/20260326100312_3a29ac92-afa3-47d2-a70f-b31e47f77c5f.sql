-- Fix 1: Tighten SELECT on profiles to owner only
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_select" ON profiles;
DROP POLICY IF EXISTS "Users can select own profile" ON profiles;

CREATE POLICY "profiles_select_own_full"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Fix 2: Add UPDATE policy on news_comments
CREATE POLICY "news_comments_update_own"
  ON news_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);