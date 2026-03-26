-- Fix 1: Tighten INSERT policy on profiles
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Fix 2: Add UPDATE policy on wall_messages
CREATE POLICY "wall_messages_update_own" ON wall_messages FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);