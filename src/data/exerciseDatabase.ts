export interface Exercise {
  id: string;
  name: string;
  category: 'Cardio' | 'Strength' | 'Flexibility' | 'HIIT' | 'Sports';
  caloriesPer30Min: number; // for a 70kg person
  unit: 'minutes' | 'reps' | 'steps';
  defaultDuration: number;
  icon: string;
}

export const exerciseDatabase: Exercise[] = [
  // === Cardio ===
  { id: 'ex1', name: 'Walking (Brisk)', category: 'Cardio', caloriesPer30Min: 150, unit: 'minutes', defaultDuration: 30, icon: '🚶' },
  { id: 'ex2', name: 'Running / Jogging', category: 'Cardio', caloriesPer30Min: 300, unit: 'minutes', defaultDuration: 30, icon: '🏃' },
  { id: 'ex3', name: 'Cycling', category: 'Cardio', caloriesPer30Min: 250, unit: 'minutes', defaultDuration: 30, icon: '🚴' },
  { id: 'ex4', name: 'Jump Rope / Skipping', category: 'Cardio', caloriesPer30Min: 350, unit: 'minutes', defaultDuration: 15, icon: '⏭️' },
  { id: 'ex5', name: 'Swimming', category: 'Cardio', caloriesPer30Min: 280, unit: 'minutes', defaultDuration: 30, icon: '🏊' },
  { id: 'ex6', name: 'Stair Climbing', category: 'Cardio', caloriesPer30Min: 300, unit: 'minutes', defaultDuration: 15, icon: '🪜' },
  { id: 'ex7', name: '10K Steps', category: 'Cardio', caloriesPer30Min: 400, unit: 'steps', defaultDuration: 10000, icon: '👣' },
  { id: 'ex8', name: '5K Steps', category: 'Cardio', caloriesPer30Min: 200, unit: 'steps', defaultDuration: 5000, icon: '👣' },
  { id: 'ex9', name: 'Dancing', category: 'Cardio', caloriesPer30Min: 200, unit: 'minutes', defaultDuration: 30, icon: '💃' },
  { id: 'ex10', name: 'Elliptical Trainer', category: 'Cardio', caloriesPer30Min: 270, unit: 'minutes', defaultDuration: 30, icon: '🏋️' },
  { id: 'ex11', name: 'Treadmill Walking', category: 'Cardio', caloriesPer30Min: 160, unit: 'minutes', defaultDuration: 30, icon: '🚶' },
  { id: 'ex12', name: 'Rowing Machine', category: 'Cardio', caloriesPer30Min: 300, unit: 'minutes', defaultDuration: 20, icon: '🚣' },

  // === Strength / Home Exercises ===
  { id: 'ex20', name: 'Push-ups', category: 'Strength', caloriesPer30Min: 200, unit: 'reps', defaultDuration: 20, icon: '💪' },
  { id: 'ex21', name: 'Squats (Bodyweight)', category: 'Strength', caloriesPer30Min: 180, unit: 'reps', defaultDuration: 20, icon: '🦵' },
  { id: 'ex22', name: 'Lunges', category: 'Strength', caloriesPer30Min: 200, unit: 'reps', defaultDuration: 20, icon: '🦿' },
  { id: 'ex23', name: 'Plank Hold', category: 'Strength', caloriesPer30Min: 120, unit: 'minutes', defaultDuration: 2, icon: '🧱' },
  { id: 'ex24', name: 'Sit-ups / Crunches', category: 'Strength', caloriesPer30Min: 170, unit: 'reps', defaultDuration: 30, icon: '🔄' },
  { id: 'ex25', name: 'Burpees', category: 'Strength', caloriesPer30Min: 350, unit: 'reps', defaultDuration: 15, icon: '🔥' },
  { id: 'ex26', name: 'Mountain Climbers', category: 'Strength', caloriesPer30Min: 280, unit: 'reps', defaultDuration: 30, icon: '⛰️' },
  { id: 'ex27', name: 'Jumping Jacks', category: 'Strength', caloriesPer30Min: 250, unit: 'reps', defaultDuration: 50, icon: '⭐' },
  { id: 'ex28', name: 'Pull-ups', category: 'Strength', caloriesPer30Min: 250, unit: 'reps', defaultDuration: 10, icon: '💪' },
  { id: 'ex29', name: 'Dips (Chair/Bench)', category: 'Strength', caloriesPer30Min: 200, unit: 'reps', defaultDuration: 15, icon: '💺' },
  { id: 'ex30', name: 'Leg Raises', category: 'Strength', caloriesPer30Min: 150, unit: 'reps', defaultDuration: 20, icon: '🦵' },
  { id: 'ex31', name: 'Wall Sit', category: 'Strength', caloriesPer30Min: 130, unit: 'minutes', defaultDuration: 2, icon: '🧱' },
  { id: 'ex32', name: 'Deadlift (Dumbbell)', category: 'Strength', caloriesPer30Min: 220, unit: 'reps', defaultDuration: 15, icon: '🏋️' },
  { id: 'ex33', name: 'Bicep Curls', category: 'Strength', caloriesPer30Min: 130, unit: 'reps', defaultDuration: 15, icon: '💪' },
  { id: 'ex34', name: 'Shoulder Press', category: 'Strength', caloriesPer30Min: 150, unit: 'reps', defaultDuration: 15, icon: '🏋️' },
  { id: 'ex35', name: 'Glute Bridge', category: 'Strength', caloriesPer30Min: 140, unit: 'reps', defaultDuration: 20, icon: '🍑' },
  { id: 'ex36', name: 'Calf Raises', category: 'Strength', caloriesPer30Min: 100, unit: 'reps', defaultDuration: 30, icon: '🦵' },

  // === HIIT ===
  { id: 'ex40', name: 'HIIT Workout (General)', category: 'HIIT', caloriesPer30Min: 400, unit: 'minutes', defaultDuration: 20, icon: '🔥' },
  { id: 'ex41', name: 'Tabata Training', category: 'HIIT', caloriesPer30Min: 380, unit: 'minutes', defaultDuration: 20, icon: '⏱️' },
  { id: 'ex42', name: 'Circuit Training', category: 'HIIT', caloriesPer30Min: 320, unit: 'minutes', defaultDuration: 30, icon: '🔁' },
  { id: 'ex43', name: 'Box Jumps', category: 'HIIT', caloriesPer30Min: 300, unit: 'reps', defaultDuration: 20, icon: '📦' },
  { id: 'ex44', name: 'High Knees', category: 'HIIT', caloriesPer30Min: 280, unit: 'minutes', defaultDuration: 10, icon: '🦵' },
  { id: 'ex45', name: 'Sprint Intervals', category: 'HIIT', caloriesPer30Min: 400, unit: 'minutes', defaultDuration: 15, icon: '💨' },

  // === Flexibility ===
  { id: 'ex50', name: 'Yoga', category: 'Flexibility', caloriesPer30Min: 120, unit: 'minutes', defaultDuration: 30, icon: '🧘' },
  { id: 'ex51', name: 'Stretching', category: 'Flexibility', caloriesPer30Min: 80, unit: 'minutes', defaultDuration: 15, icon: '🤸' },
  { id: 'ex52', name: 'Pilates', category: 'Flexibility', caloriesPer30Min: 170, unit: 'minutes', defaultDuration: 30, icon: '🧘' },
  { id: 'ex53', name: 'Tai Chi', category: 'Flexibility', caloriesPer30Min: 100, unit: 'minutes', defaultDuration: 30, icon: '☯️' },

  // === Sports ===
  { id: 'ex60', name: 'Cricket', category: 'Sports', caloriesPer30Min: 180, unit: 'minutes', defaultDuration: 60, icon: '🏏' },
  { id: 'ex61', name: 'Football / Soccer', category: 'Sports', caloriesPer30Min: 280, unit: 'minutes', defaultDuration: 45, icon: '⚽' },
  { id: 'ex62', name: 'Badminton', category: 'Sports', caloriesPer30Min: 200, unit: 'minutes', defaultDuration: 30, icon: '🏸' },
  { id: 'ex63', name: 'Table Tennis', category: 'Sports', caloriesPer30Min: 140, unit: 'minutes', defaultDuration: 30, icon: '🏓' },
  { id: 'ex64', name: 'Basketball', category: 'Sports', caloriesPer30Min: 280, unit: 'minutes', defaultDuration: 30, icon: '🏀' },
  { id: 'ex65', name: 'Tennis', category: 'Sports', caloriesPer30Min: 250, unit: 'minutes', defaultDuration: 30, icon: '🎾' },
  { id: 'ex66', name: 'Volleyball', category: 'Sports', caloriesPer30Min: 180, unit: 'minutes', defaultDuration: 30, icon: '🏐' },
];

export function calculateCaloriesBurned(exercise: Exercise, duration: number, userWeight: number): number {
  const weightFactor = userWeight / 70; // normalize to 70kg baseline
  if (exercise.unit === 'steps') {
    // For steps: calories are total for the default step count
    return Math.round(exercise.caloriesPer30Min * (duration / exercise.defaultDuration) * weightFactor);
  }
  if (exercise.unit === 'reps') {
    // For reps: estimate ~3 cal per rep baseline, adjusted by exercise intensity
    const calPerRep = (exercise.caloriesPer30Min / 30) * 1.5;
    return Math.round(calPerRep * duration * weightFactor);
  }
  // For minutes
  return Math.round((exercise.caloriesPer30Min / 30) * duration * weightFactor);
}

export function searchExercises(query: string): Exercise[] {
  const q = query.toLowerCase().trim();
  if (!q) return exerciseDatabase;
  return exerciseDatabase.filter(e =>
    e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q)
  );
}
