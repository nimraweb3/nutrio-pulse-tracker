import Header from '@/components/Header';
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
import { useAppState } from '@/context/AppContext';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { dataLoaded } = useAppState();

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 max-w-7xl mx-auto">
        {/* Daily Goal Banner */}
        <div className="mb-5">
          <DailyGoalBanner />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left sidebar */}
          <div className="lg:col-span-3 space-y-5">
            <UserProfileCard />
            <WeightTracker />
            <SupplementTracker />
            <RecipeBuilder />
            <SmartRecommendations />
          </div>

          {/* Center */}
          <div className="lg:col-span-5 space-y-5">
            <DailyCalendar />
            <MealLogger />
            <WorkoutTracker />
            <WeeklyAnalytics />
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <NutritionSummary />
            <WeeklyInsights />
            <MonthlyCalendar />
            <MicronutrientPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
