import { useState } from 'react';
import { useAppState, Recipe } from '@/context/AppContext';
import { foodDatabase, searchFoods } from '@/data/foodDatabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ChefHat, Plus, Trash2, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeBuilder() {
  const { recipes, addRecipe, removeRecipe, addFoodEntry, selectedDate } = useAppState();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [items, setItems] = useState<{ foodId: string; quantity: number; foodName: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchFoods(searchQuery).slice(0, 6);

  const addItem = (foodId: string, foodName: string) => {
    setItems(prev => [...prev, { foodId, quantity: 100, foodName }]);
    setSearchQuery('');
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQty = (index: number, qty: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: qty } : item));
  };

  const handleSave = () => {
    if (!name.trim() || items.length === 0) return;
    addRecipe({
      id: `recipe-${Date.now()}`,
      name: name.trim(),
      items: items.map(({ foodId, quantity }) => ({ foodId, quantity })),
    });
    setName('');
    setItems([]);
    setOpen(false);
  };

  const handleQuickAdd = (recipe: Recipe, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks') => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    recipe.items.forEach(item => {
      const food = foodDatabase.find(f => f.id === item.foodId);
      if (food) {
        addFoodEntry(dateStr, {
          id: `${Date.now()}-${Math.random()}-${item.foodId}`,
          foodItem: food,
          quantity: item.quantity,
          mealType,
        });
      }
    });
  };

  const getRecipeCalories = (recipe: Recipe) => {
    return recipe.items.reduce((total, item) => {
      const food = foodDatabase.find(f => f.id === item.foodId);
      if (!food) return total;
      return total + Math.round(food.nutrients.calories * item.quantity / food.servingSize);
    }, 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ChefHat className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">My Recipes</h2>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Recipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input
                placeholder="Recipe name (e.g., My Lunch Plate)"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search food to add..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {searchQuery && (
                <div className="max-h-32 overflow-y-auto space-y-1 border border-border rounded-lg p-2">
                  {searchResults.map(food => (
                    <button
                      key={food.id}
                      onClick={() => addItem(food.id, food.name)}
                      className="w-full text-left px-2 py-1.5 rounded text-sm hover:bg-secondary transition-colors"
                    >
                      {food.name}
                    </button>
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <div className="space-y-2 border border-border rounded-lg p-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm flex-1 truncate text-foreground">{item.foodName}</span>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={e => updateQty(i, +e.target.value)}
                        className="w-20 h-8"
                      />
                      <span className="text-xs text-muted-foreground">g</span>
                      <button onClick={() => removeItem(i)} className="p-1 hover:bg-destructive/10 rounded">
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={handleSave} className="w-full" disabled={!name.trim() || items.length === 0}>
                Save Recipe
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {recipes.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">Create recipes for quick meal logging</p>
      ) : (
        <div className="space-y-2">
          {recipes.map(recipe => (
            <div key={recipe.id} className="rounded-lg bg-secondary/40 px-3 py-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{recipe.name}</span>
                <span className="text-xs text-muted-foreground">{getRecipeCalories(recipe)} kcal</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['breakfast', 'lunch', 'dinner', 'snacks'] as const).map(meal => (
                  <button
                    key={meal}
                    onClick={() => handleQuickAdd(recipe, meal)}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors capitalize"
                  >
                    + {meal}
                  </button>
                ))}
                <button
                  onClick={() => removeRecipe(recipe.id)}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
