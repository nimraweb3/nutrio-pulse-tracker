
-- Drop all existing RESTRICTIVE policies and recreate as PERMISSIVE

-- food_entries
DROP POLICY IF EXISTS "Users own food_entries" ON public.food_entries;
CREATE POLICY "Users can manage own food_entries"
  ON public.food_entries FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- recipes
DROP POLICY IF EXISTS "Users own recipes" ON public.recipes;
CREATE POLICY "Users can manage own recipes"
  ON public.recipes FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- supplement_entries
DROP POLICY IF EXISTS "Users own supplement_entries" ON public.supplement_entries;
CREATE POLICY "Users can manage own supplement_entries"
  ON public.supplement_entries FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- user_settings
DROP POLICY IF EXISTS "Users own user_settings" ON public.user_settings;
CREATE POLICY "Users can manage own user_settings"
  ON public.user_settings FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- weight_logs
DROP POLICY IF EXISTS "Users own weight_logs" ON public.weight_logs;
CREATE POLICY "Users can manage own weight_logs"
  ON public.weight_logs FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- workout_entries
DROP POLICY IF EXISTS "Users own workout_entries" ON public.workout_entries;
CREATE POLICY "Users can manage own workout_entries"
  ON public.workout_entries FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
