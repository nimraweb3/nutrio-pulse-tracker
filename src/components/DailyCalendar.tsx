import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate } from '@/utils/nutritionCalculations';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="rounded-lg border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setWeekOffset(w => w - 1)} className="p-1 rounded hover:bg-secondary">
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
        <span className="text-sm font-medium text-foreground">
          {startOfWeek.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </span>
        <button onClick={() => setWeekOffset(w => w + 1)} className="p-1 rounded hover:bg-secondary">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const dateStr = formatDate(d);
          const isToday = formatDate(today) === dateStr;
          const isSelected = formatDate(selectedDate) === dateStr;
          const hasEntries = (dayLogs[dateStr]?.entries?.length || 0) > 0;

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(d)}
              className={cn(
                'flex flex-col items-center p-2 rounded-lg transition-all',
                isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary',
                isToday && !isSelected && 'ring-1 ring-primary'
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
            </button>
          );
        })}
      </div>
    </div>
  );
}
