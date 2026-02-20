import { useState } from 'react';
import { useAppState } from '@/context/AppContext';
import { MealType, FoodEntry } from '@/types/nutrition';
import { formatDate, calculateEntryNutrients } from '@/utils/nutritionCalculations';
import { searchFoods, foodDatabase } from '@/data/foodDatabase';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Trash2, Coffee, Sun, Moon, Cookie, PenLine, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const mealConfig: { type: MealType; label: string; icon: typeof Coffee; gradient: string }[] = [
  { type: 'breakfast', label: 'Breakfast', icon: Coffee, gradient: 'from-amber-500/10 to-orange-500/5' },
  { type: 'lunch', label: 'Lunch', icon: Sun, gradient: 'from-primary/10 to-emerald-500/5' },
  { type: 'dinner', label: 'Dinner', icon: Moon, gradient: 'from-indigo-500/10 to-purple-500/5' },
  { type: 'snacks', label: 'Snacks', icon: Cookie, gradient: 'from-pink-500/10 to-rose-500/5' },
];

export default function MealLogger() {
  const { selectedDate, getEntriesForMeal, addFoodEntry, removeFoodEntry } = useAppState();
  const dateStr = formatDate(selectedDate);

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Meals — {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
      </h2>
      {mealConfig.map((meal, index) => (
        <motion.div
          key={meal.type}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <MealSection meal={meal} entries={getEntriesForMeal(dateStr, meal.type)} dateStr={dateStr} />
        </motion.div>
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
    <div className={cn('rounded-xl border border-border bg-gradient-to-br p-4 shadow-card', meal.gradient)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-card/80">
            <meal.icon className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground">{meal.label}</span>
          {entries.length > 0 && (
            <span className="text-xs text-muted-foreground bg-card/60 px-2 py-0.5 rounded-full">{totalCal} kcal</span>
          )}
        </div>
        <AddFoodDialog mealType={meal.type} dateStr={dateStr} onAdd={addFoodEntry} />
      </div>
      <AnimatePresence>
        {entries.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Tap + to log what you ate</p>
        ) : (
          <div className="space-y-1.5">
            {entries.map(entry => {
              const n = calculateEntryNutrients(entry);
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center justify-between rounded-lg bg-card/80 backdrop-blur-sm px-3 py-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">{entry.foodItem.name}</p>
                    <p className="text-[11px] text-muted-foreground">
                      {entry.quantity}g · <span className="text-info">{n.calories} kcal</span> · P:{n.protein}g · C:{n.carbs}g · F:{n.fats}g
                    </p>
                  </div>
                  <button onClick={() => removeFoodEntry(dateStr, entry.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors ml-2">
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function parseTextInput(text: string): { name: string; quantity: number }[] {
  const lines = text.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
  const results: { name: string; quantity: number }[] = [];
  for (const line of lines) {
    const matchQtyFirst = line.match(/^(\d+)\s*g?\s+(.+)$/i);
    const matchQtyLast = line.match(/^(.+?)\s+(\d+)\s*g?$/i);
    if (matchQtyFirst) {
      results.push({ quantity: parseInt(matchQtyFirst[1]), name: matchQtyFirst[2].trim() });
    } else if (matchQtyLast) {
      results.push({ quantity: parseInt(matchQtyLast[2]), name: matchQtyLast[1].trim() });
    } else {
      results.push({ quantity: 100, name: line.trim() });
    }
  }
  return results;
}

function findBestMatch(query: string) {
  const q = query.toLowerCase();
  let match = foodDatabase.find(f => f.name.toLowerCase().includes(q));
  if (!match) {
    const words = q.split(/\s+/);
    match = foodDatabase.find(f => words.some(w => w.length > 2 && f.name.toLowerCase().includes(w)));
  }
  return match;
}

function AddFoodDialog({ mealType, dateStr, onAdd }: {
  mealType: MealType; dateStr: string; onAdd: (date: string, entry: FoodEntry) => void;
}) {
  const { recentFoods } = useAppState();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [freeText, setFreeText] = useState('');
  const [parsedItems, setParsedItems] = useState<{ name: string; quantity: number; matched?: typeof foodDatabase[0] }[]>([]);
  const results = searchFoods(query);

  const handleAdd = (food: typeof results[0], qty?: number) => {
    onAdd(dateStr, {
      id: `${Date.now()}-${Math.random()}`,
      foodItem: food,
      quantity: qty ?? quantity,
      mealType,
    });
    setOpen(false);
    setQuery('');
    setQuantity(100);
    setFreeText('');
    setParsedItems([]);
  };

  const handleParseText = () => {
    const items = parseTextInput(freeText);
    setParsedItems(items.map(item => ({ ...item, matched: findBestMatch(item.name) })));
  };

  const handleAddAllParsed = () => {
    parsedItems.filter(p => p.matched).forEach(item => {
      onAdd(dateStr, {
        id: `${Date.now()}-${Math.random()}-${item.name}`,
        foodItem: item.matched!,
        quantity: item.quantity,
        mealType,
      });
    });
    setOpen(false);
    setFreeText('');
    setParsedItems([]);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setParsedItems([]); setFreeText(''); setQuery(''); } }}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors bg-card/80 px-2.5 py-1.5 rounded-lg">
          <Plus className="h-3.5 w-3.5" /> Add Food
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">Add Food <span className="text-xs font-normal text-muted-foreground capitalize">to {mealType}</span></DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="write" className="flex items-center gap-1 text-xs">
              <PenLine className="h-3 w-3" /> Write
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-1 text-xs">
              <Search className="h-3 w-3" /> Search
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3" /> Recent
            </TabsTrigger>
          </TabsList>

          {/* Write Tab */}
          <TabsContent value="write" className="space-y-3 mt-3">
            <p className="text-xs text-muted-foreground">
              Type what you ate: <span className="text-foreground font-medium">100g biryani, 2 roti, 150g keema</span>
            </p>
            <Textarea
              placeholder={"100g chicken biryani\n2 roti\n150g shami kebab\n1 chai"}
              value={freeText}
              onChange={e => setFreeText(e.target.value)}
              className="min-h-[100px] text-sm"
            />
            <Button onClick={handleParseText} disabled={!freeText.trim()} className="w-full" size="sm">
              Calculate Nutrition
            </Button>

            {parsedItems.length > 0 && (
              <div className="space-y-2 border border-border rounded-xl p-3 bg-secondary/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Results</p>
                {parsedItems.map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
                    item.matched ? "bg-card" : "bg-destructive/10"
                  )}>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">{item.quantity}g {item.name}</p>
                      {item.matched ? (
                        <p className="text-xs text-muted-foreground">
                          → {item.matched.name}: {Math.round(item.matched.nutrients.calories * item.quantity / item.matched.servingSize)} kcal ·
                          P:{(item.matched.nutrients.protein * item.quantity / item.matched.servingSize).toFixed(1)}g ·
                          C:{(item.matched.nutrients.carbs * item.quantity / item.matched.servingSize).toFixed(1)}g ·
                          F:{(item.matched.nutrients.fats * item.quantity / item.matched.servingSize).toFixed(1)}g
                        </p>
                      ) : (
                        <p className="text-xs text-destructive">Not found in database</p>
                      )}
                    </div>
                    {item.matched && (
                      <button onClick={() => handleAdd(item.matched!, item.quantity)} className="text-xs text-primary font-medium hover:underline ml-2">Add</button>
                    )}
                  </div>
                ))}
                {parsedItems.some(p => p.matched) && (
                  <Button onClick={handleAddAllParsed} size="sm" className="w-full mt-1">
                    Add All ({parsedItems.filter(p => p.matched).length} items)
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-3 mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Pakistani foods..." value={query} onChange={e => setQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Qty (g):</span>
              <Input type="number" value={quantity} onChange={e => setQuantity(+e.target.value)} className="h-8 w-24" />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {results.slice(0, 30).map(food => (
                <button
                  key={food.id}
                  onClick={() => handleAdd(food)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="text-sm font-medium text-foreground truncate">{food.name}</p>
                      <span className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                        food.category === 'Protein' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                        food.category === 'Carbohydrates' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' :
                        food.category === 'Fats' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400' :
                        food.category === 'Fiber & Vitamins' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                        food.category === 'Sugar' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {food.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      P:{(food.nutrients.protein * quantity / food.servingSize).toFixed(1)}g · C:{(food.nutrients.carbs * quantity / food.servingSize).toFixed(1)}g · F:{(food.nutrients.fats * quantity / food.servingSize).toFixed(1)}g
                    </p>
                  </div>
                  <span className="text-xs font-medium text-primary ml-2 shrink-0">{Math.round(food.nutrients.calories * quantity / food.servingSize)} kcal</span>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent value="recent" className="space-y-3 mt-3">
            {recentFoods.length === 0 ? (
              <p className="text-xs text-muted-foreground italic py-4 text-center">No recent foods yet. Start logging!</p>
            ) : (
              <div className="space-y-1">
                {recentFoods.map((entry, i) => (
                  <button
                    key={`${entry.foodItem.id}-${i}`}
                    onClick={() => handleAdd(entry.foodItem, entry.quantity)}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary transition-colors text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{entry.foodItem.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.quantity}g · {entry.mealType}</p>
                    </div>
                    <span className="text-xs font-medium text-primary ml-2">
                      {Math.round(entry.foodItem.nutrients.calories * entry.quantity / entry.foodItem.servingSize)} kcal
                    </span>
                  </button>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
