import React, { createContext, useContext, useState, useCallback } from 'react';
import { UserProfile, DayLog, FoodEntry, MealType } from '@/types/nutrition';
import { formatDate } from '@/utils/nutritionCalculations';

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
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>({
    weight: 72,
    height: 162.5,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate',
    goalType: 'maintenance',
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>({});

  const addFoodEntry = useCallback((date: string, entry: FoodEntry) => {
    setDayLogs(prev => ({
      ...prev,
      [date]: {
        date,
        entries: [...(prev[date]?.entries || []), entry],
      },
    }));
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

  const getEntriesForDate = useCallback((date: string) => dayLogs[date]?.entries || [], [dayLogs]);
  const getEntriesForMeal = useCallback((date: string, meal: MealType) =>
    (dayLogs[date]?.entries || []).filter(e => e.mealType === meal), [dayLogs]);

  return (
    <AppContext.Provider value={{ profile, setProfile, selectedDate, setSelectedDate, dayLogs, addFoodEntry, removeFoodEntry, getEntriesForDate, getEntriesForMeal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}
