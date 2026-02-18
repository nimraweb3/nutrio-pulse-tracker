import Header from '@/components/Header';
import UserProfileCard from '@/components/UserProfileCard';
import DailyCalendar from '@/components/DailyCalendar';
import MealLogger from '@/components/MealLogger';
import NutritionSummary from '@/components/NutritionSummary';
import MicronutrientPanel from '@/components/MicronutrientPanel';
import SmartRecommendations from '@/components/SmartRecommendations';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <UserProfileCard />
            <SmartRecommendations />
          </div>

          {/* Center */}
          <div className="lg:col-span-5 space-y-6">
            <DailyCalendar />
            <MealLogger />
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <NutritionSummary />
            <MicronutrientPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
