
-- Fix: All policies are still RESTRICTIVE. Recreate as PERMISSIVE explicitly.

DROP POLICY IF EXISTS "Users can manage own food_entries" ON public.food_entries;
CREATE POLICY "Users can manage own food_entries" ON public.food_entries AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own profile" ON public.profiles;
CREATE POLICY "Users can manage own profile" ON public.profiles AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own recipes" ON public.recipes;
CREATE POLICY "Users can manage own recipes" ON public.recipes AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own supplement_entries" ON public.supplement_entries;
CREATE POLICY "Users can manage own supplement_entries" ON public.supplement_entries AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own user_settings" ON public.user_settings;
CREATE POLICY "Users can manage own user_settings" ON public.user_settings AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own weight_logs" ON public.weight_logs;
CREATE POLICY "Users can manage own weight_logs" ON public.weight_logs AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own workout_entries" ON public.workout_entries;
CREATE POLICY "Users can manage own workout_entries" ON public.workout_entries AS PERMISSIVE FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
