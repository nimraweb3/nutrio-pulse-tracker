import { useState } from 'react';
import Header from '@/components/Header';
import { DesktopSidebar, MobileNavTrigger, type AppView, NAV_ITEMS } from '@/components/AppNav';
import UserProfileCard from '@/components/UserProfileCard';
import DailyCalendar from '@/components/DailyCalendar';
import MealLogger from '@/components/MealLogger';
import NutritionSummary from '@/components/NutritionSummary';
import MicronutrientPanel from '@/components/MicronutrientPanel';
import SmartRecommendations from '@/components/SmartRecommendations';
import WeightTracker from '@/components/WeightTracker';
import WeeklyAnalytics from '@/components/WeeklyAnalytics';
import RecipeBuilder from '@/components/RecipeBuilder';
import WorkoutTracker from '@/components/WorkoutTracker';
import WeeklyInsights from '@/components/WeeklyInsights';
import SupplementTracker from '@/components/SupplementTracker';
import MonthlyCalendar from '@/components/MonthlyCalendar';
import DailyGoalBanner from '@/components/DailyGoalBanner';
import ChefChat from '@/components/ChefChat';
import GoalsTracker from '@/components/GoalsTracker';
import CalisthenicsWorkout from '@/components/CalisthenicsWorkout';
import { useAppState } from '@/context/AppContext';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { dataLoaded } = useAppState();
  const [view, setView] = useState<AppView>('dashboard');

  if (!dataLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading your data...</p>
          </div>
        </div>
      </div>
    );
  }

  const activeMeta = NAV_ITEMS.find(n => n.id === view)!;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex max-w-7xl mx-auto">
        <DesktopSidebar view={view} onChange={setView} />

        <main className="flex-1 min-w-0 px-4 sm:px-6 py-5 sm:py-6 pb-10">
          {/* Page header */}
          <div className="mb-5 flex items-center gap-3">
            <MobileNavTrigger view={view} onChange={setView} />
            <div className="gradient-primary p-2 rounded-lg shadow-cute hidden sm:flex">
              <activeMeta.icon className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-display text-foreground truncate">{activeMeta.label}</h1>
              <p className="text-xs text-muted-foreground truncate">
                {view === 'dashboard'   && "Today's totals, goals and weight"}
                {view === 'food'        && 'Log meals and track macros for the day'}
                {view === 'workouts'    && 'Cardio, gym and home workouts'}
                {view === 'calisthenics'&& 'No-equipment routine that logs calories'}
                {view === 'calendar'    && 'Monthly view of your nutrition history'}
                {view === 'analytics'   && 'Weekly trends and progress charts'}
                {view === 'insights'    && 'Tips based on what you logged this week'}
              </p>
            </div>
          </div>



          {view === 'dashboard' && (
            <div className="space-y-5">
              <DailyGoalBanner />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="space-y-5 xl:col-span-1">
                  <UserProfileCard />
                  <WeightTracker />
                  <GoalsTracker />
                </div>
                <div className="space-y-5 xl:col-span-2">
                  <DailyCalendar />
                  <NutritionSummary />
                  <SmartRecommendations />
                </div>
              </div>
            </div>
          )}

          {view === 'food' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 space-y-5">
                <DailyCalendar />
                <MealLogger />
                <NutritionSummary />
              </div>
              <div className="space-y-5">
                <RecipeBuilder />
                <SupplementTracker />
                <MicronutrientPanel />
              </div>
            </div>
          )}

          {view === 'workouts' && (
            <div className="space-y-5">
              <DailyCalendar />
              <WorkoutTracker />
            </div>
          )}

          {view === 'calisthenics' && (
            <CalisthenicsWorkout />
          )}

          {view === 'calendar' && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2">
                <MonthlyCalendar />
              </div>
              <div>
                <DailyCalendar />
              </div>
            </div>
          )}

          {view === 'analytics' && (
            <div className="space-y-5">
              <WeeklyAnalytics />
              <WeightTracker />
            </div>
          )}

          {view === 'insights' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <SmartRecommendations />
              <WeeklyInsights />
            </div>
          )}
        </main>
      </div>

      <ChefChat />

    </div>
  );
};

export default Index;
