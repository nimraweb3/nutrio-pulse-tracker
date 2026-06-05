import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Flame, CheckCircle2, Circle, Trophy, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppState, WorkoutEntry } from '@/context/AppContext';
import { formatDate } from '@/utils/nutritionCalculations';
import { toast } from 'sonner';

type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
interface Exercise {
  name: string;
  duration: string;
  image: string;
  how: string;
  tip: string;
  kcal: number; // estimated calories burned per set (70kg reference)
  difficulty: Difficulty;
}
interface Circuit {
  category: string;
  title: string;
  accent: string;
  items: Exercise[];
}

const SP = (path: string) => `https://spotebi.com/wp-content/uploads/${path}`;
const GIFS = {
  jumpingJacks: SP('2014/10/jumping-jacks-exercise-illustration.gif'),
  highKnees: SP('2014/10/high-knees-exercise-illustration.gif'),
  armCircles: SP('2014/10/arm-circles-exercise-illustration.gif'),
  inchworm: SP('2015/02/inchworm-exercise-illustration-spotebi.gif'),
  squat: SP('2014/10/squat-exercise-illustration.gif'),
  sumoSquat: SP('2015/05/sumo-squat-exercise-illustration-spotebi.gif'),
  reverseLunge: SP('2017/06/reverse-lunge-medicine-ball-overhead-press-exercise-illustration-spotebi.gif'),
  gluteBridge: SP('2015/01/glute-bridge-exercise-illustration-spotebi.gif'),
  singleLegBridge: SP('2015/04/single-leg-glute-bridge-exercise-illustration-spotebi.gif'),
  wallSit: SP('2015/05/wall-sit-exercise-illustration.gif'),
  stepUp: SP('2015/05/step-up-exercise-illustration-spotebi.gif'),
  pistolSquat: SP('2015/06/pistol-squat-exercise-illustration-spotebi.gif'),
  pushUp: SP('2014/10/push-up-exercise-illustration.gif'),
  kneePushUp: SP('2015/01/kneeling-push-up-exercise-illustration-spotebi.gif'),
  diamondPushUp: SP('2015/04/diamond-push-up-exercise-illustration-spotebi.gif'),
  declinePushUp: SP('2015/04/decline-push-up-exercise-illustration-spotebi.gif'),
  pikePushUp: SP('2016/03/pike-push-up-exercise-illustration-spotebi.gif'),
  tricepDips: SP('2015/04/tricep-dips-exercise-illustration-spotebi.gif'),
  plank: SP('2014/10/plank-exercise-illustration.gif'),
  sidePlank: SP('2014/10/side-plank-exercise-illustration.gif'),
  superman: SP('2016/02/superman-exercise-illustration-spotebi.gif'),
  bearCrawl: SP('2015/04/bear-crawl-exercise-illustration-spotebi.gif'),
  burpees: SP('2014/10/burpees-exercise-illustration.gif'),
  mountainClimbers: SP('2014/10/mountain-climbers-exercise-illustration.gif'),
  jumpSquat: SP('2015/08/jump-squat-exercise-illustration.gif'),
  squatKick: SP('2015/04/squat-kickback-exercise-illustration-spotebi.gif'),
  lateralShuffle: 'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/Side_to_Side_Box_Shuffle/0.jpg',
  skaterHops: SP('2015/04/skater-exercise-illustration-spotebi.gif'),
  tuckJump: SP('2015/04/tuck-jump-exercise-illustration-spotebi.gif'),
  boxJump: SP('2015/04/box-jump-exercise-illustration-spotebi.gif'),
  crunches: SP('2014/10/crunches-exercise-illustration.gif'),
  bicycleCrunches: SP('2014/10/bicycle-crunches-exercise-illustration.gif'),
  legRaise: SP('2014/10/straight-leg-raise-exercise-illustration.gif'),
  russianTwist: SP('2015/04/russian-twist-exercise-illustration.gif'),
  deadBug: SP('2015/05/dead-bug-exercise-illustration.gif'),
  flutterKicks: SP('2015/04/flutter-kicks-exercise-illustration-spotebi.gif'),
  vUp: SP('2015/04/v-up-exercise-illustration-spotebi.gif'),
  hollowHold: SP('2015/04/hollow-hold-exercise-illustration-spotebi.gif'),
};

const circuits: Circuit[] = [
  {
    category: 'warmup', title: 'Warm Up', accent: 'hsl(38 92% 50%)',
    items: [
      { name: 'Jumping Jacks', duration: '1 min', kcal: 8, difficulty: 'Beginner', image: GIFS.jumpingJacks,
        how: 'Stand with feet together, arms at sides. Jump feet out wide while raising arms overhead. Jump back to start. Keep rhythm steady and breathe.',
        tip: 'Land softly on the balls of your feet' },
      { name: 'High Knees', duration: '1 min', kcal: 10, difficulty: 'Beginner', image: GIFS.highKnees,
        how: 'Run in place, lifting knees to hip height with each step. Pump arms for balance. Stay light on your toes and keep core tight.',
        tip: 'Drive knees UP — not forward' },
      { name: 'Arm Circles', duration: '30s each way', kcal: 3, difficulty: 'Beginner', image: GIFS.armCircles,
        how: 'Extend arms out to sides at shoulder height. Make big circles forward for 30 sec, then reverse. Keep shoulders relaxed.',
        tip: 'Make the circles as BIG as possible' },
      { name: 'Inchworm', duration: '8 reps', kcal: 6, difficulty: 'Intermediate', image: GIFS.inchworm,
        how: 'Stand tall, hinge forward and walk hands out to a plank. Walk feet to hands. Repeat. Mobilises hamstrings and shoulders.',
        tip: 'Keep legs as straight as comfortable' },
    ],
  },
  {
    category: 'lower', title: 'Circuit 1 — Lower Body', accent: 'hsl(158 64% 40%)',
    items: [
      { name: 'Squats', duration: '40s ON / 20s REST', kcal: 6, difficulty: 'Beginner', image: GIFS.squat,
        how: 'Feet shoulder-width apart, toes slightly out. Push hips back and bend knees like sitting on a chair. Keep chest up, heels on floor.',
        tip: 'Knees track over toes — never cave inward' },
      { name: 'Sumo Squats', duration: '40s ON / 20s REST', kcal: 6, difficulty: 'Beginner', image: GIFS.sumoSquat,
        how: 'Feet wider than shoulder-width, toes at 45°. Lower straight down, keeping back straight. Targets inner thighs and glutes.',
        tip: 'Point toes OUT — that is the key' },
      { name: 'Reverse Lunges', duration: '40s ON / 20s REST', kcal: 7, difficulty: 'Intermediate', image: GIFS.reverseLunge,
        how: 'Stand tall. Step one foot BACK and lower the back knee toward the floor. Front thigh parallel to ground. Push through front heel to return.',
        tip: "Front knee above ankle — don't push it forward" },
      { name: 'Step-Ups', duration: '40s ON / 20s REST', kcal: 7, difficulty: 'Beginner', image: GIFS.stepUp,
        how: 'Use a sturdy step or bench. Plant one foot fully on the step, drive through the heel to stand up. Step down with control. Alternate legs.',
        tip: 'Push through the HEEL of the top foot' },
      { name: 'Glute Bridges', duration: '40s ON / 20s REST', kcal: 4, difficulty: 'Beginner', image: GIFS.gluteBridge,
        how: 'Lie on back, knees bent, feet flat near hips. Push hips up toward ceiling, squeezing glutes. Hold 1 sec, lower slowly.',
        tip: 'SQUEEZE at the top' },
      { name: 'Single-Leg Bridge', duration: '30s per leg', kcal: 5, difficulty: 'Intermediate', image: GIFS.singleLegBridge,
        how: 'Glute bridge with one leg extended straight. Drive through the planted heel to lift hips. Keep hips level — no tilting.',
        tip: 'Hips must stay SQUARE to the ceiling' },
      { name: 'Wall Sit', duration: 'Hold 40s', kcal: 5, difficulty: 'Beginner', image: GIFS.wallSit,
        how: 'Back flat against wall. Slide down until thighs parallel to floor, knees at 90°. Arms on thighs or crossed. Hold and breathe.',
        tip: "Feet flat — don't go on tiptoes" },
      { name: 'Pistol Squat', duration: '6 reps per leg', kcal: 10, difficulty: 'Advanced', image: GIFS.pistolSquat,
        how: 'Stand on one leg, other leg extended forward. Squat all the way down keeping the extended leg off the floor. Stand back up.',
        tip: 'Use a wall or chair for assistance at first' },
    ],
  },
  {
    category: 'upper', title: 'Circuit 2 — Upper Body & Core', accent: 'hsl(217 91% 60%)',
    items: [
      { name: 'Knee Push-Ups', duration: '40s ON / 20s REST', kcal: 5, difficulty: 'Beginner', image: GIFS.kneePushUp,
        how: 'Hands shoulder-width, knees on floor. Body in a straight line from head to knees. Lower chest, push back up.',
        tip: 'Hips stay in line — don\'t pike up' },
      { name: 'Push-Ups', duration: '40s ON / 20s REST', kcal: 7, difficulty: 'Intermediate', image: GIFS.pushUp,
        how: 'Hands shoulder-width apart, body in straight line head to heels. Lower chest toward floor, elbows ~45°. Push back up.',
        tip: "Don't let hips sag — flat plank body" },
      { name: 'Diamond Push-Ups', duration: '30s ON / 20s REST', kcal: 8, difficulty: 'Advanced', image: GIFS.diamondPushUp,
        how: 'Push-up with hands close together, thumbs & index fingers forming a diamond. Lower chest to hands. Triceps-dominant.',
        tip: 'Keep elbows tucked close to ribs' },
      { name: 'Decline Push-Ups', duration: '30s ON / 20s REST', kcal: 9, difficulty: 'Advanced', image: GIFS.declinePushUp,
        how: 'Feet elevated on a step or bench, hands on floor. Push-up while keeping body straight. Targets upper chest & shoulders.',
        tip: 'Higher feet = more difficulty' },
      { name: 'Pike Push-Ups', duration: '40s ON / 20s REST', kcal: 7, difficulty: 'Intermediate', image: GIFS.pikePushUp,
        how: 'Start in downward dog — hips high, body inverted V. Bend elbows to lower head toward floor between hands. Push back up.',
        tip: 'Higher hips = harder' },
      { name: 'Tricep Dips', duration: '40s ON / 20s REST', kcal: 5, difficulty: 'Beginner', image: GIFS.tricepDips,
        how: 'Sit on floor, hands behind hips, fingers forward. Lift hips off ground. Bend elbows to lower hips toward floor, push back up.',
        tip: 'Elbows pointing BACK — not out to sides' },
      { name: 'Plank Hold', duration: 'Hold 40s', kcal: 4, difficulty: 'Beginner', image: GIFS.plank,
        how: 'Forearms on floor, elbows under shoulders. Body straight from head to heels. Squeeze core and glutes. Breathe.',
        tip: 'Slow steady breathing through the hold' },
      { name: 'Side Plank', duration: '30s per side', kcal: 4, difficulty: 'Intermediate', image: GIFS.sidePlank,
        how: 'Lie on side, forearm under shoulder. Lift hips so body forms a straight line. Top arm extended toward ceiling.',
        tip: 'Drive hips UP — don\'t let them sag' },
      { name: 'Superman Hold', duration: '40s ON / 20s REST', kcal: 4, difficulty: 'Beginner', image: GIFS.superman,
        how: 'Lie face down, arms extended overhead. Lift arms, chest, and legs off floor at the same time. Hold 2–3 sec then lower.',
        tip: "Look DOWN — don't crane your neck" },
      { name: 'Bear Crawl', duration: '30s ON / 20s REST', kcal: 9, difficulty: 'Intermediate', image: GIFS.bearCrawl,
        how: 'Hands & knees on floor, knees hovering just off the ground. Crawl forward moving opposite hand and foot together. Keep hips low.',
        tip: 'Knees stay 2 inches OFF the floor' },
    ],
  },
  {
    category: 'fatburn', title: 'Circuit 3 — Full Body Fat Burn', accent: 'hsl(0 84% 60%)',
    items: [
      { name: 'Burpees', duration: '40s ON / 20s REST', kcal: 12, difficulty: 'Advanced', image: GIFS.burpees,
        how: 'Stand → squat hands on floor → jump feet back to plank → push-up (optional) → jump feet forward → jump up arms overhead.',
        tip: 'Skip the jump as a beginner — just stand up' },
      { name: 'Mountain Climbers', duration: '40s ON / 20s REST', kcal: 10, difficulty: 'Intermediate', image: GIFS.mountainClimbers,
        how: "High plank, hands under shoulders. Drive one knee toward chest, quickly switch in a running motion. Keep hips level.",
        tip: 'Faster = more cardio' },
      { name: 'Jump Squats', duration: '40s ON / 20s REST', kcal: 11, difficulty: 'Intermediate', image: GIFS.jumpSquat,
        how: 'Regular squat, then explode upward into a jump. Land softly with bent knees and go straight into the next squat.',
        tip: 'Land toe-heel, softly' },
      { name: 'Tuck Jumps', duration: '30s ON / 30s REST', kcal: 12, difficulty: 'Advanced', image: GIFS.tuckJump,
        how: 'Jump straight up and pull both knees toward your chest at the top. Land softly, immediately go into the next jump.',
        tip: 'Knees UP — not forward kicks' },
      { name: 'Skater Hops', duration: '40s ON / 20s REST', kcal: 9, difficulty: 'Intermediate', image: GIFS.skaterHops,
        how: 'Leap laterally from one foot to the other like a speed skater. Touch the back foot lightly behind for balance.',
        tip: 'Land soft — bend the knee on impact' },
      { name: 'Lateral Shuffles', duration: '40s ON / 20s REST', kcal: 8, difficulty: 'Beginner', image: GIFS.lateralShuffle,
        how: 'Slight squat, stay low. Shuffle 3 steps right, tap foot, shuffle 3 steps left, tap. Stay in the athletic low position.',
        tip: "Don't stand up between shuffles" },
      { name: 'Squat to Kick', duration: '40s ON / 20s REST', kcal: 8, difficulty: 'Beginner', image: GIFS.squatKick,
        how: 'Do a squat, as you stand kick one leg out front or side. Alternate legs.',
        tip: "Keep standing leg slightly bent" },
      { name: 'Box Jumps', duration: '30s ON / 30s REST', kcal: 11, difficulty: 'Advanced', image: GIFS.boxJump,
        how: 'Stand in front of a sturdy box/bench. Swing arms back, explode up and land softly on top with bent knees. Step down.',
        tip: 'Always step DOWN — never jump down' },
    ],
  },
  {
    category: 'core', title: 'Circuit 4 — Core Finisher', accent: 'hsl(280 70% 60%)',
    items: [
      { name: 'Crunches', duration: '30 sec', kcal: 4, difficulty: 'Beginner', image: GIFS.crunches,
        how: "Lie on back, knees bent, hands behind head (don't pull neck). Curl shoulders off floor toward knees. Lower slowly.",
        tip: 'Exhale UP, inhale DOWN' },
      { name: 'Bicycle Crunches', duration: '30 sec', kcal: 5, difficulty: 'Beginner', image: GIFS.bicycleCrunches,
        how: 'Lie on back, hands behind head. Bring right elbow to left knee while right leg extends. Switch — left elbow to right knee.',
        tip: 'SLOW & controlled beats fast' },
      { name: 'Leg Raises', duration: '30 sec', kcal: 4, difficulty: 'Intermediate', image: GIFS.legRaise,
        how: 'Lie flat on back, hands under hips. Legs straight. Raise both legs to 90°, then lower SLOWLY without touching floor.',
        tip: 'Press lower back INTO the floor' },
      { name: 'Flutter Kicks', duration: '30 sec', kcal: 5, difficulty: 'Intermediate', image: GIFS.flutterKicks,
        how: 'Lie on back, hands under glutes. Lift legs a few inches off the floor and rapidly flutter them up and down in small ranges.',
        tip: 'Keep legs as STRAIGHT as possible' },
      { name: 'Russian Twists', duration: '30 sec', kcal: 4, difficulty: 'Beginner', image: GIFS.russianTwist,
        how: 'Sit on floor, knees bent, feet lifted or on floor. Lean back slightly. Clasp hands and twist torso right, then left.',
        tip: 'Feet up = harder' },
      { name: 'V-Ups', duration: '30 sec', kcal: 6, difficulty: 'Advanced', image: GIFS.vUp,
        how: 'Lie flat. Simultaneously raise straight legs and torso, reaching hands toward toes to form a V. Lower with control.',
        tip: 'Touch your TOES at the top' },
      { name: 'Hollow Hold', duration: 'Hold 30s', kcal: 5, difficulty: 'Advanced', image: GIFS.hollowHold,
        how: 'Lie on back. Press low back into floor. Lift shoulders and legs off ground, arms overhead. Hold the banana shape.',
        tip: 'Lower back GLUED to the floor' },
      { name: 'Dead Bug Hold', duration: '30 sec', kcal: 3, difficulty: 'Beginner', image: GIFS.deadBug,
        how: 'Lie on back. Arms up toward ceiling, knees bent 90°. Slowly lower right arm overhead AND left leg down. Switch.',
        tip: 'Press lower back FLAT' },
    ],
  },
];

const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  Intermediate: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
  Advanced: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
};


export default function CalisthenicsWorkout() {
  const { addWorkoutEntry, selectedDate } = useAppState();
  const [active, setActive] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<string>('all');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');

  const visible = (filter === 'all' ? circuits : circuits.filter(c => c.category === filter))
    .map(c => ({
      ...c,
      items: diffFilter === 'all' ? c.items : c.items.filter(i => i.difficulty === diffFilter),
    }))
    .filter(c => c.items.length > 0);

  const stats = useMemo(() => {
    const all = circuits.flatMap((c, ci) => c.items.map((ex, ei) => ({ key: `${c.category}-${ei}`, kcal: ex.kcal })));
    const doneItems = all.filter(a => completed[a.key]);
    return {
      total: all.length,
      done: doneItems.length,
      totalKcal: all.reduce((s, a) => s + a.kcal, 0),
      doneKcal: doneItems.reduce((s, a) => s + a.kcal, 0),
    };
  }, [completed]);

  const toggleComplete = (key: string, ex: Exercise, circuitTitle: string) => {
    const isCompleting = !completed[key];
    setCompleted(prev => ({ ...prev, [key]: isCompleting }));

    if (isCompleting) {
      const entry: WorkoutEntry = {
        id: crypto.randomUUID(),
        exercise: {
          id: `calisthenics-${key}`,
          name: ex.name,
          category: 'HIIT',
          caloriesPer30Min: ex.kcal * 30,
          unit: 'minutes',
          defaultDuration: 1,
          icon: '💪',
        } as any,
        duration: 1,
        caloriesBurned: ex.kcal,
      };
      addWorkoutEntry(formatDate(selectedDate), entry);
      toast.success(`+${ex.kcal} kcal · ${ex.name}`, {
        description: `Logged to ${circuitTitle}`,
        duration: 2000,
      });
    }
  };

  const resetSession = () => {
    setCompleted({});
    toast('Session reset', { description: 'All exercises marked incomplete' });
  };

  const progressPct = stats.total ? (stats.done / stats.total) * 100 : 0;

  return (
    <div className="space-y-5">
      {/* Stats hero */}
      <Card className="overflow-hidden border-border shadow-card">
        <div className="bg-gradient-to-br from-primary/95 via-primary to-info p-6 sm:p-8 text-primary-foreground">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">No Equipment · 45 min</p>
              <h2 className="text-3xl sm:text-4xl font-display">Calisthenics Workout</h2>
              <p className="text-sm opacity-90 mt-1 max-w-md">
                Full-body bodyweight routine. Tick each move as you finish — calories auto-log to your daily burn.
              </p>
            </div>
            <Button size="sm" variant="secondary" onClick={resetSession} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-white/15 backdrop-blur p-3">
              <div className="text-xs opacity-80 font-semibold">Completed</div>
              <div className="text-2xl font-display font-bold mt-0.5">
                {stats.done}<span className="text-sm opacity-70">/{stats.total}</span>
              </div>
            </div>
            <div className="rounded-xl bg-white/15 backdrop-blur p-3">
              <div className="text-xs opacity-80 font-semibold flex items-center gap-1"><Flame className="h-3 w-3" />Burned</div>
              <div className="text-2xl font-display font-bold mt-0.5">{stats.doneKcal}<span className="text-sm opacity-70"> kcal</span></div>
            </div>
            <div className="rounded-xl bg-white/15 backdrop-blur p-3">
              <div className="text-xs opacity-80 font-semibold flex items-center gap-1"><Trophy className="h-3 w-3" />Max</div>
              <div className="text-2xl font-display font-bold mt-0.5">{stats.totalKcal}<span className="text-sm opacity-70"> kcal</span></div>
            </div>
          </div>

          <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="border-t border-border">
          <div className="flex flex-wrap gap-2 px-4 sm:px-6 pt-4">
            {[
              { id: 'all', label: 'All circuits' },
              ...circuits.map(c => ({ id: c.category, label: c.title.replace(/Circuit \d+ — /, '') })),
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  filter === f.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 px-4 sm:px-6 py-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Level:</span>
            {(['all', ...DIFFICULTIES] as const).map(d => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all ${
                  diffFilter === d
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground'
                }`}
              >
                {d === 'all' ? 'All levels' : d}
              </button>
            ))}
          </div>
        </div>
      </Card>


      {/* Circuits */}
      {visible.map((circuit) => (
        <Card key={circuit.category} className="overflow-hidden border-border shadow-card">
          <div
            className="px-5 sm:px-6 py-4 border-b border-border flex items-center gap-3"
            style={{ background: `linear-gradient(90deg, ${circuit.accent}15 0%, transparent 60%)` }}
          >
            <div className="h-2 w-2 rounded-full" style={{ background: circuit.accent }} />
            <h3 className="font-display text-lg text-foreground flex-1">{circuit.title}</h3>
            <span className="text-xs text-muted-foreground font-medium">{circuit.items.length} exercises</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-5">
            {circuit.items.map((ex, ei) => {
              const key = `${circuit.category}-${ei}`;
              const isOpen = active === key;
              const isDone = !!completed[key];
              const showFallback = !ex.image || imgErrors[key];

              return (
                <motion.div
                  key={ei}
                  layout
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  className={`rounded-xl overflow-hidden bg-card border transition-all ${
                    isOpen ? 'sm:col-span-2 lg:col-span-3' : ''
                  } ${isDone ? 'border-primary/50 ring-1 ring-primary/30' : 'border-border hover:border-primary/30'}`}
                >
                  <div className={isOpen ? 'sm:flex' : ''}>
                    <button
                      onClick={() => setActive(isOpen ? null : key)}
                      className={`relative block ${isOpen ? 'sm:w-1/2 h-56 sm:h-auto' : 'h-44'} w-full bg-secondary/40 group`}
                      aria-label={`View ${ex.name} instructions`}
                    >
                      {showFallback ? (
                        <div className="h-full w-full flex items-center justify-center text-sm font-semibold text-muted-foreground">
                          {ex.name}
                        </div>
                      ) : (
                        <img
                          src={ex.image}
                          alt={`${ex.name} demonstration`}
                          loading="lazy"
                          onError={() => setImgErrors(p => ({ ...p, [key]: true }))}
                          className="h-full w-full object-contain bg-white p-2 group-hover:scale-105 transition-transform"
                        />
                      )}
                      <div
                        className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold bg-card/95 backdrop-blur shadow-sm flex items-center gap-1"
                        style={{ color: circuit.accent }}
                      >
                        <Flame className="h-3 w-3" /> {ex.kcal} kcal
                      </div>
                    </button>

                    <div className={`p-4 ${isOpen ? 'sm:w-1/2' : ''} flex flex-col`}>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <button
                          onClick={() => toggleComplete(key, ex, circuit.title)}
                          className="flex items-center gap-2 text-left flex-1 min-w-0"
                          aria-label={isDone ? `Mark ${ex.name} incomplete` : `Mark ${ex.name} complete`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground shrink-0 hover:text-primary transition-colors" />
                          )}
                          <h4 className={`font-bold text-sm text-foreground leading-tight ${isDone ? 'line-through opacity-60' : ''}`}>
                            {ex.name}
                          </h4>
                        </button>
                        <button onClick={() => setActive(isOpen ? null : key)} aria-label="Toggle details">
                          <ChevronDown
                            className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 transition-transform"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                          />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-[11px] font-semibold text-muted-foreground">⏱ {ex.duration}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${DIFFICULTY_STYLES[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                      </div>


                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-2"
                          >
                            <div className="rounded-lg p-3 bg-secondary/60">
                              <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-foreground">How to do it</div>
                              <p className="text-xs leading-relaxed text-muted-foreground m-0">{ex.how}</p>
                            </div>
                            <div className="rounded-lg p-3 border-l-2" style={{ background: `${circuit.accent}10`, borderColor: circuit.accent }}>
                              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: circuit.accent }}>Pro tip</div>
                              <p className="text-xs text-foreground/85 m-0">{ex.tip}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      ))}
    </div>
  );
}
