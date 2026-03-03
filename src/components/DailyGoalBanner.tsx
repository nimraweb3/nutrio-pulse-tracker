import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { motion } from 'framer-motion';
import { Trophy, Flame, Calendar, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DailyGoalBanner() {
  const { profile, selectedDate, getEntriesForDate, dayLogs, getWorkoutsForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const entries = getEntriesForDate(dateStr);
  const consumed = sumNutrients(entries);
  const target = calculateTargetNutrients(profile);
  const workouts = getWorkoutsForDate(dateStr);
  const totalBurned = workouts.reduce((s, w) => s + w.caloriesBurned, 0);

  // Calculate streak
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const ds = formatDate(d);
    if (dayLogs[ds]?.entries?.length > 0) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  const calPct = target.calories > 0 ? Math.round((consumed.calories / target.calories) * 100) : 0;
  const proteinPct = target.protein > 0 ? Math.round((consumed.protein / target.protein) * 100) : 0;
  const isOnTrack = calPct >= 50 && calPct <= 120;

  const stats = [
    { icon: Flame, label: 'Calories', value: `${consumed.calories}/${target.calories}`, pct: calPct, color: 'text-warning' },
    { icon: Target, label: 'Protein', value: `${consumed.protein}g/${target.protein}g`, pct: proteinPct, color: 'text-info' },
    { icon: Calendar, label: 'Streak', value: `${streak} day${streak !== 1 ? 's' : ''}`, pct: null, color: 'text-primary' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-xl border p-4 shadow-card',
        isOnTrack 
          ? 'border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10' 
          : 'border-border bg-card'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {streak >= 3 && (
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Trophy className="h-5 w-5 text-warning" />
            </motion.div>
          )}
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {isOnTrack ? "You're on track! 💪" : entries.length === 0 ? "Start logging today's meals" : "Keep going!"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {totalBurned > 0 ? `${totalBurned} kcal burned today · ` : ''}{entries.length} food{entries.length !== 1 ? 's' : ''} logged
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="text-center p-2 rounded-lg bg-card/60 backdrop-blur-sm"
          >
            <s.icon className={cn('h-3.5 w-3.5 mx-auto mb-1', s.color)} />
            <p className="text-xs font-bold text-foreground">{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
