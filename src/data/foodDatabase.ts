import { FoodItem } from '@/types/nutrition';

export const foodDatabase: FoodItem[] = [
  {
    id: '1', name: 'Chicken Breast (Grilled)', category: 'Protein',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, sugar: 0, vitaminA: 6, vitaminC: 0, vitaminD: 0.4, vitaminE: 0.3, vitaminK: 0, vitaminB6: 0.6, vitaminB12: 0.3, calcium: 15, iron: 1, magnesium: 29, zinc: 1, potassium: 256, sodium: 74, cholesterol: 85, omega3: 0.05, omega6: 0.6 }
  },
  {
    id: '2', name: 'Brown Rice (Cooked)', category: 'Grains',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 123, protein: 2.7, carbs: 25.6, fats: 1, fiber: 1.6, sugar: 0.4, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.6, vitaminB6: 0.1, vitaminB12: 0, calcium: 3, iron: 0.6, magnesium: 39, zinc: 0.6, potassium: 86, sodium: 4, cholesterol: 0, omega3: 0.01, omega6: 0.4 }
  },
  {
    id: '3', name: 'Egg (Whole, Boiled)', category: 'Protein',
    servingSize: 50, servingUnit: 'g',
    nutrients: { calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3, fiber: 0, sugar: 0.6, vitaminA: 80, vitaminC: 0, vitaminD: 1.1, vitaminE: 0.5, vitaminK: 0.2, vitaminB6: 0.1, vitaminB12: 0.6, calcium: 25, iron: 0.9, magnesium: 5, zinc: 0.5, potassium: 63, sodium: 62, cholesterol: 186, omega3: 0.04, omega6: 0.6 }
  },
  {
    id: '4', name: 'Banana', category: 'Fruits',
    servingSize: 118, servingUnit: 'g',
    nutrients: { calories: 105, protein: 1.3, carbs: 27, fats: 0.4, fiber: 3.1, sugar: 14.4, vitaminA: 4, vitaminC: 10.3, vitaminD: 0, vitaminE: 0.1, vitaminK: 0.6, vitaminB6: 0.4, vitaminB12: 0, calcium: 6, iron: 0.3, magnesium: 32, zinc: 0.2, potassium: 422, sodium: 1, cholesterol: 0, omega3: 0.03, omega6: 0.05 }
  },
  {
    id: '5', name: 'Salmon (Baked)', category: 'Protein',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 208, protein: 20, carbs: 0, fats: 13, fiber: 0, sugar: 0, vitaminA: 12, vitaminC: 0, vitaminD: 11, vitaminE: 3.6, vitaminK: 0.5, vitaminB6: 0.6, vitaminB12: 3.2, calcium: 12, iron: 0.3, magnesium: 27, zinc: 0.4, potassium: 363, sodium: 59, cholesterol: 55, omega3: 2.2, omega6: 0.3 }
  },
  {
    id: '6', name: 'Broccoli (Steamed)', category: 'Vegetables',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 35, protein: 2.4, carbs: 7.2, fats: 0.4, fiber: 3.3, sugar: 1.4, vitaminA: 31, vitaminC: 64.9, vitaminD: 0, vitaminE: 1.5, vitaminK: 141, vitaminB6: 0.2, vitaminB12: 0, calcium: 40, iron: 0.7, magnesium: 21, zinc: 0.4, potassium: 293, sodium: 41, cholesterol: 0, omega3: 0.02, omega6: 0.02 }
  },
  {
    id: '7', name: 'Greek Yogurt (Plain)', category: 'Dairy',
    servingSize: 170, servingUnit: 'g',
    nutrients: { calories: 100, protein: 17, carbs: 6, fats: 0.7, fiber: 0, sugar: 6, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB6: 0.1, vitaminB12: 1.3, calcium: 187, iron: 0.1, magnesium: 19, zinc: 0.9, potassium: 240, sodium: 61, cholesterol: 10, omega3: 0, omega6: 0 }
  },
  {
    id: '8', name: 'Oats (Dry)', category: 'Grains',
    servingSize: 40, servingUnit: 'g',
    nutrients: { calories: 154, protein: 5.3, carbs: 27.4, fats: 2.8, fiber: 4, sugar: 0.4, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.4, vitaminK: 0, vitaminB6: 0, vitaminB12: 0, calcium: 21, iron: 1.5, magnesium: 44, zinc: 1.2, potassium: 130, sodium: 2, cholesterol: 0, omega3: 0.02, omega6: 0.9 }
  },
  {
    id: '9', name: 'Almonds', category: 'Nuts',
    servingSize: 28, servingUnit: 'g',
    nutrients: { calories: 164, protein: 6, carbs: 6.1, fats: 14.2, fiber: 3.5, sugar: 1.2, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 7.3, vitaminK: 0, vitaminB6: 0, vitaminB12: 0, calcium: 76, iron: 1.1, magnesium: 77, zinc: 0.9, potassium: 208, sodium: 0, cholesterol: 0, omega3: 0, omega6: 3.5 }
  },
  {
    id: '10', name: 'Sweet Potato (Baked)', category: 'Vegetables',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 90, protein: 2, carbs: 20.7, fats: 0.2, fiber: 3.3, sugar: 6.5, vitaminA: 961, vitaminC: 19.6, vitaminD: 0, vitaminE: 0.7, vitaminK: 2.3, vitaminB6: 0.3, vitaminB12: 0, calcium: 38, iron: 0.7, magnesium: 27, zinc: 0.3, potassium: 475, sodium: 36, cholesterol: 0, omega3: 0, omega6: 0.01 }
  },
  {
    id: '11', name: 'Avocado', category: 'Fruits',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 160, protein: 2, carbs: 8.5, fats: 14.7, fiber: 6.7, sugar: 0.7, vitaminA: 7, vitaminC: 10, vitaminD: 0, vitaminE: 2.1, vitaminK: 21, vitaminB6: 0.3, vitaminB12: 0, calcium: 12, iron: 0.6, magnesium: 29, zinc: 0.6, potassium: 485, sodium: 7, cholesterol: 0, omega3: 0.1, omega6: 1.7 }
  },
  {
    id: '12', name: 'Whole Wheat Bread', category: 'Grains',
    servingSize: 30, servingUnit: 'g',
    nutrients: { calories: 81, protein: 4, carbs: 13.8, fats: 1.1, fiber: 1.9, sugar: 1.4, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.2, vitaminK: 2.7, vitaminB6: 0.1, vitaminB12: 0, calcium: 36, iron: 0.9, magnesium: 24, zinc: 0.5, potassium: 71, sodium: 146, cholesterol: 0, omega3: 0.02, omega6: 0.3 }
  },
  {
    id: '13', name: 'Spinach (Raw)', category: 'Vegetables',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 23, protein: 2.9, carbs: 3.6, fats: 0.4, fiber: 2.2, sugar: 0.4, vitaminA: 469, vitaminC: 28, vitaminD: 0, vitaminE: 2, vitaminK: 483, vitaminB6: 0.2, vitaminB12: 0, calcium: 99, iron: 2.7, magnesium: 79, zinc: 0.5, potassium: 558, sodium: 79, cholesterol: 0, omega3: 0.14, omega6: 0.03 }
  },
  {
    id: '14', name: 'Apple', category: 'Fruits',
    servingSize: 182, servingUnit: 'g',
    nutrients: { calories: 95, protein: 0.5, carbs: 25.1, fats: 0.3, fiber: 4.4, sugar: 18.9, vitaminA: 3, vitaminC: 8.4, vitaminD: 0, vitaminE: 0.3, vitaminK: 4, vitaminB6: 0.1, vitaminB12: 0, calcium: 11, iron: 0.2, magnesium: 9, zinc: 0.1, potassium: 195, sodium: 2, cholesterol: 0, omega3: 0.01, omega6: 0.05 }
  },
  {
    id: '15', name: 'Cottage Cheese (Low-fat)', category: 'Dairy',
    servingSize: 113, servingUnit: 'g',
    nutrients: { calories: 81, protein: 14, carbs: 3.4, fats: 1.1, fiber: 0, sugar: 2.7, vitaminA: 12, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB6: 0.1, vitaminB12: 0.5, calcium: 69, iron: 0.2, magnesium: 6, zinc: 0.4, potassium: 97, sodium: 364, cholesterol: 5, omega3: 0, omega6: 0 }
  },
  {
    id: '16', name: 'Olive Oil', category: 'Fats',
    servingSize: 14, servingUnit: 'g',
    nutrients: { calories: 119, protein: 0, carbs: 0, fats: 13.5, fiber: 0, sugar: 0, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 1.9, vitaminK: 8.1, vitaminB6: 0, vitaminB12: 0, calcium: 0, iron: 0.1, magnesium: 0, zinc: 0, potassium: 0, sodium: 0, cholesterol: 0, omega3: 0.1, omega6: 1.3 }
  },
  {
    id: '17', name: 'Lentils (Cooked)', category: 'Legumes',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, vitaminA: 8, vitaminC: 1.5, vitaminD: 0, vitaminE: 0.1, vitaminK: 1.7, vitaminB6: 0.2, vitaminB12: 0, calcium: 19, iron: 3.3, magnesium: 36, zinc: 1.3, potassium: 369, sodium: 2, cholesterol: 0, omega3: 0.04, omega6: 0.1 }
  },
  {
    id: '18', name: 'Milk (Whole)', category: 'Dairy',
    servingSize: 244, servingUnit: 'g',
    nutrients: { calories: 149, protein: 8, carbs: 12, fats: 8, fiber: 0, sugar: 12, vitaminA: 68, vitaminC: 0, vitaminD: 3.2, vitaminE: 0.1, vitaminK: 0.5, vitaminB6: 0.1, vitaminB12: 1.1, calcium: 276, iron: 0.1, magnesium: 24, zinc: 1, potassium: 322, sodium: 105, cholesterol: 24, omega3: 0.05, omega6: 0.1 }
  },
  {
    id: '19', name: 'Tuna (Canned in Water)', category: 'Protein',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 116, protein: 25.5, carbs: 0, fats: 0.8, fiber: 0, sugar: 0, vitaminA: 6, vitaminC: 0, vitaminD: 1.7, vitaminE: 0.2, vitaminK: 0, vitaminB6: 0.5, vitaminB12: 2.2, calcium: 11, iron: 1.3, magnesium: 30, zinc: 0.8, potassium: 237, sodium: 338, cholesterol: 42, omega3: 0.3, omega6: 0.01 }
  },
  {
    id: '20', name: 'Quinoa (Cooked)', category: 'Grains',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 120, protein: 4.4, carbs: 21.3, fats: 1.9, fiber: 2.8, sugar: 0.9, vitaminA: 1, vitaminC: 0, vitaminD: 0, vitaminE: 0.6, vitaminK: 0, vitaminB6: 0.1, vitaminB12: 0, calcium: 17, iron: 1.5, magnesium: 64, zinc: 1.1, potassium: 172, sodium: 7, cholesterol: 0, omega3: 0.05, omega6: 0.8 }
  },
];

export function searchFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return foodDatabase;
  return foodDatabase.filter(f =>
    f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );
}
