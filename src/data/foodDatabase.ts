import { FoodItem } from '@/types/nutrition';

export const foodDatabase: FoodItem[] = [
  // === Pakistani / South Asian Foods ===
  {
    id: 'pk1', name: 'White Rice (Cooked)', category: 'Grains',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 130, protein: 2.7, carbs: 28.2, fats: 0.3, fiber: 0.4, sugar: 0.1, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB6: 0.1, vitaminB12: 0, calcium: 10, iron: 0.2, magnesium: 12, zinc: 0.5, potassium: 35, sodium: 1, cholesterol: 0, omega3: 0, omega6: 0.1 }
  },
  {
    id: 'pk2', name: 'Chicken Biryani', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 175, protein: 8.5, carbs: 22, fats: 6, fiber: 0.6, sugar: 0.5, vitaminA: 15, vitaminC: 2, vitaminD: 0.2, vitaminE: 0.5, vitaminK: 1.5, vitaminB6: 0.2, vitaminB12: 0.2, calcium: 25, iron: 1.2, magnesium: 22, zinc: 1, potassium: 150, sodium: 320, cholesterol: 35, omega3: 0.03, omega6: 0.8 }
  },
  {
    id: 'pk3', name: 'Beef Biryani', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 185, protein: 9, carbs: 22, fats: 7, fiber: 0.6, sugar: 0.5, vitaminA: 10, vitaminC: 1.5, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 1.2, vitaminB6: 0.2, vitaminB12: 1.2, calcium: 20, iron: 1.8, magnesium: 20, zinc: 2.5, potassium: 160, sodium: 340, cholesterol: 40, omega3: 0.02, omega6: 0.5 }
  },
  {
    id: 'pk4', name: 'Shami Kebab', category: 'Pakistani',
    servingSize: 60, servingUnit: 'g',
    nutrients: { calories: 150, protein: 10, carbs: 8, fats: 9, fiber: 1.5, sugar: 0.3, vitaminA: 5, vitaminC: 1, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 1, vitaminB6: 0.2, vitaminB12: 1.5, calcium: 18, iron: 2, magnesium: 18, zinc: 2.2, potassium: 140, sodium: 280, cholesterol: 50, omega3: 0.02, omega6: 0.4 }
  },
  {
    id: 'pk5', name: 'Seekh Kebab', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 210, protein: 16, carbs: 3, fats: 15, fiber: 0.5, sugar: 0.2, vitaminA: 8, vitaminC: 1, vitaminD: 0.1, vitaminE: 0.2, vitaminK: 0.5, vitaminB6: 0.3, vitaminB12: 2, calcium: 15, iron: 2.5, magnesium: 20, zinc: 3.5, potassium: 200, sodium: 350, cholesterol: 65, omega3: 0.03, omega6: 0.5 }
  },
  {
    id: 'pk6', name: 'Chapati / Roti', category: 'Pakistani',
    servingSize: 40, servingUnit: 'g',
    nutrients: { calories: 104, protein: 3.5, carbs: 18, fats: 2.5, fiber: 1.5, sugar: 0.3, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.2, vitaminK: 0.5, vitaminB6: 0.1, vitaminB12: 0, calcium: 10, iron: 0.8, magnesium: 15, zinc: 0.5, potassium: 45, sodium: 180, cholesterol: 0, omega3: 0, omega6: 0.3 }
  },
  {
    id: 'pk7', name: 'Naan', category: 'Pakistani',
    servingSize: 90, servingUnit: 'g',
    nutrients: { calories: 260, protein: 8, carbs: 45, fats: 5, fiber: 2, sugar: 2, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.3, vitaminK: 0.3, vitaminB6: 0.1, vitaminB12: 0, calcium: 50, iron: 2, magnesium: 20, zinc: 0.7, potassium: 70, sodium: 400, cholesterol: 5, omega3: 0, omega6: 0.5 }
  },
  {
    id: 'pk8', name: 'Paratha', category: 'Pakistani',
    servingSize: 80, servingUnit: 'g',
    nutrients: { calories: 260, protein: 5, carbs: 30, fats: 13, fiber: 1.5, sugar: 0.5, vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0.5, vitaminK: 1, vitaminB6: 0.1, vitaminB12: 0, calcium: 15, iron: 1.2, magnesium: 18, zinc: 0.5, potassium: 55, sodium: 300, cholesterol: 0, omega3: 0.01, omega6: 1 }
  },
  {
    id: 'pk9', name: 'Dal (Chana Dal)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 120, protein: 7, carbs: 18, fats: 2.5, fiber: 5, sugar: 1, vitaminA: 5, vitaminC: 1, vitaminD: 0, vitaminE: 0.2, vitaminK: 1, vitaminB6: 0.2, vitaminB12: 0, calcium: 30, iron: 2.5, magnesium: 40, zinc: 1.2, potassium: 300, sodium: 250, cholesterol: 0, omega3: 0.02, omega6: 0.3 }
  },
  {
    id: 'pk10', name: 'Dal (Masoor/Red Lentil)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 116, protein: 9, carbs: 20, fats: 0.4, fiber: 7.9, sugar: 1.8, vitaminA: 8, vitaminC: 1.5, vitaminD: 0, vitaminE: 0.1, vitaminK: 1.7, vitaminB6: 0.2, vitaminB12: 0, calcium: 19, iron: 3.3, magnesium: 36, zinc: 1.3, potassium: 369, sodium: 2, cholesterol: 0, omega3: 0.04, omega6: 0.1 }
  },
  {
    id: 'pk11', name: 'Nihari', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 160, protein: 12, carbs: 4, fats: 11, fiber: 0.5, sugar: 0.5, vitaminA: 10, vitaminC: 1, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 1, vitaminB6: 0.2, vitaminB12: 2, calcium: 20, iron: 2.5, magnesium: 18, zinc: 3, potassium: 200, sodium: 400, cholesterol: 55, omega3: 0.03, omega6: 0.4 }
  },
  {
    id: 'pk12', name: 'Haleem', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 145, protein: 8, carbs: 15, fats: 6, fiber: 3, sugar: 1, vitaminA: 8, vitaminC: 1, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 1.5, vitaminB6: 0.2, vitaminB12: 0.8, calcium: 25, iron: 2.2, magnesium: 30, zinc: 2, potassium: 250, sodium: 350, cholesterol: 30, omega3: 0.03, omega6: 0.3 }
  },
  {
    id: 'pk13', name: 'Chicken Karahi', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 165, protein: 14, carbs: 4, fats: 10, fiber: 0.8, sugar: 1, vitaminA: 20, vitaminC: 8, vitaminD: 0.2, vitaminE: 1, vitaminK: 3, vitaminB6: 0.3, vitaminB12: 0.3, calcium: 20, iron: 1.2, magnesium: 22, zinc: 1.5, potassium: 220, sodium: 350, cholesterol: 60, omega3: 0.04, omega6: 0.8 }
  },
  {
    id: 'pk14', name: 'Beef Korma', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 190, protein: 12, carbs: 6, fats: 14, fiber: 1, sugar: 2, vitaminA: 15, vitaminC: 2, vitaminD: 0.1, vitaminE: 0.5, vitaminK: 2, vitaminB6: 0.2, vitaminB12: 1.5, calcium: 30, iron: 2, magnesium: 20, zinc: 3, potassium: 180, sodium: 380, cholesterol: 55, omega3: 0.03, omega6: 0.5 }
  },
  {
    id: 'pk15', name: 'Aloo Gosht', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 140, protein: 8, carbs: 12, fats: 7, fiber: 1.5, sugar: 1, vitaminA: 10, vitaminC: 6, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 2, vitaminB6: 0.2, vitaminB12: 1, calcium: 18, iron: 1.5, magnesium: 20, zinc: 2, potassium: 250, sodium: 300, cholesterol: 35, omega3: 0.02, omega6: 0.4 }
  },
  {
    id: 'pk16', name: 'Palak Paneer / Saag', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 120, protein: 7, carbs: 5, fats: 8, fiber: 2, sugar: 1.5, vitaminA: 300, vitaminC: 15, vitaminD: 0, vitaminE: 1.5, vitaminK: 200, vitaminB6: 0.2, vitaminB12: 0.1, calcium: 150, iron: 2.5, magnesium: 50, zinc: 0.8, potassium: 350, sodium: 250, cholesterol: 15, omega3: 0.05, omega6: 0.2 }
  },
  {
    id: 'pk17', name: 'Samosa (Beef)', category: 'Pakistani',
    servingSize: 80, servingUnit: 'g',
    nutrients: { calories: 220, protein: 6, carbs: 22, fats: 12, fiber: 1, sugar: 0.5, vitaminA: 5, vitaminC: 2, vitaminD: 0, vitaminE: 1, vitaminK: 2, vitaminB6: 0.1, vitaminB12: 0.5, calcium: 15, iron: 1.5, magnesium: 15, zinc: 1.5, potassium: 100, sodium: 350, cholesterol: 25, omega3: 0.01, omega6: 1.5 }
  },
  {
    id: 'pk18', name: 'Pakora (Mixed Vegetable)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 240, protein: 5, carbs: 25, fats: 13, fiber: 2, sugar: 1.5, vitaminA: 30, vitaminC: 5, vitaminD: 0, vitaminE: 1, vitaminK: 10, vitaminB6: 0.1, vitaminB12: 0, calcium: 30, iron: 1.5, magnesium: 20, zinc: 0.5, potassium: 150, sodium: 400, cholesterol: 0, omega3: 0.01, omega6: 2 }
  },
  {
    id: 'pk19', name: 'Lassi (Sweet)', category: 'Pakistani',
    servingSize: 250, servingUnit: 'g',
    nutrients: { calories: 180, protein: 7, carbs: 28, fats: 5, fiber: 0, sugar: 25, vitaminA: 30, vitaminC: 1, vitaminD: 0.5, vitaminE: 0.1, vitaminK: 0.2, vitaminB6: 0.1, vitaminB12: 0.5, calcium: 200, iron: 0.2, magnesium: 20, zinc: 0.8, potassium: 280, sodium: 80, cholesterol: 15, omega3: 0.01, omega6: 0.05 }
  },
  {
    id: 'pk20', name: 'Raita (Yogurt)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 60, protein: 3.5, carbs: 5, fats: 3, fiber: 0.3, sugar: 4, vitaminA: 10, vitaminC: 2, vitaminD: 0, vitaminE: 0, vitaminK: 0, vitaminB6: 0.05, vitaminB12: 0.4, calcium: 120, iron: 0.1, magnesium: 12, zinc: 0.5, potassium: 155, sodium: 45, cholesterol: 8, omega3: 0, omega6: 0.02 }
  },
  {
    id: 'pk21', name: 'Chana Chaat', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 130, protein: 7, carbs: 20, fats: 3, fiber: 5, sugar: 2, vitaminA: 10, vitaminC: 8, vitaminD: 0, vitaminE: 0.2, vitaminK: 3, vitaminB6: 0.1, vitaminB12: 0, calcium: 30, iron: 2, magnesium: 35, zinc: 1, potassium: 250, sodium: 200, cholesterol: 0, omega3: 0.01, omega6: 0.2 }
  },
  {
    id: 'pk22', name: 'Chicken Tikka', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 175, protein: 25, carbs: 3, fats: 7, fiber: 0.5, sugar: 0.5, vitaminA: 15, vitaminC: 3, vitaminD: 0.2, vitaminE: 0.5, vitaminK: 1, vitaminB6: 0.5, vitaminB12: 0.3, calcium: 20, iron: 1.2, magnesium: 25, zinc: 1.5, potassium: 260, sodium: 400, cholesterol: 75, omega3: 0.04, omega6: 0.7 }
  },
  {
    id: 'pk23', name: 'Keema (Minced Meat)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 180, protein: 14, carbs: 5, fats: 12, fiber: 1, sugar: 1, vitaminA: 10, vitaminC: 4, vitaminD: 0.1, vitaminE: 0.3, vitaminK: 2, vitaminB6: 0.3, vitaminB12: 2, calcium: 18, iron: 2.5, magnesium: 20, zinc: 3.5, potassium: 220, sodium: 350, cholesterol: 55, omega3: 0.03, omega6: 0.5 }
  },
  {
    id: 'pk24', name: 'Aloo Paratha', category: 'Pakistani',
    servingSize: 120, servingUnit: 'g',
    nutrients: { calories: 320, protein: 6, carbs: 42, fats: 14, fiber: 2.5, sugar: 1, vitaminA: 5, vitaminC: 5, vitaminD: 0, vitaminE: 0.5, vitaminK: 1.5, vitaminB6: 0.2, vitaminB12: 0, calcium: 20, iron: 1.5, magnesium: 25, zinc: 0.7, potassium: 200, sodium: 400, cholesterol: 0, omega3: 0.01, omega6: 1.5 }
  },
  {
    id: 'pk25', name: 'Dahi (Plain Yogurt)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 61, protein: 3.5, carbs: 4.7, fats: 3.3, fiber: 0, sugar: 4.7, vitaminA: 27, vitaminC: 0.5, vitaminD: 0, vitaminE: 0, vitaminK: 0.2, vitaminB6: 0.05, vitaminB12: 0.4, calcium: 121, iron: 0.1, magnesium: 12, zinc: 0.6, potassium: 155, sodium: 46, cholesterol: 13, omega3: 0, omega6: 0.02 }
  },
  {
    id: 'pk26', name: 'Chai (Milk Tea)', category: 'Pakistani',
    servingSize: 200, servingUnit: 'g',
    nutrients: { calories: 80, protein: 3, carbs: 12, fats: 2.5, fiber: 0, sugar: 10, vitaminA: 20, vitaminC: 0, vitaminD: 0.3, vitaminE: 0, vitaminK: 0, vitaminB6: 0, vitaminB12: 0.2, calcium: 80, iron: 0.2, magnesium: 10, zinc: 0.3, potassium: 120, sodium: 40, cholesterol: 8, omega3: 0, omega6: 0.01 }
  },
  {
    id: 'pk27', name: 'Gulab Jamun', category: 'Pakistani',
    servingSize: 50, servingUnit: 'g',
    nutrients: { calories: 175, protein: 2.5, carbs: 28, fats: 7, fiber: 0, sugar: 22, vitaminA: 15, vitaminC: 0, vitaminD: 0, vitaminE: 0.1, vitaminK: 0, vitaminB6: 0, vitaminB12: 0.1, calcium: 30, iron: 0.3, magnesium: 5, zinc: 0.2, potassium: 40, sodium: 30, cholesterol: 10, omega3: 0, omega6: 0.2 }
  },
  {
    id: 'pk28', name: 'Kheer (Rice Pudding)', category: 'Pakistani',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 140, protein: 4, carbs: 22, fats: 4, fiber: 0.2, sugar: 16, vitaminA: 25, vitaminC: 0.5, vitaminD: 0.3, vitaminE: 0.1, vitaminK: 0.2, vitaminB6: 0.05, vitaminB12: 0.3, calcium: 100, iron: 0.3, magnesium: 15, zinc: 0.5, potassium: 150, sodium: 50, cholesterol: 12, omega3: 0, omega6: 0.05 }
  },

  // === General Foods ===
  {
    id: '1', name: 'Chicken Breast (Grilled)', category: 'Protein',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 165, protein: 31, carbs: 0, fats: 3.6, fiber: 0, sugar: 0, vitaminA: 6, vitaminC: 0, vitaminD: 0.4, vitaminE: 0.3, vitaminK: 0, vitaminB6: 0.6, vitaminB12: 0.3, calcium: 15, iron: 1, magnesium: 29, zinc: 1, potassium: 256, sodium: 74, cholesterol: 85, omega3: 0.05, omega6: 0.6 }
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
    id: '6', name: 'Broccoli (Steamed)', category: 'Vegetables',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 35, protein: 2.4, carbs: 7.2, fats: 0.4, fiber: 3.3, sugar: 1.4, vitaminA: 31, vitaminC: 64.9, vitaminD: 0, vitaminE: 1.5, vitaminK: 141, vitaminB6: 0.2, vitaminB12: 0, calcium: 40, iron: 0.7, magnesium: 21, zinc: 0.4, potassium: 293, sodium: 41, cholesterol: 0, omega3: 0.02, omega6: 0.02 }
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
    id: 'pk29', name: 'Mango', category: 'Fruits',
    servingSize: 100, servingUnit: 'g',
    nutrients: { calories: 60, protein: 0.8, carbs: 15, fats: 0.4, fiber: 1.6, sugar: 13.7, vitaminA: 54, vitaminC: 36.4, vitaminD: 0, vitaminE: 0.9, vitaminK: 4.2, vitaminB6: 0.1, vitaminB12: 0, calcium: 11, iron: 0.2, magnesium: 10, zinc: 0.1, potassium: 168, sodium: 1, cholesterol: 0, omega3: 0.01, omega6: 0.01 }
  },
];

export function searchFoods(query: string): FoodItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return foodDatabase;
  return foodDatabase.filter(f =>
    f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)
  );
}
