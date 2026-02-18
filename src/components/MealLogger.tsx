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
import { Plus, Search, Trash2, Coffee, Sun, Moon, Cookie, PenLine } from 'lucide-react';
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

/** Parse free-text like "100g rice, 2 roti, 150g biryani" into food entries */
function parseTextInput(text: string): { name: string; quantity: number }[] {
  const lines = text.split(/[,\n]+/).map(s => s.trim()).filter(Boolean);
  const results: { name: string; quantity: number }[] = [];
  
  for (const line of lines) {
    // Match patterns: "100g rice", "100 g rice", "rice 100g", "2 roti", "rice"
    const matchQtyFirst = line.match(/^(\d+)\s*g?\s+(.+)$/i);
    const matchQtyLast = line.match(/^(.+?)\s+(\d+)\s*g?$/i);
    
    if (matchQtyFirst) {
      results.push({ quantity: parseInt(matchQtyFirst[1]), name: matchQtyFirst[2].trim() });
    } else if (matchQtyLast) {
      results.push({ quantity: parseInt(matchQtyLast[2]), name: matchQtyLast[1].trim() });
    } else {
      // No quantity specified, default to 100g
      results.push({ quantity: 100, name: line.trim() });
    }
  }
  return results;
}

/** Find best matching food from database */
function findBestMatch(query: string) {
  const q = query.toLowerCase();
  // Try exact-ish match first
  let match = foodDatabase.find(f => f.name.toLowerCase().includes(q));
  if (!match) {
    // Try matching each word
    const words = q.split(/\s+/);
    match = foodDatabase.find(f => words.some(w => w.length > 2 && f.name.toLowerCase().includes(w)));
  }
  return match;
}

function AddFoodDialog({ mealType, dateStr, onAdd }: {
  mealType: MealType; dateStr: string; onAdd: (date: string, entry: FoodEntry) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [freeText, setFreeText] = useState('');
  const [parsedItems, setParsedItems] = useState<{ name: string; quantity: number; matched?: typeof foodDatabase[0]; }[]>([]);
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
    const withMatches = items.map(item => ({
      ...item,
      matched: findBestMatch(item.name),
    }));
    setParsedItems(withMatches);
  };

  const handleAddAllParsed = () => {
    const matched = parsedItems.filter(p => p.matched);
    matched.forEach(item => {
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
        <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Add
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="write" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="write" className="flex items-center gap-1.5">
              <PenLine className="h-3.5 w-3.5" /> Write What You Ate
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-1.5">
              <Search className="h-3.5 w-3.5" /> Search Foods
            </TabsTrigger>
          </TabsList>

          {/* Write Tab */}
          <TabsContent value="write" className="space-y-3 mt-3">
            <p className="text-xs text-muted-foreground">
              Type what you ate. Example: <span className="text-foreground font-medium">100g biryani, 2 roti, 150g keema</span>
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
              <div className="space-y-2 border border-border rounded-lg p-3 bg-secondary/20">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Results</p>
                {parsedItems.map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center justify-between rounded-md px-3 py-2 text-sm",
                    item.matched ? "bg-card" : "bg-destructive/10"
                  )}>
                    <div>
                      <p className="font-medium text-foreground">
                        {item.quantity}g {item.name}
                      </p>
                      {item.matched ? (
                        <p className="text-xs text-muted-foreground">
                          Matched: {item.matched.name} → {Math.round(item.matched.nutrients.calories * item.quantity / item.matched.servingSize)} kcal · 
                          P:{(item.matched.nutrients.protein * item.quantity / item.matched.servingSize).toFixed(1)}g · 
                          C:{(item.matched.nutrients.carbs * item.quantity / item.matched.servingSize).toFixed(1)}g · 
                          F:{(item.matched.nutrients.fats * item.quantity / item.matched.servingSize).toFixed(1)}g
                        </p>
                      ) : (
                        <p className="text-xs text-destructive">Not found in database</p>
                      )}
                    </div>
                    {item.matched && (
                      <button onClick={() => handleAdd(item.matched!, item.quantity)} className="text-xs text-primary font-medium hover:underline whitespace-nowrap ml-2">
                        Add
                      </button>
                    )}
                  </div>
                ))}
                {parsedItems.some(p => p.matched) && (
                  <Button onClick={handleAddAllParsed} size="sm" className="w-full mt-2">
                    Add All Matched ({parsedItems.filter(p => p.matched).length} items)
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Search Tab */}
          <TabsContent value="search" className="space-y-4 mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search foods..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Quantity (g):</span>
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
