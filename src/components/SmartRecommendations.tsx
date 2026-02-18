import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients, getRecommendations } from '@/utils/nutritionCalculations';
import { cn } from '@/lib/utils';

export default function SmartRecommendations() {
  const { profile, selectedDate, getEntriesForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const entries = getEntriesForDate(dateStr);
  const consumed = sumNutrients(entries);
  const target = calculateTargetNutrients(profile);
  const recs = getRecommendations(consumed, target);

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Insights</h2>
        <p className="text-xs text-muted-foreground italic">Start logging meals to get personalized recommendations.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-card">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Insights</h2>
      <div className="space-y-2">
        {recs.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Keep logging to get more insights.</p>
        )}
        {recs.map((r, i) => (
          <div
            key={i}
            className={cn(
              'rounded-md px-3 py-2.5 text-xs',
              r.type === 'low' && 'bg-warning/10 text-accent-foreground',
              r.type === 'high' && 'bg-destructive/10 text-destructive',
              r.type === 'good' && 'bg-success/10 text-foreground',
            )}
          >
            <span className="mr-1.5">{r.icon}</span>
            {r.message}
          </div>
        ))}
      </div>
    </div>
  );
}
