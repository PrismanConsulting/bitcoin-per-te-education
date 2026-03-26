-- Create registro_celle table
CREATE TABLE public.registro_celle (
  id integer PRIMARY KEY CHECK (id >= 1 AND id <= 21000),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  nickname text NOT NULL CHECK (char_length(nickname) <= 20),
  frase text NOT NULL CHECK (char_length(frase) <= 60),
  sat_cost integer NOT NULL DEFAULT 0,
  claimed_at timestamptz DEFAULT now(),
  color text NOT NULL DEFAULT '#F7931A'
);

ALTER TABLE public.registro_celle ENABLE ROW LEVEL SECURITY;

CREATE POLICY "registro_celle_select_public"
  ON public.registro_celle FOR SELECT
  TO public
  USING (true);

CREATE POLICY "registro_celle_insert_auth"
  ON public.registro_celle FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "registro_celle_update_own"
  ON public.registro_celle FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "registro_celle_delete_own"
  ON public.registro_celle FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS sat_balance integer DEFAULT 1000;