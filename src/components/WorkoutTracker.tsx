import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { formatDate } from '@/utils/nutritionCalculations';
import { exerciseDatabase, searchExercises, calculateCaloriesBurned } from '@/data/exerciseDatabase';
import type { Exercise } from '@/data/exerciseDatabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Trash2, Dumbbell, Flame, Footprints, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors: Record<string, string> = {
  Cardio: 'bg-info/15 text-info',
  Strength: 'bg-destructive/15 text-destructive',
  HIIT: 'bg-warning/15 text-warning',
  Flexibility: 'bg-success/15 text-success',
  Sports: 'bg-primary/15 text-primary',
};

export default function WorkoutTracker() {
  const { profile, selectedDate, getWorkoutsForDate, addWorkoutEntry, removeWorkoutEntry } = useAppState();
  const dateStr = formatDate(selectedDate);
  const workouts = getWorkoutsForDate(dateStr);

  const totalBurned = workouts.reduce((s, w) => s + w.caloriesBurned, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Workout Tracker</h2>
        </div>
        <AddWorkoutDialog dateStr={dateStr} userWeight={profile.weight} onAdd={addWorkoutEntry} />
      </div>

      {/* Summary */}
      <div className="flex items-center gap-4 mb-4 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-destructive" />
          <div>
            <p className="text-lg font-bold text-foreground">{totalBurned}</p>
            <p className="text-[10px] text-muted-foreground">kcal burned</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold text-foreground">{workouts.length}</p>
            <p className="text-[10px] text-muted-foreground">exercises</p>
          </div>
        </div>
      </div>

      {/* Workout entries */}
      <AnimatePresence>
        {workouts.length === 0 ? (
          <p className="text-xs text-muted-foreground italic text-center py-3">No workouts logged. Tap + to add exercises!</p>
        ) : (
          <div className="space-y-1.5">
            {workouts.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="text-lg">{entry.exercise.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{entry.exercise.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {entry.duration} {entry.exercise.unit} · <span className="text-destructive font-medium">-{entry.caloriesBurned} kcal</span>
                    </p>
                  </div>
                </div>
                <button onClick={() => removeWorkoutEntry(dateStr, entry.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors ml-2">
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AddWorkoutDialog({ dateStr, userWeight, onAdd }: {
  dateStr: string;
  userWeight: number;
  onAdd: (date: string, entry: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [duration, setDuration] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const results = activeCategory
    ? exerciseDatabase.filter(e => e.category === activeCategory)
    : searchExercises(query);

  const handleSelect = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setDuration(exercise.defaultDuration);
  };

  const handleAdd = () => {
    if (!selectedExercise || duration <= 0) return;
    const burned = calculateCaloriesBurned(selectedExercise, duration, userWeight);
    onAdd(dateStr, {
      id: `${Date.now()}-${Math.random()}`,
      exercise: selectedExercise,
      duration,
      caloriesBurned: burned,
    });
    setOpen(false);
    setQuery('');
    setSelectedExercise(null);
    setDuration(0);
    setActiveCategory(null);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setSelectedExercise(null); setQuery(''); setActiveCategory(null); } }}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-card/80 px-2.5 py-1.5 rounded-lg border border-border">
          <Plus className="h-3.5 w-3.5" /> Add Exercise
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" /> Add Exercise
          </DialogTitle>
        </DialogHeader>

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {['Cardio', 'Strength', 'HIIT', 'Flexibility', 'Sports'].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setQuery(''); }}
              className={cn(
                'text-xs px-2.5 py-1 rounded-full border transition-colors',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-secondary text-muted-foreground border-border hover:border-primary/50'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveCategory(null); }}
            className="pl-9"
          />
        </div>

        {/* Selected exercise detail */}
        {selectedExercise && (
          <div className="border border-primary/30 rounded-xl p-3 bg-primary/5 space-y-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedExercise.icon}</span>
              <div>
                <p className="text-sm font-semibold text-foreground">{selectedExercise.name}</p>
                <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', categoryColors[selectedExercise.category])}>
                  {selectedExercise.category}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {selectedExercise.unit === 'steps' ? 'Steps:' : selectedExercise.unit === 'reps' ? 'Reps:' : 'Minutes:'}
              </span>
              <Input
                type="number"
                value={duration}
                onChange={e => setDuration(+e.target.value)}
                className="h-8 w-28"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Estimated burn: <span className="text-destructive font-bold text-sm">
                  {calculateCaloriesBurned(selectedExercise, duration, userWeight)} kcal
                </span>
              </p>
              <Button size="sm" onClick={handleAdd} disabled={duration <= 0}>
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Exercise list */}
        <div className="max-h-60 overflow-y-auto space-y-1">
          {results.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => handleSelect(exercise)}
              className={cn(
                'w-full flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors text-left',
                selectedExercise?.id === exercise.id && 'bg-primary/10 border border-primary/20'
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span className="text-lg">{exercise.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-sm font-medium text-foreground truncate">{exercise.name}</p>
                    <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', categoryColors[exercise.category])}>
                      {exercise.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    ~{exercise.caloriesPer30Min} kcal/30min · {exercise.defaultDuration} {exercise.unit}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
