import { useAppState } from '@/context/AppContext';
import { calculateBMR, calculateTDEE, calculateTargetCalories, calculateTargetNutrients, waterIntake } from '@/utils/nutritionCalculations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets, Flame, Target, Activity, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserProfileCard() {
  const { profile, setProfile } = useAppState();
  const bmr = Math.round(calculateBMR(profile));
  const tdee = calculateTDEE(profile);
  const targetCal = calculateTargetCalories(profile);
  const water = waterIntake(profile.weight);

  const stats = [
    { label: 'BMR', value: `${bmr}`, unit: 'kcal', icon: Flame, color: 'text-destructive' },
    { label: 'TDEE', value: `${tdee}`, unit: 'kcal', icon: Activity, color: 'text-warning' },
    { label: 'Target', value: `${targetCal}`, unit: 'kcal', icon: Target, color: 'text-primary' },
    { label: 'Water', value: `${water}`, unit: 'L/day', icon: Droplets, color: 'text-info' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex items-center gap-2 mb-4">
        <User className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Profile</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <Label className="text-xs text-muted-foreground">Weight (kg)</Label>
          <Input type="number" value={profile.weight} onChange={e => setProfile({ ...profile, weight: +e.target.value })} className="h-9 mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Height (cm)</Label>
          <Input type="number" value={profile.height} onChange={e => setProfile({ ...profile, height: +e.target.value })} className="h-9 mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Age</Label>
          <Input type="number" value={profile.age} onChange={e => setProfile({ ...profile, age: +e.target.value })} className="h-9 mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Gender</Label>
          <Select value={profile.gender} onValueChange={(v: any) => setProfile({ ...profile, gender: v })}>
            <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Activity</Label>
          <Select value={profile.activityLevel} onValueChange={(v: any) => setProfile({ ...profile, activityLevel: v })}>
            <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="very_active">Very Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Goal</Label>
          <Select value={profile.goalType} onValueChange={(v: any) => setProfile({ ...profile, goalType: v })}>
            <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fat_loss">Fat Loss</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-center gap-2 rounded-xl bg-secondary/50 p-3"
          >
            <s.icon className={`h-4 w-4 ${s.color}`} />
            <div>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
              <p className="text-sm font-bold text-foreground">{s.value} <span className="font-normal text-[10px] text-muted-foreground">{s.unit}</span></p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
