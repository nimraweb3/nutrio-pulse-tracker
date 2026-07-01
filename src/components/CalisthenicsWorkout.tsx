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
  /** MET value (Compendium of Physical Activities, Ainsworth et al. 2011) */
  met: number;
  /** Active minutes for ONE set of this exercise (excludes rest) */
  minutes: number;
  difficulty: Difficulty;
}
interface Circuit {
  category: string;
  title: string;
  accent: string;
  items: Exercise[];
}

/**
 * Accurate calorie burn using the standard MET formula:
 *   kcal = MET × bodyWeight(kg) × time(hours)
 * Source: Ainsworth BE et al., "2011 Compendium of Physical Activities".
 * This is the same formula used by ACSM, Mayo Clinic and Harvard Health.
 */
export function kcalFor(ex: Pick<Exercise, 'met' | 'minutes'>, weightKg: number): number {
  return Math.round(ex.met * weightKg * (ex.minutes / 60));
}

const SP = (path: string) => `https://spotebi.com/wp-content/uploads/${path}`;
const FE = (path: string) => `https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/${path}`;
const GIFS = {
  kneeCircles: FE('Knee_Circles/0.jpg'),
  hugKnees: FE('Hug_Knees_To_Chest/0.jpg'),
  armCircles: FE('Arm_Circles/0.jpg'),
  inchworm: FE('Inchworm/0.jpg'),
  squat: FE('Bodyweight_Squat/0.jpg'),
  reverseLunge: FE('Crossover_Reverse_Lunge/0.jpg'),
  gluteBridge: FE('Butt_Lift_Bridge/0.jpg'),
  singleLegBridge: FE('Single_Leg_Glute_Bridge/0.jpg'),
  pushUp: FE('Pushups/0.jpg'),
  tricepDips: FE('Bench_Dips/0.jpg'),
  plank: FE('Plank/0.jpg'),
  superman: FE('Superman/0.jpg'),
  mountainClimbers: FE('Mountain_Climbers/0.jpg'),
  jumpSquat: FE('Freehand_Jump_Squat/0.jpg'),
  kneeTuckJump: FE('Knee_Tuck_Jump/0.jpg'),
  lateralShuffle: FE('Side_to_Side_Box_Shuffle/0.jpg'),
  boxJump: FE('Box_Jump_Multiple_Response/0.jpg'),
  crunches: FE('Crunches/0.jpg'),
  bicycleCrunches: FE('Elbow_to_Knee/0.jpg'),
  legRaise: FE('Flat_Bench_Lying_Leg_Raise/0.jpg'),
  russianTwist: FE('Russian_Twist/0.jpg'),
  deadBug: FE('Dead_Bug/0.jpg'),
  flutterKicks: FE('Flutter_Kicks/0.jpg'),
};

// MET values sourced from the 2011 Compendium of Physical Activities (Ainsworth et al.).
// `minutes` = active work time for ONE set (rest periods burn ~1 MET and are excluded).
const circuits: Circuit[] = [
  {
    category: 'warmup', title: 'Warm Up', accent: 'hsl(38 92% 50%)',
    items: [
      { name: 'Arm Circles', duration: '30s each way', met: 2.8, minutes: 1, difficulty: 'Beginner', image: GIFS.armCircles,
        how: 'Extend arms out to sides at shoulder height. Make big circles forward for 30 sec, then reverse. Keep shoulders relaxed.',
        tip: 'Make the circles as BIG as possible' },
      { name: 'Knee Circles', duration: '30s each way', met: 2.8, minutes: 1, difficulty: 'Beginner', image: GIFS.kneeCircles,
        how: 'Stand with feet close and knees slightly bent. Place hands on knees and make slow circles both directions to warm the joints.',
        tip: 'Keep the movement slow and controlled' },
      { name: 'Hug Knees to Chest', duration: '8 reps each side', met: 2.8, minutes: 1, difficulty: 'Beginner', image: GIFS.hugKnees,
        how: 'Stand tall, pull one knee toward your chest, pause briefly, then switch sides. Keep your torso upright.',
        tip: 'Use this as a gentle hip warm-up' },
      { name: 'Inchworm', duration: '8 reps', met: 4.0, minutes: 1, difficulty: 'Intermediate', image: GIFS.inchworm,
        how: 'Stand tall, hinge forward and walk hands out to a plank. Walk feet to hands. Repeat. Mobilises hamstrings and shoulders.',
        tip: 'Keep legs as straight as comfortable' },
    ],
  },
  {
    category: 'lower', title: 'Circuit 1 — Lower Body', accent: 'hsl(158 64% 40%)',
    items: [
      { name: 'Squats', duration: '40s ON / 20s REST', met: 5.0, minutes: 0.67, difficulty: 'Beginner', image: GIFS.squat,
        how: 'Feet shoulder-width apart, toes slightly out. Push hips back and bend knees like sitting on a chair. Keep chest up, heels on floor.',
        tip: 'Knees track over toes — never cave inward' },
      { name: 'Reverse Lunges', duration: '40s ON / 20s REST', met: 5.5, minutes: 0.67, difficulty: 'Intermediate', image: GIFS.reverseLunge,
        how: 'Stand tall. Step one foot BACK and lower the back knee toward the floor. Front thigh parallel to ground. Push through front heel to return.',
        tip: "Front knee above ankle — don't push it forward" },
      { name: 'Glute Bridges', duration: '40s ON / 20s REST', met: 3.8, minutes: 0.67, difficulty: 'Beginner', image: GIFS.gluteBridge,
        how: 'Lie on back, knees bent, feet flat near hips. Push hips up toward ceiling, squeezing glutes. Hold 1 sec, lower slowly.',
        tip: 'SQUEEZE at the top' },
      { name: 'Single-Leg Bridge', duration: '30s per leg', met: 4.0, minutes: 1, difficulty: 'Intermediate', image: GIFS.singleLegBridge,
        how: 'Glute bridge with one leg extended straight. Drive through the planted heel to lift hips. Keep hips level — no tilting.',
        tip: 'Hips must stay SQUARE to the ceiling' },
    ],
  },
  {
    category: 'upper', title: 'Circuit 2 — Upper Body & Core', accent: 'hsl(217 91% 60%)',
    items: [
      { name: 'Push-Ups', duration: '40s ON / 20s REST', met: 8.0, minutes: 0.67, difficulty: 'Intermediate', image: GIFS.pushUp,
        how: 'Hands shoulder-width apart, body in straight line head to heels. Lower chest toward floor, elbows ~45°. Push back up.',
        tip: "Don't let hips sag — flat plank body" },
      { name: 'Tricep Dips', duration: '40s ON / 20s REST', met: 5.0, minutes: 0.67, difficulty: 'Beginner', image: GIFS.tricepDips,
        how: 'Sit on floor, hands behind hips, fingers forward. Lift hips off ground. Bend elbows to lower hips toward floor, push back up.',
        tip: 'Elbows pointing BACK — not out to sides' },
      { name: 'Plank Hold', duration: 'Hold 40s', met: 3.5, minutes: 0.67, difficulty: 'Beginner', image: GIFS.plank,
        how: 'Forearms on floor, elbows under shoulders. Body straight from head to heels. Squeeze core and glutes. Breathe.',
        tip: 'Slow steady breathing through the hold' },
      { name: 'Superman Hold', duration: '40s ON / 20s REST', met: 3.5, minutes: 0.67, difficulty: 'Beginner', image: GIFS.superman,
        how: 'Lie face down, arms extended overhead. Lift arms, chest, and legs off floor at the same time. Hold 2–3 sec then lower.',
        tip: "Look DOWN — don't crane your neck" },
    ],
  },
  {
    category: 'fatburn', title: 'Circuit 3 — Full Body Fat Burn', accent: 'hsl(0 84% 60%)',
    items: [
      { name: 'Mountain Climbers', duration: '40s ON / 20s REST', met: 8.0, minutes: 0.67, difficulty: 'Intermediate', image: GIFS.mountainClimbers,
        how: "High plank, hands under shoulders. Drive one knee toward chest, quickly switch in a running motion. Keep hips level.",
        tip: 'Faster = more cardio' },
      { name: 'Jump Squats', duration: '40s ON / 20s REST', met: 8.5, minutes: 0.67, difficulty: 'Intermediate', image: GIFS.jumpSquat,
        how: 'Regular squat, then explode upward into a jump. Land softly with bent knees and go straight into the next squat.',
        tip: 'Land toe-heel, softly' },
      { name: 'Lateral Shuffles', duration: '40s ON / 20s REST', met: 7.0, minutes: 0.67, difficulty: 'Beginner', image: GIFS.lateralShuffle,
        how: 'Slight squat, stay low. Shuffle 3 steps right, tap foot, shuffle 3 steps left, tap. Stay in the athletic low position.',
        tip: "Don't stand up between shuffles" },
      { name: 'Knee Tuck Jumps', duration: '30s ON / 30s REST', met: 8.0, minutes: 0.5, difficulty: 'Advanced', image: GIFS.kneeTuckJump,
        how: 'Jump upward and bring knees toward chest. Land softly with bent knees, reset, then repeat.',
        tip: 'Land softly and stop if your knees feel stressed' },
      { name: 'Box Jumps', duration: '30s ON / 30s REST', met: 8.0, minutes: 0.5, difficulty: 'Advanced', image: GIFS.boxJump,
        how: 'Stand in front of a sturdy box/bench. Swing arms back, explode up and land softly on top with bent knees. Step down.',
        tip: 'Always step DOWN — never jump down' },
    ],
  },
  {
    category: 'core', title: 'Circuit 4 — Core Finisher', accent: 'hsl(280 70% 60%)',
    items: [
      { name: 'Crunches', duration: '30 sec', met: 3.8, minutes: 0.5, difficulty: 'Beginner', image: GIFS.crunches,
        how: "Lie on back, knees bent, hands behind head (don't pull neck). Curl shoulders off floor toward knees. Lower slowly.",
        tip: 'Exhale UP, inhale DOWN' },
      { name: 'Bicycle Crunches', duration: '30 sec', met: 4.5, minutes: 0.5, difficulty: 'Beginner', image: GIFS.bicycleCrunches,
        how: 'Lie on back, hands behind head. Bring right elbow to left knee while right leg extends. Switch — left elbow to right knee.',
        tip: 'SLOW & controlled beats fast' },
      { name: 'Leg Raises', duration: '30 sec', met: 4.0, minutes: 0.5, difficulty: 'Intermediate', image: GIFS.legRaise,
        how: 'Lie flat on back, hands under hips. Legs straight. Raise both legs to 90°, then lower SLOWLY without touching floor.',
        tip: 'Press lower back INTO the floor' },
      { name: 'Flutter Kicks', duration: '30 sec', met: 4.5, minutes: 0.5, difficulty: 'Intermediate', image: GIFS.flutterKicks,
        how: 'Lie on back, hands under glutes. Lift legs a few inches off the floor and rapidly flutter them up and down in small ranges.',
        tip: 'Keep legs as STRAIGHT as possible' },
      { name: 'Russian Twists', duration: '30 sec', met: 4.0, minutes: 0.5, difficulty: 'Beginner', image: GIFS.russianTwist,
        how: 'Sit on floor, knees bent, feet lifted or on floor. Lean back slightly. Clasp hands and twist torso right, then left.',
        tip: 'Feet up = harder' },
      { name: 'Dead Bug Hold', duration: '30 sec', met: 3.0, minutes: 0.5, difficulty: 'Beginner', image: GIFS.deadBug,
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
  const { profile, addWorkoutEntry, selectedDate } = useAppState();
  const weight = profile.weight || 70;
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
    const all = circuits.flatMap((c) => c.items.map((ex, ei) => ({ key: `${c.category}-${ei}`, kcal: kcalFor(ex, weight) })));
    const doneItems = all.filter(a => completed[a.key]);
    return {
      total: all.length,
      done: doneItems.length,
      totalKcal: all.reduce((s, a) => s + a.kcal, 0),
      doneKcal: doneItems.reduce((s, a) => s + a.kcal, 0),
    };
  }, [completed, weight]);

  const toggleComplete = (key: string, ex: Exercise, circuitTitle: string) => {
    const isCompleting = !completed[key];
    setCompleted(prev => ({ ...prev, [key]: isCompleting }));

    if (isCompleting) {
      const kcal = kcalFor(ex, weight);
      const entry: WorkoutEntry = {
        id: crypto.randomUUID(),
        exercise: {
          id: `calisthenics-${key}`,
          name: ex.name,
          category: 'HIIT',
          caloriesPer30Min: Math.round(ex.met * weight * 0.5),
          unit: 'minutes',
          defaultDuration: ex.minutes,
          icon: '💪',
        } as any,
        duration: ex.minutes,
        caloriesBurned: kcal,
      };
      addWorkoutEntry(formatDate(selectedDate), entry);
      toast.success(`+${kcal} kcal · ${ex.name}`, {
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
      {/* Stats hero — MFP style: clean white card, blue numbers, progress bar */}
      <Card className="overflow-hidden border-border shadow-card">
        <div className="px-5 sm:px-7 py-5 sm:py-6 border-b border-border">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary mb-1.5">No equipment · 45 min · Full body</p>
              <h2 className="text-2xl sm:text-3xl font-display text-foreground">Calisthenics Workout</h2>
              <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                Check off each move as you finish it. Calories add to your daily burn.
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={resetSession} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </Button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-lg border border-border bg-secondary/40 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Completed</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-primary mt-1 leading-none">
                {stats.done}<span className="text-base font-bold text-muted-foreground">/{stats.total}</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Flame className="h-3 w-3" />Burned</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-accent mt-1 leading-none">
                {stats.doneKcal}<span className="text-sm font-bold text-muted-foreground"> kcal</span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-secondary/40 px-3 py-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Trophy className="h-3 w-3" />Goal</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-foreground mt-1 leading-none">
                {stats.totalKcal}<span className="text-sm font-bold text-muted-foreground"> kcal</span>
              </div>
            </div>
          </div>

          <div className="mt-4 h-1.5 rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            />
          </div>
        </div>

        {/* Filter chips */}
        <div className="bg-secondary/30">
          <div className="flex flex-wrap gap-1.5 px-4 sm:px-6 pt-3">
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
          <div className="flex flex-wrap items-center gap-1.5 px-4 sm:px-6 py-3">
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


      {/* Circuits — MFP-style list rows */}
      {visible.map((circuit) => {
        const circuitDone = circuit.items.filter((_, i) => completed[`${circuit.category}-${i}`]).length;
        return (
        <Card key={circuit.category} className="overflow-hidden border-border shadow-card">
          <div className="px-5 sm:px-6 py-3.5 border-b border-border flex items-center gap-3 bg-secondary/30">
            <div className="h-8 w-1 rounded-full" style={{ background: circuit.accent }} />
            <div className="flex-1 min-w-0">
              <h3 className="font-display font-extrabold text-base text-foreground leading-tight">{circuit.title}</h3>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">
                {circuitDone} of {circuit.items.length} complete
              </p>
            </div>
            <span className="text-[11px] text-muted-foreground font-semibold tabular-nums">
              {circuit.items.reduce((s, e) => s + kcalFor(e, weight), 0)} kcal
            </span>
          </div>

          <ul className="divide-y divide-border">
            {circuit.items.map((ex, ei) => {
              const key = `${circuit.category}-${ei}`;
              const isOpen = active === key;
              const isDone = !!completed[key];
              const showFallback = !ex.image || imgErrors[key];

              return (
                <li key={ei} className={isDone ? 'bg-primary/[0.03]' : ''}>
                  <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3">
                    {/* Check */}
                    <button
                      onClick={() => toggleComplete(key, ex, circuit.title)}
                      className="shrink-0"
                      aria-label={isDone ? `Mark ${ex.name} incomplete` : `Mark ${ex.name} complete`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      ) : (
                        <Circle className="h-6 w-6 text-muted-foreground/50 hover:text-primary transition-colors" />
                      )}
                    </button>

                    {/* Thumb */}
                    <button
                      onClick={() => setActive(isOpen ? null : key)}
                      className="shrink-0 h-14 w-14 rounded-md overflow-hidden bg-secondary/60 border border-border"
                      aria-label={`View ${ex.name} instructions`}
                    >
                      {showFallback ? (
                        <div className="h-full w-full flex items-center justify-center text-[9px] font-bold text-muted-foreground text-center px-1 leading-tight">
                          {ex.name}
                        </div>
                      ) : (
                        <img
                          src={ex.image}
                          alt={`${ex.name} demonstration`}
                          loading="lazy"
                          onError={() => setImgErrors(p => ({ ...p, [key]: true }))}
                          className="h-full w-full object-contain bg-white"
                        />
                      )}
                    </button>

                    {/* Name + meta */}
                    <button
                      onClick={() => setActive(isOpen ? null : key)}
                      className="flex-1 min-w-0 text-left"
                    >
                      <div className={`font-semibold text-sm text-foreground leading-tight ${isDone ? 'line-through opacity-60' : ''}`}>
                        {ex.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] text-muted-foreground font-medium">{ex.duration}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${DIFFICULTY_STYLES[ex.difficulty]}`}>
                          {ex.difficulty}
                        </span>
                      </div>
                    </button>

                    {/* kcal */}
                    <div className="shrink-0 text-right">
                      <div className="text-base font-display font-extrabold text-foreground tabular-nums leading-none">{kcalFor(ex, weight)}</div>
                      <div className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground mt-1">kcal</div>
                    </div>

                    <button onClick={() => setActive(isOpen ? null : key)} aria-label="Toggle details" className="shrink-0 p-1 -mr-1">
                      <ChevronDown
                        className="h-4 w-4 text-muted-foreground transition-transform"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 pt-1 grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4">
                          <div className="h-40 sm:h-full rounded-md overflow-hidden bg-white border border-border">
                            {!showFallback && (
                              <img src={ex.image} alt="" className="h-full w-full object-contain p-1" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="rounded-md p-3 bg-secondary/60 border border-border">
                              <div className="text-[10px] font-bold uppercase tracking-wider mb-1 text-foreground">How to do it</div>
                              <p className="text-xs leading-relaxed text-muted-foreground m-0">{ex.how}</p>
                            </div>
                            <div className="rounded-md p-3 border-l-[3px]" style={{ background: `${circuit.accent}10`, borderColor: circuit.accent }}>
                              <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: circuit.accent }}>Tip</div>
                              <p className="text-xs text-foreground/85 m-0">{ex.tip}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Card>
      );})}
    </div>
  );
}
