import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserProfile, DayLog, FoodEntry, MealType } from '@/types/nutrition';
import { formatDate } from '@/utils/nutritionCalculations';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import type { Exercise } from '@/data/exerciseDatabase';
import type { Supplement } from '@/data/supplementDatabase';

export interface Recipe {
  id: string;
  name: string;
  items: { foodId: string; quantity: number }[];
}

export interface WorkoutEntry {
  id: string;
  exercise: Exercise;
  duration: number;
  caloriesBurned: number;
}

export interface SupplementEntry {
  id: string;
  supplement: Supplement;
  quantity: number;
  takenAt: string;
}

interface AppState {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  selectedDate: Date;
  setSelectedDate: (d: Date) => void;
  dayLogs: Record<string, DayLog>;
  addFoodEntry: (date: string, entry: FoodEntry) => void;
  removeFoodEntry: (date: string, entryId: string) => void;
  getEntriesForDate: (date: string) => FoodEntry[];
  getEntriesForMeal: (date: string, meal: MealType) => FoodEntry[];
  weightLog: Record<string, number>;
  logWeight: (date: string, weight: number) => void;
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  removeRecipe: (id: string) => void;
  recentFoods: FoodEntry[];
  workoutLogs: Record<string, WorkoutEntry[]>;
  addWorkoutEntry: (date: string, entry: WorkoutEntry) => void;
  removeWorkoutEntry: (date: string, entryId: string) => void;
  getWorkoutsForDate: (date: string) => WorkoutEntry[];
  supplementLogs: Record<string, SupplementEntry[]>;
  addSupplementEntry: (date: string, entry: SupplementEntry) => void;
  removeSupplementEntry: (date: string, entryId: string) => void;
  getSupplementsForDate: (date: string) => SupplementEntry[];
  dataLoaded: boolean;
}

const defaultProfile: UserProfile = {
  weight: 72,
  height: 162.5,
  age: 25,
  gender: 'male',
  activityLevel: 'moderate',
  goalType: 'maintenance',
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profile, setProfileState] = useState<UserProfile>(defaultProfile);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>({});
  const [weightLog, setWeightLog] = useState<Record<string, number>>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recentFoods, setRecentFoods] = useState<FoodEntry[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<Record<string, WorkoutEntry[]>>({});
  const [supplementLogs, setSupplementLogs] = useState<Record<string, SupplementEntry[]>>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  // Load all data from cloud on mount
  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      // Load user settings (profile)
      const { data: settingsData } = await supabase
        .from('user_settings')
        .select('settings')
        .eq('user_id', user.id)
        .maybeSingle();
      if (settingsData?.settings) {
        setProfileState(settingsData.settings as unknown as UserProfile);
      }

      // Load food entries
      const { data: foodData } = await supabase
        .from('food_entries')
        .select('*')
        .eq('user_id', user.id);
      if (foodData) {
        const logs: Record<string, DayLog> = {};
        const recent: FoodEntry[] = [];
        for (const row of foodData) {
          const entry: FoodEntry = {
            id: row.id,
            foodItem: row.food_item_data as any,
            quantity: Number(row.quantity),
            mealType: row.meal_type as MealType,
          };
          if (!logs[row.date]) logs[row.date] = { date: row.date, entries: [] };
          logs[row.date].entries.push(entry);
          recent.push(entry);
        }
        setDayLogs(logs);
        setRecentFoods(recent.slice(-10).reverse());
      }

      // Load weight logs
      const { data: weightData } = await supabase
        .from('weight_logs')
        .select('*')
        .eq('user_id', user.id);
      if (weightData) {
        const wl: Record<string, number> = {};
        for (const row of weightData) wl[row.date] = Number(row.weight);
        setWeightLog(wl);
      }

      // Load recipes
      const { data: recipeData } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_id', user.id);
      if (recipeData) {
        setRecipes(recipeData.map(r => ({
          id: r.id,
          name: r.name,
          items: r.items as any,
        })));
      }

      // Load workout entries
      const { data: workoutData } = await supabase
        .from('workout_entries')
        .select('*')
        .eq('user_id', user.id);
      if (workoutData) {
        const wl: Record<string, WorkoutEntry[]> = {};
        for (const row of workoutData) {
          const entry: WorkoutEntry = {
            id: row.id,
            exercise: row.exercise_data as any,
            duration: Number(row.duration),
            caloriesBurned: Number(row.calories_burned),
          };
          if (!wl[row.date]) wl[row.date] = [];
          wl[row.date].push(entry);
        }
        setWorkoutLogs(wl);
      }

      // Load supplement entries
      const { data: suppData } = await supabase
        .from('supplement_entries')
        .select('*')
        .eq('user_id', user.id);
      if (suppData) {
        const sl: Record<string, SupplementEntry[]> = {};
        for (const row of suppData) {
          const entry: SupplementEntry = {
            id: row.id,
            supplement: row.supplement_data as any,
            quantity: Number(row.quantity),
            takenAt: row.taken_at,
          };
          if (!sl[row.date]) sl[row.date] = [];
          sl[row.date].push(entry);
        }
        setSupplementLogs(sl);
      }

      setDataLoaded(true);
    };
    loadData();
  }, [user]);

  const setProfile = useCallback((p: UserProfile) => {
    setProfileState(p);
    if (user) {
      supabase.from('user_settings').upsert({
        user_id: user.id,
        settings: p as any,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });
    }
  }, [user]);

  const addFoodEntry = useCallback((date: string, entry: FoodEntry) => {
    setDayLogs(prev => ({
      ...prev,
      [date]: {
        date,
        entries: [...(prev[date]?.entries || []), entry],
      },
    }));
    setRecentFoods(prev => {
      const updated = [entry, ...prev.filter(f => f.foodItem.id !== entry.foodItem.id)];
      return updated.slice(0, 10);
    });
    if (user) {
      supabase.from('food_entries').insert({
        id: entry.id,
        user_id: user.id,
        date,
        food_item_data: entry.foodItem as any,
        quantity: entry.quantity,
        meal_type: entry.mealType,
      }).then(({ error }) => { if (error) console.error('Failed to save food entry:', error); });
    }
  }, [user]);

  const removeFoodEntry = useCallback((date: string, entryId: string) => {
    setDayLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        entries: (prev[date]?.entries || []).filter(e => e.id !== entryId),
      },
    }));
    if (user) {
      supabase.from('food_entries').delete().eq('id', entryId).then(({ error }) => { if (error) console.error('Failed to delete food entry:', error); });
    }
  }, [user]);

  const logWeight = useCallback((date: string, weight: number) => {
    setWeightLog(prev => ({ ...prev, [date]: weight }));
    if (user) {
      supabase.from('weight_logs').upsert({
        user_id: user.id,
        date,
        weight,
      }, { onConflict: 'user_id,date' }).then(({ error }) => { if (error) console.error('Failed to save weight:', error); });
    }
  }, [user]);

  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
    if (user) {
      supabase.from('recipes').insert({
        id: recipe.id,
        user_id: user.id,
        name: recipe.name,
        items: recipe.items as any,
      }).then(({ error }) => { if (error) console.error('Failed to save recipe:', error); });
    }
  }, [user]);

  const removeRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    if (user) {
      supabase.from('recipes').delete().eq('id', id).then(({ error }) => { if (error) console.error('Failed to delete recipe:', error); });
    }
  }, [user]);

  const addWorkoutEntry = useCallback((date: string, entry: WorkoutEntry) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry],
    }));
    if (user) {
      supabase.from('workout_entries').insert({
        id: entry.id,
        user_id: user.id,
        date,
        exercise_data: entry.exercise as any,
        duration: entry.duration,
        calories_burned: entry.caloriesBurned,
      }).then(({ error }) => { if (error) console.error('Failed to save workout:', error); });
    }
  }, [user]);

  const removeWorkoutEntry = useCallback((date: string, entryId: string) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(e => e.id !== entryId),
    }));
    if (user) {
      supabase.from('workout_entries').delete().eq('id', entryId).then(({ error }) => { if (error) console.error('Failed to delete workout:', error); });
    }
  }, [user]);

  const addSupplementEntry = useCallback((date: string, entry: SupplementEntry) => {
    setSupplementLogs(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry],
    }));
    if (user) {
      supabase.from('supplement_entries').insert({
        id: entry.id,
        user_id: user.id,
        date,
        supplement_data: entry.supplement as any,
        quantity: entry.quantity,
        taken_at: entry.takenAt,
      }).then(({ error }) => { if (error) console.error('Failed to save supplement:', error); });
    }
  }, [user]);

  const removeSupplementEntry = useCallback((date: string, entryId: string) => {
    setSupplementLogs(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(e => e.id !== entryId),
    }));
    if (user) {
      supabase.from('supplement_entries').delete().eq('id', entryId).then(({ error }) => { if (error) console.error('Failed to delete supplement:', error); });
    }
  }, [user]);

  const getEntriesForDate = useCallback((date: string) => dayLogs[date]?.entries || [], [dayLogs]);
  const getEntriesForMeal = useCallback((date: string, meal: MealType) =>
    (dayLogs[date]?.entries || []).filter(e => e.mealType === meal), [dayLogs]);
  const getWorkoutsForDate = useCallback((date: string) => workoutLogs[date] || [], [workoutLogs]);
  const getSupplementsForDate = useCallback((date: string) => supplementLogs[date] || [], [supplementLogs]);

  return (
    <AppContext.Provider value={{ profile, setProfile, selectedDate, setSelectedDate, dayLogs, addFoodEntry, removeFoodEntry, getEntriesForDate, getEntriesForMeal, weightLog, logWeight, recipes, addRecipe, removeRecipe, recentFoods, workoutLogs, addWorkoutEntry, removeWorkoutEntry, getWorkoutsForDate, supplementLogs, addSupplementEntry, removeSupplementEntry, getSupplementsForDate, dataLoaded }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
