import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeeklyAnalytics() {
  const { profile, dayLogs } = useAppState();
  const target = calculateTargetNutrients(profile);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - 6 + i);
    return d;
  });

  const data = days.map(d => {
    const dateStr = formatDate(d);
    const entries = dayLogs[dateStr]?.entries || [];
    const n = sumNutrients(entries);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      Calories: n.calories,
      Protein: n.protein,
      Carbs: n.carbs,
      Fats: n.fats,
    };
  });

  const avgCalories = Math.round(data.reduce((s, d) => s + d.Calories, 0) / 7);
  const avgProtein = Math.round(data.reduce((s, d) => s + d.Protein, 0) / 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Weekly Analytics</h2>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span>Avg: <strong className="text-foreground">{avgCalories}</strong> kcal</span>
          <span>Avg P: <strong className="text-foreground">{avgProtein}g</strong></span>
        </div>
      </div>

      {/* Calorie Bar Chart */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={40} />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Calories" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Macro Stacked */}
      <h3 className="text-xs font-medium text-muted-foreground mb-2">Macros Breakdown (g)</h3>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={35} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="Protein" fill="hsl(var(--info))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Carbs" fill="hsl(var(--warning))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Fats" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Target line indicator */}
      <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-primary/30" />
        <span>Target: {target.calories} kcal/day</span>
        <div className="h-px flex-1 bg-primary/30" />
      </div>
    </motion.div>
  );
}
