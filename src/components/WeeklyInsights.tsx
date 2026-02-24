import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { TrendingDown, TrendingUp, Flame, Utensils, Scale, Target, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeeklyInsights() {
  const { profile, dayLogs, workoutLogs } = useAppState();
  const target = calculateTargetNutrients(profile);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return formatDate(d);
  });

  const weeklyConsumed = days.reduce((sum, date) => {
    const entries = dayLogs[date]?.entries || [];
    return sum + sumNutrients(entries).calories;
  }, 0);

  const weeklyBurned = days.reduce((sum, date) => {
    const workouts = workoutLogs[date] || [];
    return sum + workouts.reduce((s, w) => s + w.caloriesBurned, 0);
  }, 0);

  const weeklyTargetTotal = target.calories * 7;
  const netCalories = weeklyConsumed - weeklyBurned;
  const weeklyDeficit = weeklyTargetTotal - netCalories;
  // ~7700 calories = 1 kg of fat
  const estimatedWeightChangeKg = +(weeklyDeficit / 7700).toFixed(2);
  const isDeficit = weeklyDeficit > 0;

  const avgDailyConsumed = Math.round(weeklyConsumed / 7);
  const avgDailyBurned = Math.round(weeklyBurned / 7);
  const avgDailyNet = Math.round(netCalories / 7);

  const daysLogged = days.filter(d => (dayLogs[d]?.entries || []).length > 0).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Scale className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Weekly Insights</h2>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg bg-accent/40 p-3 text-center">
          <Utensils className="h-4 w-4 mx-auto mb-1 text-primary" />
          <p className="text-lg font-bold text-foreground">{weeklyConsumed.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Consumed</p>
        </div>
        <div className="rounded-lg bg-accent/40 p-3 text-center">
          <Flame className="h-4 w-4 mx-auto mb-1 text-destructive" />
          <p className="text-lg font-bold text-foreground">{weeklyBurned.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Burned</p>
        </div>
        <div className="rounded-lg bg-accent/40 p-3 text-center">
          <Target className="h-4 w-4 mx-auto mb-1 text-warning" />
          <p className="text-lg font-bold text-foreground">{netCalories.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground">Net Calories</p>
        </div>
      </div>

      {/* Daily Averages */}
      <div className="rounded-lg border border-border p-3 mb-4">
        <h3 className="text-xs font-medium text-muted-foreground mb-2">Daily Averages</h3>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Avg Consumed</span>
          <span className="font-semibold text-foreground">{avgDailyConsumed} kcal</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-muted-foreground">Avg Burned</span>
          <span className="font-semibold text-foreground">{avgDailyBurned} kcal</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-muted-foreground">Avg Net</span>
          <span className="font-semibold text-foreground">{avgDailyNet} kcal</span>
        </div>
        <div className="flex justify-between text-xs mt-1">
          <span className="text-muted-foreground">Daily Target</span>
          <span className="font-semibold text-foreground">{target.calories} kcal</span>
        </div>
      </div>

      {/* Weight Change Estimate */}
      <div className={`rounded-lg p-4 text-center ${isDeficit ? 'bg-primary/10 border border-primary/20' : 'bg-destructive/10 border border-destructive/20'}`}>
        <div className="flex items-center justify-center gap-1 mb-1">
          {isDeficit ? (
            <TrendingDown className="h-5 w-5 text-primary" />
          ) : estimatedWeightChangeKg === 0 ? (
            <Minus className="h-5 w-5 text-muted-foreground" />
          ) : (
            <TrendingUp className="h-5 w-5 text-destructive" />
          )}
          <span className={`text-2xl font-bold ${isDeficit ? 'text-primary' : estimatedWeightChangeKg === 0 ? 'text-foreground' : 'text-destructive'}`}>
            {isDeficit ? '-' : '+'}{Math.abs(estimatedWeightChangeKg)} kg
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Estimated weight {isDeficit ? 'loss' : estimatedWeightChangeKg === 0 ? 'change' : 'gain'} this week
        </p>
        <p className="text-[10px] text-muted-foreground mt-1">
          Based on {weeklyDeficit > 0 ? weeklyDeficit.toLocaleString() : Math.abs(weeklyDeficit).toLocaleString()} kcal {isDeficit ? 'deficit' : 'surplus'} vs target
        </p>
      </div>

      {/* Insight Message */}
      <div className="mt-3 rounded-lg bg-muted/50 p-3">
        <p className="text-xs text-muted-foreground leading-relaxed">
          {daysLogged === 0 ? (
            "Start logging your meals to see weekly insights!"
          ) : isDeficit && estimatedWeightChangeKg > 0.5 ? (
            `🔥 Great progress! You're on track to lose ~${Math.abs(estimatedWeightChangeKg)} kg this week. Your average daily intake of ${avgDailyConsumed} kcal is ${target.calories - avgDailyNet} kcal below your target after workouts.`
          ) : isDeficit ? (
            `👍 You're in a slight calorie deficit. Net intake is ${avgDailyNet} kcal/day vs your ${target.calories} kcal target. Keep it up!`
          ) : (
            `⚡ You're in a calorie surplus of ${Math.abs(weeklyDeficit).toLocaleString()} kcal this week. Consider increasing activity or reducing intake to stay on track.`
          )}
        </p>
      </div>

      <p className="text-[10px] text-muted-foreground text-center mt-2">{daysLogged}/7 days logged this week</p>
    </motion.div>
  );
}
