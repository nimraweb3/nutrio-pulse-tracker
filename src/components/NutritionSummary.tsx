import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function NutritionSummary() {
  const { profile, selectedDate, getEntriesForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const entries = getEntriesForDate(dateStr);
  const consumed = sumNutrients(entries);
  const target = calculateTargetNutrients(profile);

  const macros = [
    { name: 'Protein', consumed: consumed.protein, target: target.protein, unit: 'g', color: 'bg-info' },
    { name: 'Carbs', consumed: consumed.carbs, target: target.carbs, unit: 'g', color: 'bg-warning' },
    { name: 'Fats', consumed: consumed.fats, target: target.fats, unit: 'g', color: 'bg-destructive' },
    { name: 'Fiber', consumed: consumed.fiber, target: target.fiber, unit: 'g', color: 'bg-success' },
  ];

  const pieData = [
    { name: 'Protein', value: consumed.protein * 4, color: 'hsl(200, 80%, 50%)' },
    { name: 'Carbs', value: consumed.carbs * 4, color: 'hsl(36, 95%, 55%)' },
    { name: 'Fats', value: consumed.fats * 9, color: 'hsl(340, 65%, 55%)' },
  ];

  const totalMacroCal = pieData.reduce((s, p) => s + p.value, 0);
  const calPct = Math.min((consumed.calories / target.calories) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Flame className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Daily Summary</h2>
      </div>

      {/* Calorie ring */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-28 h-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={totalMacroCal > 0 ? pieData : [{ name: 'Empty', value: 1, color: 'hsl(150, 10%, 90%)' }]}
                cx="50%" cy="50%" innerRadius={32} outerRadius={48} dataKey="value" strokeWidth={0}
              >
                {(totalMacroCal > 0 ? pieData : [{ color: 'hsl(150, 10%, 90%)' }]).map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-foreground">{consumed.calories}</span>
            <span className="text-[10px] text-muted-foreground">/ {target.calories}</span>
          </div>
        </div>
        <div className="flex-1 space-y-1.5">
          {pieData.map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-xs text-muted-foreground flex-1">{p.name}</span>
              <span className="text-xs font-semibold text-foreground">{totalMacroCal > 0 ? Math.round(p.value / totalMacroCal * 100) : 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overall calorie progress */}
      <div className="mb-5">
        <div className="flex justify-between mb-1.5">
          <span className="text-xs font-medium text-foreground">Calorie Progress</span>
          <span className="text-xs text-muted-foreground">{Math.round(calPct)}%</span>
        </div>
        <div className="h-3 rounded-full bg-secondary overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${calPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={cn('h-full rounded-full', calPct > 100 ? 'bg-destructive' : 'gradient-primary')}
          />
        </div>
      </div>

      {/* Macro bars */}
      <div className="space-y-3">
        {macros.map((m, i) => {
          const pct = m.target > 0 ? Math.min((m.consumed / m.target) * 100, 100) : 0;
          return (
            <div key={m.name}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{m.name}</span>
                <span className="text-xs text-muted-foreground">{m.consumed}{m.unit} / {m.target}{m.unit}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
                  className={cn('h-full rounded-full transition-all', m.color)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
