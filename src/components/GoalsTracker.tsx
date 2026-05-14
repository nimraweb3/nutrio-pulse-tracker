import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useAppState } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Trash2, CheckCircle2, Calendar, Flame, Dumbbell, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { sumNutrients } from '@/utils/nutritionCalculations';

export interface FitnessGoal {
  id: string;
  type: 'weekly' | 'monthly';
  title: string;
  description: string | null;
  target_weight: number | null;
  target_calories: number | null;
  target_workouts: number | null;
  start_date: string;
  end_date: string;
  status: 'active' | 'completed' | 'archived';
}

const todayISO = () => new Date().toISOString().slice(0, 10);
const addDays = (d: string, n: number) => {
  const x = new Date(d); x.setDate(x.getDate() + n);
  return x.toISOString().slice(0, 10);
};

export default function GoalsTracker() {
  const { user } = useAuth();
  const { dayLogs, weightLog, workoutLogs } = useAppState();
  const [goals, setGoals] = useState<FitnessGoal[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'weekly' as 'weekly' | 'monthly',
    title: '',
    description: '',
    target_weight: '',
    target_calories: '',
    target_workouts: '',
  });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('fitness_goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (data) setGoals(data as FitnessGoal[]);
  };

  useEffect(() => { load(); }, [user]);

  const create = async () => {
    if (!user || !form.title.trim()) { toast.error('Add a title'); return; }
    const start = todayISO();
    const end = addDays(start, form.type === 'weekly' ? 7 : 30);
    const { error } = await supabase.from('fitness_goals').insert({
      user_id: user.id,
      type: form.type,
      title: form.title.trim(),
      description: form.description.trim() || null,
      target_weight: form.target_weight ? Number(form.target_weight) : null,
      target_calories: form.target_calories ? Number(form.target_calories) : null,
      target_workouts: form.target_workouts ? Number(form.target_workouts) : null,
      start_date: start,
      end_date: end,
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Goal created');
    setForm({ type: 'weekly', title: '', description: '', target_weight: '', target_calories: '', target_workouts: '' });
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from('fitness_goals').delete().eq('id', id);
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const complete = async (id: string) => {
    await supabase.from('fitness_goals').update({ status: 'completed' }).eq('id', id);
    load();
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Fitness Goals</h2>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <Plus className="h-3.5 w-3.5" /> New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Set a fitness goal</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Period</Label>
                  <Select value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                    <SelectTrigger className="h-9 mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly (7 days)</SelectItem>
                      <SelectItem value="monthly">Monthly (30 days)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input className="h-9 mt-1" placeholder="Lose 1 kg" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
              </div>
              <div>
                <Label className="text-xs">What you want to do</Label>
                <Textarea rows={2} placeholder="e.g. Eat under 1800 kcal, gym 4x, drop 1kg by Sunday" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label className="text-[10px] flex items-center gap-1"><Scale className="h-3 w-3" /> Target wt (kg)</Label>
                  <Input className="h-9 mt-1" type="number" value={form.target_weight} onChange={e => setForm({ ...form, target_weight: e.target.value })} />
                </div>
                <div>
                  <Label className="text-[10px] flex items-center gap-1"><Flame className="h-3 w-3" /> Daily kcal</Label>
                  <Input className="h-9 mt-1" type="number" value={form.target_calories} onChange={e => setForm({ ...form, target_calories: e.target.value })} />
                </div>
                <div>
                  <Label className="text-[10px] flex items-center gap-1"><Dumbbell className="h-3 w-3" /> Workouts</Label>
                  <Input className="h-9 mt-1" type="number" value={form.target_workouts} onChange={e => setForm({ ...form, target_workouts: e.target.value })} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={create}>Create goal</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-6 text-xs text-muted-foreground">
          No goals yet. Set a weekly or monthly target and the AI Chef will help you reach it.
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {goals.map(g => <GoalCard key={g.id} goal={g} dayLogs={dayLogs} weightLog={weightLog} workoutLogs={workoutLogs} onRemove={remove} onComplete={complete} />)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function GoalCard({ goal, dayLogs, weightLog, workoutLogs, onRemove, onComplete }: any) {
  const today = todayISO();
  const totalDays = Math.max(1, Math.round((+new Date(goal.end_date) - +new Date(goal.start_date)) / 86400000));
  const daysElapsed = Math.min(totalDays, Math.max(0, Math.round((+new Date(today) - +new Date(goal.start_date)) / 86400000)));
  const timeProgress = Math.min(100, (daysElapsed / totalDays) * 100);
  const daysLeft = Math.max(0, totalDays - daysElapsed);

  // Compute averages within window
  const stats = useMemo(() => {
    let totalKcal = 0, daysWithLog = 0, workoutCount = 0;
    for (let i = 0; i <= daysElapsed; i++) {
      const d = addDays(goal.start_date, i);
      const entries = dayLogs[d]?.entries || [];
      if (entries.length) {
        const n = sumNutrients(entries);
        totalKcal += n.calories;
        daysWithLog++;
      }
      workoutCount += (workoutLogs[d]?.length || 0);
    }
    const avgKcal = daysWithLog ? Math.round(totalKcal / daysWithLog) : 0;
    const startWeight = weightLog[goal.start_date] ?? Object.values(weightLog)[0];
    const currentWeight = weightLog[today] ?? startWeight;
    return { avgKcal, workoutCount, startWeight, currentWeight };
  }, [goal, dayLogs, weightLog, workoutLogs, daysElapsed, today]);

  const calProgress = goal.target_calories && stats.avgKcal
    ? Math.min(100, Math.round((Math.min(stats.avgKcal, goal.target_calories) / goal.target_calories) * 100))
    : null;
  const woProgress = goal.target_workouts
    ? Math.min(100, Math.round((stats.workoutCount / goal.target_workouts) * 100))
    : null;
  const wtProgress = goal.target_weight && stats.startWeight && stats.currentWeight
    ? Math.min(100, Math.max(0, Math.round(
        (Math.abs(stats.startWeight - stats.currentWeight) /
          Math.max(0.1, Math.abs(stats.startWeight - goal.target_weight))) * 100
      )))
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="rounded-lg border border-border bg-secondary/30 p-3 space-y-2"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={goal.type === 'weekly' ? 'default' : 'secondary'} className="text-[10px]">{goal.type}</Badge>
            {goal.status === 'completed' && <Badge variant="outline" className="text-[10px] gap-1"><CheckCircle2 className="h-3 w-3" /> done</Badge>}
            <p className="text-sm font-semibold truncate">{goal.title}</p>
          </div>
          {goal.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{goal.description}</p>}
        </div>
        <div className="flex gap-1">
          {goal.status !== 'completed' && (
            <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onComplete(goal.id)} title="Mark complete">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            </Button>
          )}
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onRemove(goal.id)}>
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Day {daysElapsed}/{totalDays}</span>
          <span>{daysLeft} days left</span>
        </div>
        <Progress value={timeProgress} className="h-1.5" />
      </div>

      {(calProgress !== null || woProgress !== null || wtProgress !== null) && (
        <div className="grid grid-cols-1 gap-1.5 pt-1">
          {calProgress !== null && (
            <MiniProgress icon={Flame} label={`Avg kcal: ${stats.avgKcal} / ${goal.target_calories}`} value={calProgress} />
          )}
          {woProgress !== null && (
            <MiniProgress icon={Dumbbell} label={`Workouts: ${stats.workoutCount} / ${goal.target_workouts}`} value={woProgress} />
          )}
          {wtProgress !== null && (
            <MiniProgress icon={Scale} label={`Weight: ${stats.currentWeight}kg → ${goal.target_weight}kg`} value={wtProgress} />
          )}
        </div>
      )}
    </motion.div>
  );
}

function MiniProgress({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1 text-muted-foreground"><Icon className="h-3 w-3" /> {label}</span>
        <span className="font-semibold text-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-1" />
    </div>
  );
}
