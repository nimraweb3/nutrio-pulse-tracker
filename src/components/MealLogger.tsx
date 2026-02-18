import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { MealType, FoodEntry } from '@/types/nutrition';
import { formatDate, calculateEntryNutrients } from '@/utils/nutritionCalculations';
import { searchFoods } from '@/data/foodDatabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Trash2, Coffee, Sun, Moon, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

const mealConfig: { type: MealType; label: string; icon: typeof Coffee }[] = [
  { type: 'breakfast', label: 'Breakfast', icon: Coffee },
  { type: 'lunch', label: 'Lunch', icon: Sun },
  { type: 'dinner', label: 'Dinner', icon: Moon },
  { type: 'snacks', label: 'Snacks', icon: Cookie },
];

export default function MealLogger() {
  const { selectedDate, getEntriesForMeal, addFoodEntry, removeFoodEntry } = useAppState();
  const dateStr = formatDate(selectedDate);

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Meals — {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </h2>
      {mealConfig.map(meal => (
        <MealSection key={meal.type} meal={meal} entries={getEntriesForMeal(dateStr, meal.type)} dateStr={dateStr} />
      ))}
    </div>
  );
}

function MealSection({ meal, entries, dateStr }: {
  meal: typeof mealConfig[0]; entries: FoodEntry[]; dateStr: string;
}) {
  const { addFoodEntry, removeFoodEntry } = useAppState();
  const totalCal = entries.reduce((s, e) => s + calculateEntryNutrients(e).calories, 0);

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <meal.icon className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm text-foreground">{meal.label}</span>
          {entries.length > 0 && (
            <span className="text-xs text-muted-foreground">{totalCal} kcal</span>
          )}
        </div>
        <AddFoodDialog mealType={meal.type} dateStr={dateStr} onAdd={addFoodEntry} />
      </div>
      {entries.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">No foods logged yet</p>
      ) : (
        <div className="space-y-2">
          {entries.map(entry => {
            const n = calculateEntryNutrients(entry);
            return (
              <div key={entry.id} className="flex items-center justify-between rounded-md bg-secondary/40 px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">{entry.foodItem.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.quantity}g · {n.calories} kcal · P:{n.protein}g · C:{n.carbs}g · F:{n.fats}g
                  </p>
                </div>
                <button onClick={() => removeFoodEntry(dateStr, entry.id)} className="p-1 rounded hover:bg-destructive/10">
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AddFoodDialog({ mealType, dateStr, onAdd }: {
  mealType: MealType; dateStr: string; onAdd: (date: string, entry: FoodEntry) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(100);
  const results = searchFoods(query);

  const handleAdd = (food: typeof results[0]) => {
    onAdd(dateStr, {
      id: `${Date.now()}-${Math.random()}`,
      foodItem: food,
      quantity,
      mealType,
    });
    setOpen(false);
    setQuery('');
    setQuantity(100);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search foods..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="pl-9"
              autoFocus
            />
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs text-muted-foreground whitespace-nowrap">Quantity (g):</Label>
            <Input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} className="h-8 w-24" />
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1">
            {results.map(food => (
              <button
                key={food.id}
                onClick={() => handleAdd(food)}
                className="w-full flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-secondary transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{food.name}</p>
                  <p className="text-xs text-muted-foreground">{food.category} · {food.servingSize}{food.servingUnit} serving</p>
                </div>
                <span className="text-xs font-medium text-primary">{Math.round(food.nutrients.calories * quantity / food.servingSize)} kcal</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
