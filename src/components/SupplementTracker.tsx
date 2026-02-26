import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate, sumNutrients } from '@/utils/nutritionCalculations';
import { supplementDatabase, searchSupplements, Supplement } from '@/data/supplementDatabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Plus, Search, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SupplementTracker() {
  const { selectedDate, supplementLogs, addSupplementEntry, removeSupplementEntry, getSupplementsForDate } = useAppState();
  const dateStr = formatDate(selectedDate);
  const todaySupplements = getSupplementsForDate(dateStr);

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const results = query ? searchSupplements(query) : supplementDatabase;

  const handleAdd = (supplement: Supplement) => {
    addSupplementEntry(dateStr, {
      id: `${supplement.id}_${Date.now()}`,
      supplement,
      quantity: 1,
      takenAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    });
    setQuery('');
    setShowSearch(false);
  };

  const categoryColors: Record<string, string> = {
    Multivitamin: 'bg-primary/15 text-primary',
    Vitamin: 'bg-warning/15 text-warning',
    Mineral: 'bg-accent/15 text-accent-foreground',
    Omega: 'bg-primary/15 text-primary',
    Protein: 'bg-destructive/15 text-destructive',
    Fitness: 'bg-secondary text-secondary-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pill className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Supplements</h2>
        </div>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          {showSearch ? <X className="h-4 w-4 text-muted-foreground" /> : <Plus className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>

      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search supplements..."
                className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                autoFocus
              />
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {results.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleAdd(s)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{s.name}</span>
                    <span className={cn('ml-2 text-[10px] px-1.5 py-0.5 rounded-full', categoryColors[s.category] || 'bg-secondary text-secondary-foreground')}>
                      {s.category}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.description}</p>
                  </div>
                  <Plus className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Today's supplements */}
      {todaySupplements.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center py-3">No supplements logged today</p>
      ) : (
        <div className="space-y-1.5">
          {todaySupplements.map(entry => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-2 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <div>
                  <span className="text-xs font-medium text-foreground">{entry.supplement.name}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{entry.takenAt}</span>
                </div>
              </div>
              <button
                onClick={() => removeSupplementEntry(dateStr, entry.id)}
                className="p-1 rounded hover:bg-destructive/10 transition-colors"
              >
                <X className="h-3 w-3 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
