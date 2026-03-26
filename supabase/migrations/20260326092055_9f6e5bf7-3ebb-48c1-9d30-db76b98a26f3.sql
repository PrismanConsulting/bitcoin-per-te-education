
-- Profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  newsletter_opt_in boolean DEFAULT false,
  gdpr_consent boolean DEFAULT false,
  gdpr_consent_date timestamptz,
  deleted_at timestamptz
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Wall messages table
CREATE TABLE public.wall_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nickname text NOT NULL,
  content text NOT NULL CHECK (char_length(content) <= 280),
  created_at timestamptz DEFAULT now(),
  is_visible boolean DEFAULT true
);

ALTER TABLE public.wall_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible wall messages" ON public.wall_messages
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Auth users can insert wall messages" ON public.wall_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wall messages" ON public.wall_messages
  FOR DELETE USING (auth.uid() = user_id);

-- News comments table
CREATE TABLE public.news_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  nickname text NOT NULL,
  news_url text NOT NULL,
  news_title text NOT NULL,
  content text NOT NULL CHECK (char_length(content) <= 500),
  created_at timestamptz DEFAULT now(),
  is_visible boolean DEFAULT true
);

ALTER TABLE public.news_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visible news comments" ON public.news_comments
  FOR SELECT USING (is_visible = true);

CREATE POLICY "Auth users can insert news comments" ON public.news_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own news comments" ON public.news_comments
  FOR DELETE USING (auth.uid() = user_id);
