import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate } from '@/utils/nutritionCalculations';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Scale, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WeightTracker() {
  const { weightLog, logWeight, profile } = useAppState();
  const [weightInput, setWeightInput] = useState('');
  const todayStr = formatDate(new Date());

  const handleLog = () => {
    const w = parseFloat(weightInput);
    if (w > 0) {
      logWeight(todayStr, w);
      setWeightInput('');
    }
  };

  const sortedEntries = Object.entries(weightLog)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, weight]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      weight,
    }));

  const latest = sortedEntries[sortedEntries.length - 1]?.weight;
  const first = sortedEntries[0]?.weight;
  const change = latest && first ? +(latest - first).toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <Scale className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Weight Tracker</h2>
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          type="number"
          placeholder="Today's weight (kg)"
          value={weightInput}
          onChange={e => setWeightInput(e.target.value)}
          className="h-9"
          onKeyDown={e => e.key === 'Enter' && handleLog()}
        />
        <Button onClick={handleLog} size="sm" disabled={!weightInput}>
          Log
        </Button>
      </div>

      {sortedEntries.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-bold text-foreground">{latest}</span>
              <span className="text-xs text-muted-foreground">kg</span>
            </div>
            {change !== 0 && (
              <div className={`flex items-center gap-1 text-xs font-medium ${change < 0 ? 'text-success' : 'text-destructive'}`}>
                {change < 0 ? <TrendingDown className="h-3.5 w-3.5" /> : change > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                {change > 0 ? '+' : ''}{change} kg
              </div>
            )}
          </div>

          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sortedEntries}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} width={35} />
                <Tooltip
                  contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--primary))' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {sortedEntries.length === 0 && (
        <p className="text-xs text-muted-foreground italic">Log your weight daily to see trends</p>
      )}
    </motion.div>
  );
}
