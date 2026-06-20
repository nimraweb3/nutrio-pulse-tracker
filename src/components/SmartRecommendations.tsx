import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients, getRecommendations } from '@/utils/nutritionCalculations';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function SmartRecommendations() {
  const { profile, selectedDate, getEntriesForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const entries = getEntriesForDate(dateStr);
  const consumed = sumNutrients(entries);
  const target = calculateTargetNutrients(profile);
  const recs = getRecommendations(consumed, target);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Insights</h2>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">Log a meal to see insights here</p>
      ) : recs.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">Looking good — keep logging</p>
      ) : (
        <div className="space-y-2">
          {recs.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                'rounded-lg px-3 py-2.5 text-xs',
                r.type === 'low' && 'bg-warning/10 text-accent-foreground border border-warning/20',
                r.type === 'high' && 'bg-destructive/10 text-destructive border border-destructive/20',
                r.type === 'good' && 'bg-success/10 text-foreground border border-success/20',
              )}
            >
              <span className="mr-1.5">{r.icon}</span>
              {r.message}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
