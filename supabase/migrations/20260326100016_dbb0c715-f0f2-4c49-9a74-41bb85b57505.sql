-- Remove all existing INSERT policies on profiles
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON profiles;

-- Recreate with explicit authenticated-only check
CREATE POLICY "profiles_insert_self_only"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Also fix UPDATE policy to authenticated only
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "profiles_update_self_only"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Fix wall_messages UPDATE to check is_visible
DROP POLICY IF EXISTS "wall_messages_update_own" ON wall_messages;
CREATE POLICY "wall_messages_update_own"
  ON wall_messages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND is_visible = true)
  WITH CHECK (auth.uid() = user_id AND is_visible = true);

-- Ensure RLS enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wall_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_comments ENABLE ROW LEVEL SECURITY;