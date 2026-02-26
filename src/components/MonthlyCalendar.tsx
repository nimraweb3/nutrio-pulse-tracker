import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients, calculateTargetNutrients } from '@/utils/nutritionCalculations';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function MonthlyCalendar() {
  const { profile, dayLogs, workoutLogs, setSelectedDate } = useAppState();
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startPad = (firstDay.getDay() + 6) % 7; // Monday start
  const totalDays = lastDay.getDate();

  const target = calculateTargetNutrients(profile);

  const days = Array.from({ length: startPad + totalDays }, (_, i) => {
    if (i < startPad) return null;
    return new Date(year, month, i - startPad + 1);
  });

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getCalorieData = (date: Date) => {
    const dateStr = formatDate(date);
    const entries = dayLogs[dateStr]?.entries || [];
    const consumed = entries.length > 0 ? sumNutrients(entries).calories : 0;
    const workouts = workoutLogs[dateStr] || [];
    const burned = workouts.reduce((sum, w) => sum + w.caloriesBurned, 0);
    return { consumed, burned, net: consumed - burned };
  };

  const getHeatColor = (consumed: number) => {
    if (consumed === 0) return '';
    const ratio = consumed / target.calories;
    if (ratio < 0.5) return 'bg-primary/10';
    if (ratio < 0.8) return 'bg-primary/20';
    if (ratio <= 1.1) return 'bg-primary/35';
    if (ratio <= 1.3) return 'bg-warning/25';
    return 'bg-destructive/20';
  };

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const selectedData = selectedDay ? getCalorieData(selectedDay) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonthOffset(m => m - 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            {viewMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
        </div>
        <button onClick={() => setMonthOffset(m => m + 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayNames.map(d => (
          <div key={d} className="text-[10px] text-muted-foreground text-center font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) return <div key={`pad-${i}`} className="aspect-square" />;
          const data = getCalorieData(d);
          const isToday = formatDate(today) === formatDate(d);
          const isSelected = selectedDay && formatDate(selectedDay) === formatDate(d);

          return (
            <button
              key={formatDate(d)}
              onClick={() => {
                setSelectedDay(d);
                setSelectedDate(d);
              }}
              className={cn(
                'aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all relative',
                getHeatColor(data.consumed),
                isToday && 'ring-1 ring-primary',
                isSelected && 'ring-2 ring-primary bg-primary/15',
                'hover:ring-1 hover:ring-primary/50'
              )}
            >
              <span className={cn('font-medium', isToday ? 'text-primary' : 'text-foreground')}>{d.getDate()}</span>
              {data.consumed > 0 && (
                <span className="text-[8px] text-muted-foreground leading-tight">{Math.round(data.consumed)}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selectedDay && selectedData && selectedData.consumed > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-secondary/50 border border-border"
        >
          <p className="text-xs font-semibold text-foreground mb-2">
            {selectedDay.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-lg font-bold text-primary">{Math.round(selectedData.consumed)}</p>
              <p className="text-[10px] text-muted-foreground">Consumed</p>
            </div>
            <div>
              <p className="text-lg font-bold text-destructive">{Math.round(selectedData.burned)}</p>
              <p className="text-[10px] text-muted-foreground">Burned</p>
            </div>
            <div>
              <p className={cn('text-lg font-bold', selectedData.net > target.calories ? 'text-warning' : 'text-primary')}>
                {Math.round(selectedData.net)}
              </p>
              <p className="text-[10px] text-muted-foreground">Net</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
