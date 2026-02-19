import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate } from '@/utils/nutritionCalculations';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function DailyCalendar() {
  const { selectedDate, setSelectedDate, dayLogs } = useAppState();
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7);

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-4 shadow-card"
    >
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setWeekOffset(w => w - 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            {startOfWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </span>
        </div>
        <button onClick={() => setWeekOffset(w => w + 1)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((d, i) => {
          const dateStr = formatDate(d);
          const isToday = formatDate(today) === dateStr;
          const isSelected = formatDate(selectedDate) === dateStr;
          const hasEntries = (dayLogs[dateStr]?.entries?.length || 0) > 0;

          return (
            <motion.button
              key={dateStr}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(d)}
              className={cn(
                'flex flex-col items-center py-2.5 px-1 rounded-xl transition-all duration-200',
                isSelected
                  ? 'gradient-primary text-primary-foreground shadow-md'
                  : 'hover:bg-secondary',
                isToday && !isSelected && 'ring-2 ring-primary/50 bg-primary/5'
              )}
            >
              <span className={cn('text-[10px] font-medium', isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                {dayNames[i]}
              </span>
              <span className={cn('text-lg font-bold', isSelected ? 'text-primary-foreground' : 'text-foreground')}>
                {d.getDate()}
              </span>
              {hasEntries && (
                <div className={cn('w-1.5 h-1.5 rounded-full mt-0.5', isSelected ? 'bg-primary-foreground' : 'bg-primary')} />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
