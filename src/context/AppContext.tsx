import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { UserProfile, DayLog, FoodEntry, MealType } from '@/types/nutrition';
import { formatDate } from '@/utils/nutritionCalculations';
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
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function saveToStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
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
  const [profile, setProfileState] = useState<UserProfile>(() =>
    loadFromStorage('nt_profile', defaultProfile)
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>(() =>
    loadFromStorage('nt_dayLogs', {})
  );
  const [weightLog, setWeightLog] = useState<Record<string, number>>(() =>
    loadFromStorage('nt_weightLog', {})
  );
  const [recipes, setRecipes] = useState<Recipe[]>(() =>
    loadFromStorage('nt_recipes', [])
  );
  const [recentFoods, setRecentFoods] = useState<FoodEntry[]>(() =>
    loadFromStorage('nt_recentFoods', [])
  );
  const [workoutLogs, setWorkoutLogs] = useState<Record<string, WorkoutEntry[]>>(() =>
    loadFromStorage('nt_workoutLogs', {})
  );
  const [supplementLogs, setSupplementLogs] = useState<Record<string, SupplementEntry[]>>(() =>
    loadFromStorage('nt_supplementLogs', {})
  );

  // Persist to localStorage whenever state changes
  useEffect(() => { saveToStorage('nt_profile', profile); }, [profile]);
  useEffect(() => { saveToStorage('nt_dayLogs', dayLogs); }, [dayLogs]);
  useEffect(() => { saveToStorage('nt_weightLog', weightLog); }, [weightLog]);
  useEffect(() => { saveToStorage('nt_recipes', recipes); }, [recipes]);
  useEffect(() => { saveToStorage('nt_recentFoods', recentFoods); }, [recentFoods]);
  useEffect(() => { saveToStorage('nt_workoutLogs', workoutLogs); }, [workoutLogs]);
  useEffect(() => { saveToStorage('nt_supplementLogs', supplementLogs); }, [supplementLogs]);

  const setProfile = useCallback((p: UserProfile) => setProfileState(p), []);

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
  }, []);

  const removeFoodEntry = useCallback((date: string, entryId: string) => {
    setDayLogs(prev => ({
      ...prev,
      [date]: {
        ...prev[date],
        entries: (prev[date]?.entries || []).filter(e => e.id !== entryId),
      },
    }));
  }, []);

  const logWeight = useCallback((date: string, weight: number) => {
    setWeightLog(prev => ({ ...prev, [date]: weight }));
  }, []);

  const addRecipe = useCallback((recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  }, []);

  const removeRecipe = useCallback((id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  const addWorkoutEntry = useCallback((date: string, entry: WorkoutEntry) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry],
    }));
  }, []);

  const removeWorkoutEntry = useCallback((date: string, entryId: string) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(e => e.id !== entryId),
    }));
  }, []);

  const getEntriesForDate = useCallback((date: string) => dayLogs[date]?.entries || [], [dayLogs]);
  const getEntriesForMeal = useCallback((date: string, meal: MealType) =>
    (dayLogs[date]?.entries || []).filter(e => e.mealType === meal), [dayLogs]);
  const getWorkoutsForDate = useCallback((date: string) => workoutLogs[date] || [], [workoutLogs]);

  const addSupplementEntry = useCallback((date: string, entry: SupplementEntry) => {
    setSupplementLogs(prev => ({
      ...prev,
      [date]: [...(prev[date] || []), entry],
    }));
  }, []);

  const removeSupplementEntry = useCallback((date: string, entryId: string) => {
    setSupplementLogs(prev => ({
      ...prev,
      [date]: (prev[date] || []).filter(e => e.id !== entryId),
    }));
  }, []);

  const getSupplementsForDate = useCallback((date: string) => supplementLogs[date] || [], [supplementLogs]);

  return (
    <AppContext.Provider value={{ profile, setProfile, selectedDate, setSelectedDate, dayLogs, addFoodEntry, removeFoodEntry, getEntriesForDate, getEntriesForMeal, weightLog, logWeight, recipes, addRecipe, removeRecipe, recentFoods, workoutLogs, addWorkoutEntry, removeWorkoutEntry, getWorkoutsForDate, supplementLogs, addSupplementEntry, removeSupplementEntry, getSupplementsForDate }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
