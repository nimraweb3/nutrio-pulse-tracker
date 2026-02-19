import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { motion } from 'framer-motion';
import { Pill } from 'lucide-react';

const micronutrients = [
  { key: 'vitaminA', label: 'Vitamin A', unit: 'mcg' },
  { key: 'vitaminC', label: 'Vitamin C', unit: 'mg' },
  { key: 'vitaminD', label: 'Vitamin D', unit: 'mcg' },
  { key: 'vitaminE', label: 'Vitamin E', unit: 'mg' },
  { key: 'vitaminK', label: 'Vitamin K', unit: 'mcg' },
  { key: 'vitaminB6', label: 'Vitamin B6', unit: 'mg' },
  { key: 'vitaminB12', label: 'Vitamin B12', unit: 'mcg' },
  { key: 'calcium', label: 'Calcium', unit: 'mg' },
  { key: 'iron', label: 'Iron', unit: 'mg' },
  { key: 'magnesium', label: 'Magnesium', unit: 'mg' },
  { key: 'zinc', label: 'Zinc', unit: 'mg' },
  { key: 'potassium', label: 'Potassium', unit: 'mg' },
  { key: 'sodium', label: 'Sodium', unit: 'mg' },
  { key: 'omega3', label: 'Omega-3', unit: 'g' },
  { key: 'omega6', label: 'Omega-6', unit: 'g' },
  { key: 'cholesterol', label: 'Cholesterol', unit: 'mg' },
] as const;

export default function MicronutrientPanel() {
  const { profile, selectedDate, getEntriesForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const consumed = sumNutrients(getEntriesForDate(dateStr));
  const target = calculateTargetNutrients(profile);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Pill className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Micronutrients</h2>
      </div>
      <div className="space-y-2">
        {micronutrients.map((mn, i) => {
          const c = consumed[mn.key] as number;
          const t = target[mn.key] as number;
          const pct = t > 0 ? Math.min((c / t) * 100, 100) : 0;
          const isLow = pct < 50;
          const isHigh = c > t * 1.15;
          return (
            <div key={mn.key} className="flex items-center gap-3">
              <span className="text-xs text-foreground w-20 truncate">{mn.label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, delay: i * 0.03 }}
                  className={`h-full rounded-full ${isHigh ? 'bg-destructive' : isLow ? 'bg-warning' : 'bg-primary'}`}
                />
              </div>
              <span className="text-[10px] text-muted-foreground w-24 text-right">
                {c}{mn.unit} / {t}{mn.unit}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
