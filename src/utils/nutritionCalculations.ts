import { UserProfile, NutrientValues, FoodEntry, Recommendation } from '@/types/nutrition';

export function calculateBMR(profile: UserProfile): number {
  // Mifflin-St Jeor
  if (profile.gender === 'male') {
    return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
  }
  return 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
}

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateTDEE(profile: UserProfile): number {
  return Math.round(calculateBMR(profile) * activityMultipliers[profile.activityLevel]);
}

export function calculateTargetCalories(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  switch (profile.goalType) {
    case 'fat_loss': return Math.round(tdee * 0.8);
    case 'muscle_gain': return Math.round(tdee * 1.1);
    default: return tdee;
  }
}

export function calculateTargetNutrients(profile: UserProfile): NutrientValues {
  const cal = calculateTargetCalories(profile);
  const proteinG = profile.goalType === 'muscle_gain' ? profile.weight * 2.2 : profile.weight * 1.8;
  const fatG = (cal * 0.25) / 9;
  const carbG = (cal - proteinG * 4 - fatG * 9) / 4;

  return {
    calories: cal,
    protein: Math.round(proteinG),
    carbs: Math.round(carbG),
    fats: Math.round(fatG),
    fiber: profile.gender === 'male' ? 38 : 25,
    sugar: 36,
    vitaminA: 900,
    vitaminC: 90,
    vitaminD: 15,
    vitaminE: 15,
    vitaminK: profile.gender === 'male' ? 120 : 90,
    vitaminB6: 1.3,
    vitaminB12: 2.4,
    calcium: 1000,
    iron: profile.gender === 'male' ? 8 : 18,
    magnesium: profile.gender === 'male' ? 420 : 320,
    zinc: profile.gender === 'male' ? 11 : 8,
    potassium: 2600,
    sodium: 2300,
    cholesterol: 300,
    omega3: 1.6,
    omega6: 17,
  };
}

export function calculateEntryNutrients(entry: FoodEntry): NutrientValues {
  const ratio = entry.quantity / entry.foodItem.servingSize;
  const n = entry.foodItem.nutrients;
  return {
    calories: Math.round(n.calories * ratio),
    protein: +(n.protein * ratio).toFixed(1),
    carbs: +(n.carbs * ratio).toFixed(1),
    fats: +(n.fats * ratio).toFixed(1),
    fiber: +(n.fiber * ratio).toFixed(1),
    sugar: +(n.sugar * ratio).toFixed(1),
    vitaminA: +(n.vitaminA * ratio).toFixed(1),
    vitaminC: +(n.vitaminC * ratio).toFixed(1),
    vitaminD: +(n.vitaminD * ratio).toFixed(2),
    vitaminE: +(n.vitaminE * ratio).toFixed(1),
    vitaminK: +(n.vitaminK * ratio).toFixed(1),
    vitaminB6: +(n.vitaminB6 * ratio).toFixed(2),
    vitaminB12: +(n.vitaminB12 * ratio).toFixed(2),
    calcium: Math.round(n.calcium * ratio),
    iron: +(n.iron * ratio).toFixed(1),
    magnesium: Math.round(n.magnesium * ratio),
    zinc: +(n.zinc * ratio).toFixed(1),
    potassium: Math.round(n.potassium * ratio),
    sodium: Math.round(n.sodium * ratio),
    cholesterol: Math.round(n.cholesterol * ratio),
    omega3: +(n.omega3 * ratio).toFixed(2),
    omega6: +(n.omega6 * ratio).toFixed(2),
  };
}

export function sumNutrients(entries: FoodEntry[]): NutrientValues {
  const zero: NutrientValues = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB6: 0, vitaminB12: 0, calcium: 0, iron: 0, magnesium: 0, zinc: 0, potassium: 0, sodium: 0, cholesterol: 0, omega3: 0, omega6: 0 };
  return entries.reduce((acc, e) => {
    const n = calculateEntryNutrients(e);
    const keys = Object.keys(acc) as (keyof NutrientValues)[];
    keys.forEach(k => { (acc as any)[k] = +((acc[k] as number) + (n[k] as number)).toFixed(2); });
    return acc;
  }, zero);
}

export function getRecommendations(consumed: NutrientValues, target: NutrientValues): Recommendation[] {
  const recs: Recommendation[] = [];
  const check = (key: keyof NutrientValues, label: string, unit: string) => {
    const pct = (consumed[key] as number) / (target[key] as number);
    if (pct < 0.6) {
      recs.push({ type: 'low', nutrient: label, message: `Your ${label} intake is low. Try to add ${Math.round((target[key] as number) - (consumed[key] as number))}${unit} more.`, icon: '⚠️' });
    } else if (pct > 1.15) {
      recs.push({ type: 'high', nutrient: label, message: `You exceeded your ${label} target by ${Math.round((consumed[key] as number) - (target[key] as number))}${unit}.`, icon: '🔴' });
    } else if (pct >= 0.9 && pct <= 1.1) {
      recs.push({ type: 'good', nutrient: label, message: `Great job! Your ${label} intake is on track.`, icon: '✅' });
    }
  };

  check('protein', 'Protein', 'g');
  check('calories', 'Calories', ' kcal');
  check('fiber', 'Fiber', 'g');
  check('sugar', 'Sugar', 'g');
  check('omega3', 'Omega-3', 'g');
  check('vitaminC', 'Vitamin C', 'mg');
  check('vitaminD', 'Vitamin D', 'mcg');
  check('calcium', 'Calcium', 'mg');
  check('iron', 'Iron', 'mg');

  return recs;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const waterIntake = (weight: number) => Math.round(weight * 0.033 * 10) / 10; // liters
