import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Heart, Flower2, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Exercise {
  name: string;
  duration: string;
  image: string;
  emoji: string;
  how: string;
  tip: string;
}
interface Circuit {
  category: string;
  emoji: string;
  title: string;
  color: string;
  bg: string;
  items: Exercise[];
}

// Verified spotebi GIF URLs (each one manually resolved to its actual path)
const SP = (path: string) => `https://spotebi.com/wp-content/uploads/${path}`;
const GIFS = {
  jumpingJacks: SP('2014/10/jumping-jacks-exercise-illustration.gif'),
  highKnees: SP('2014/10/high-knees-exercise-illustration.gif'),
  armCircles: SP('2014/10/arm-circles-exercise-illustration.gif'),
  squat: SP('2014/10/squat-exercise-illustration.gif'),
  sumoSquat: SP('2015/05/sumo-squat-exercise-illustration-spotebi.gif'),
  reverseLunge: SP('2017/06/reverse-lunge-medicine-ball-overhead-press-exercise-illustration-spotebi.gif'),
  gluteBridge: SP('2015/01/glute-bridge-exercise-illustration-spotebi.gif'),
  wallSit: SP('2015/05/wall-sit-exercise-illustration.gif'),
  pushUp: SP('2014/10/push-up-exercise-illustration.gif'),
  pikePushUp: SP('2016/03/pike-push-up-exercise-illustration-spotebi.gif'),
  tricepDips: SP('2015/04/tricep-dips-exercise-illustration-spotebi.gif'),
  plank: SP('2014/10/plank-exercise-illustration.gif'),
  superman: SP('2016/02/superman-exercise-illustration-spotebi.gif'),
  burpees: SP('2014/10/burpees-exercise-illustration.gif'),
  mountainClimbers: SP('2014/10/mountain-climbers-exercise-illustration-spotebi.gif'),
  jumpSquat: SP('2015/08/jump-squat-exercise-illustration.gif'),
  squatKick: SP('2015/04/squat-kickback-exercise-illustration-spotebi.gif'),
  lateralShuffle: '', // no good match — falls back to emoji card
  crunches: SP('2014/10/crunches-exercise-illustration.gif'),
  bicycleCrunches: SP('2014/10/bicycle-crunches-exercise-illustration.gif'),
  legRaise: SP('2014/10/straight-leg-raise-exercise-illustration.gif'),
  russianTwist: SP('2015/04/russian-twist-exercise-illustration.gif'),
  deadBug: SP('2015/05/dead-bug-exercise-illustration.gif'),
};

const exercises: Circuit[] = [
  {
    category: 'warmup', emoji: '🌷', title: 'Warm Up',
    color: 'hsl(335 78% 65%)', bg: 'hsl(335 90% 96%)',
    items: [
      { name: 'Jumping Jacks', duration: '1 min', emoji: '🤸‍♀️', image: GIFS.jumpingJacks,
        how: 'Stand with feet together, arms at sides. Jump feet out wide while raising arms overhead. Jump back to start. Keep rhythm steady and breathe!',
        tip: 'Land softly on the balls of your feet' },
      { name: 'High Knees', duration: '1 min', emoji: '🏃‍♀️', image: GIFS.highKnees,
        how: 'Run in place, lifting knees to hip height with each step. Pump arms for balance. Stay light on your toes and keep core tight.',
        tip: 'Drive knees UP — not forward' },
      { name: 'Arm Circles', duration: '30s each way', emoji: '💁‍♀️', image: GIFS.armCircles,
        how: 'Extend arms out to sides at shoulder height. Make big circles forward for 30 sec, then reverse. Keep shoulders relaxed.',
        tip: 'Make the circles as BIG as possible' },
    ],
  },
  {
    category: 'lower', emoji: '💖', title: 'Circuit 1 — Lower Body',
    color: 'hsl(340 80% 60%)', bg: 'hsl(340 90% 96%)',
    items: [
      { name: 'Squats', duration: '40s ON / 20s REST', emoji: '🍑', image: GIFS.squat,
        how: 'Feet shoulder-width apart, toes slightly out. Push hips back and bend knees like sitting on a chair. Keep chest up, heels on floor. Lower until thighs parallel, then push back up.',
        tip: 'Knees track over toes — never cave inward' },
      { name: 'Sumo Squats', duration: '40s ON / 20s REST', emoji: '🌺', image: GIFS.sumoSquat,
        how: 'Feet wider than shoulder-width, toes pointing outward at 45°. Lower straight down, keeping back straight. Targets inner thighs and glutes.',
        tip: 'Point toes OUT — that is the key!' },
      { name: 'Reverse Lunges', duration: '40s ON / 20s REST', emoji: '🦩', image: GIFS.reverseLunge,
        how: 'Stand tall. Step one foot BACK and lower the back knee toward the floor. Front thigh parallel to ground. Push through front heel to return. Alternate legs.',
        tip: "Front knee above ankle — don't push it forward" },
      { name: 'Glute Bridges', duration: '40s ON / 20s REST', emoji: '🌸', image: GIFS.gluteBridge,
        how: 'Lie on back, knees bent, feet flat on floor near hips. Push hips up toward ceiling, squeezing glutes. Hold 1 sec, lower slowly.',
        tip: "SQUEEZE at the top — that's the magic" },
      { name: 'Wall Sit', duration: 'Hold 40s', emoji: '🧘‍♀️', image: GIFS.wallSit,
        how: 'Back flat against wall. Slide down until thighs parallel to floor, knees at 90°. Arms on thighs or crossed. HOLD and breathe!',
        tip: "Feet flat on floor — don't go on tiptoes" },
    ],
  },
  {
    category: 'upper', emoji: '🦋', title: 'Circuit 2 — Upper Body & Core',
    color: 'hsl(280 70% 65%)', bg: 'hsl(280 80% 96%)',
    items: [
      { name: 'Push-Ups', duration: '40s ON / 20s REST', emoji: '💪', image: GIFS.pushUp,
        how: 'Hands shoulder-width apart, body in straight line head to heels. Lower chest toward floor, elbows ~45°. Push back up. Knees on floor is TOTALLY FINE for beginners!',
        tip: "Don't let hips sag — flat plank body!" },
      { name: 'Pike Push-Ups', duration: '40s ON / 20s REST', emoji: '🧚‍♀️', image: GIFS.pikePushUp,
        how: 'Start in downward dog — hips high, body inverted V. Bend elbows to lower head toward floor between hands. Push back up. Targets shoulders!',
        tip: 'Higher hips = harder. Start lower if needed' },
      { name: 'Tricep Dips', duration: '40s ON / 20s REST', emoji: '💗', image: GIFS.tricepDips,
        how: "Sit on floor, hands behind hips, fingers forward. Lift hips off ground. Bend elbows to lower hips toward floor (don't touch!), push back up.",
        tip: 'Elbows pointing BACK — not out to sides' },
      { name: 'Plank Hold', duration: 'Hold 40s', emoji: '🪷', image: GIFS.plank,
        how: 'Forearms on floor, elbows under shoulders. Body straight from head to heels. Squeeze core, glutes, everything! Look at floor. BREATHE.',
        tip: 'Slow steady breathing through the hold' },
      { name: 'Superman Hold', duration: '40s ON / 20s REST', emoji: '🦋', image: GIFS.superman,
        how: 'Lie face down, arms extended overhead. Lift arms, chest, and legs off floor at the same time. Hold 2–3 sec then lower. Strengthens your back chain.',
        tip: "Look DOWN — don't crane your neck" },
    ],
  },
  {
    category: 'fatburn', emoji: '🌸', title: 'Circuit 3 — Full Body Fat Burn',
    color: 'hsl(15 90% 65%)', bg: 'hsl(20 100% 96%)',
    items: [
      { name: 'Burpees', duration: '40s ON / 20s REST', emoji: '🔥', image: GIFS.burpees,
        how: 'Stand → squat hands on floor → jump feet back to plank → push-up (optional) → jump feet forward → jump up arms overhead. The QUEEN of calorie burn!',
        tip: 'No jump at top as a beginner — just stand up!' },
      { name: 'Mountain Climbers', duration: '40s ON / 20s REST', emoji: '⛰️', image: GIFS.mountainClimbers,
        how: "High plank, hands under shoulders. Drive one knee toward chest, quickly switch in a running motion. Keep hips level — don't bounce!",
        tip: 'The FASTER you go, the more cardio' },
      { name: 'Jump Squats', duration: '40s ON / 20s REST', emoji: '🌟', image: GIFS.jumpSquat,
        how: 'Regular squat, then explode upward into a jump! Land softly with bent knees and go straight into the next squat.',
        tip: 'Land toe-heel, softly — protect knees!' },
      { name: 'Lateral Shuffles', duration: '40s ON / 20s REST', emoji: '🦄', image: GIFS.lateralShuffle,
        how: 'Slight squat, stay low. Shuffle 3 steps right, tap foot, shuffle 3 steps left, tap. Stay in the athletic low position.',
        tip: "Don't stand up between shuffles — stay LOW" },
      { name: 'Squat to Kick', duration: '40s ON / 20s REST', emoji: '🌈', image: GIFS.squatKick,
        how: 'Do a squat, as you stand kick one leg out front or side. Next squat, kick the other leg. Challenges balance, works glutes!',
        tip: "Keep standing leg slightly bent — don't lock" },
    ],
  },
  {
    category: 'core', emoji: '🎀', title: 'Circuit 4 — Core Finisher',
    color: 'hsl(180 60% 55%)', bg: 'hsl(180 70% 95%)',
    items: [
      { name: 'Crunches', duration: '30 sec', emoji: '🎀', image: GIFS.crunches,
        how: "Lie on back, knees bent, hands behind head (don't pull neck!). Curl shoulders off floor toward knees. Lower slowly.",
        tip: 'Exhale UP, inhale DOWN' },
      { name: 'Bicycle Crunches', duration: '30 sec', emoji: '🚲', image: GIFS.bicycleCrunches,
        how: 'Lie on back, hands behind head. Bring right elbow to left knee while right leg extends. Switch — left elbow to right knee. Like pedaling a bike!',
        tip: 'SLOW & controlled beats fast and sloppy' },
      { name: 'Leg Raises', duration: '30 sec', emoji: '🦵', image: GIFS.legRaise,
        how: 'Lie flat on back, hands under hips. Legs straight. Raise both legs to 90°, then lower SLOWLY without touching floor.',
        tip: 'Press lower back INTO the floor' },
      { name: 'Russian Twists', duration: '30 sec', emoji: '🌀', image: GIFS.russianTwist,
        how: 'Sit on floor, knees bent, feet lifted or on floor. Lean back slightly. Clasp hands and twist torso right, then left.',
        tip: 'Feet up = harder, feet down = easier' },
      { name: 'Dead Bug Hold', duration: '30 sec', emoji: '🐞', image: GIFS.deadBug,
        how: 'Lie on back. Arms up toward ceiling, knees bent at 90°. Slowly lower right arm overhead AND left leg down — without arching back. Switch.',
        tip: 'Press lower back FLAT into the floor' },
    ],
  },
];

export default function CalisthenicsWorkout() {
  const [active, setActive] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<string>('all');

  const visible = filter === 'all' ? exercises : exercises.filter(c => c.category === filter);

  const renderFallback = (ex: Exercise, color: string) => (
    <div
      className="h-full w-full flex flex-col items-center justify-center text-center p-4 relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${color}25 0%, transparent 60%), radial-gradient(circle at 70% 80%, ${color}20 0%, transparent 55%)`,
      }}
    >
      <Sparkles className="absolute top-3 right-3 h-3.5 w-3.5 opacity-60" style={{ color }} />
      <Heart className="absolute bottom-3 left-3 h-3 w-3 opacity-50" style={{ color, fill: color }} />
      <Flower2 className="absolute top-4 left-4 h-3.5 w-3.5 opacity-40" style={{ color }} />
      <div className="text-6xl mb-2 drop-shadow-sm">{ex.emoji}</div>
      <div className="text-xs font-bold tracking-wide" style={{ color }}>{ex.name}</div>
    </div>
  );

  return (
    <Card className="overflow-hidden border-primary/20 shadow-card rounded-[2rem]">
      {/* Hero Header */}
      <div
        className="relative px-6 sm:px-10 py-12 text-center overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at top, hsl(335 95% 92%) 0%, hsl(300 85% 94%) 45%, hsl(280 80% 96%) 100%)',
        }}
      >
        {/* Floating decorations */}
        <Flower2 className="absolute top-6 left-6 h-8 w-8 text-primary/40 -rotate-12" />
        <Star className="absolute top-10 right-10 h-5 w-5 text-accent/60 fill-accent/40" />
        <Heart className="absolute bottom-6 left-12 h-4 w-4 text-primary/50 fill-primary/30" />
        <Flower2 className="absolute bottom-8 right-8 h-6 w-6 text-accent/50 rotate-12" />
        <Sparkles className="absolute top-1/2 left-4 h-4 w-4 text-primary/40" />
        <Sparkles className="absolute top-1/3 right-6 h-4 w-4 text-accent/50" />
        <Heart className="absolute top-20 left-1/4 h-3 w-3 text-primary/40 fill-primary/30" />
        <Star className="absolute bottom-12 right-1/4 h-3 w-3 text-accent/50 fill-accent/30" />

        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-3xl mb-3 shadow-cute gradient-primary"
        >
          <Sparkles className="h-7 w-7 text-primary-foreground" />
        </motion.div>
        <h2 className="font-display text-3xl sm:text-4xl text-primary mb-2">
          Calisthenics Workout
        </h2>
        <p className="text-sm text-foreground/70 max-w-md mx-auto">
          A 45-min no-equipment routine made just for you ✨ Tap any exercise to see how to do it perfectly
        </p>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {['🔥 Burn Fat', '💪 Build Strength', '🏠 Home Friendly', '⏱ 45 Min', '🌸 Beginner OK'].map(t => (
            <span
              key={t}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-card/80 backdrop-blur text-primary border border-primary/30 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 px-5 sm:px-8 pt-5 pb-1">
        {[
          { id: 'all', label: '✨ All' },
          ...exercises.map(c => ({ id: c.category, label: `${c.emoji} ${c.title.replace(/Circuit \d+ — /, '')}` })),
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
              filter === f.id
                ? 'bg-primary text-primary-foreground border-primary shadow-cute'
                : 'bg-card text-foreground/70 border-border hover:border-primary/40 hover:text-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Circuits */}
      <div className="px-5 sm:px-8 py-6 space-y-10">
        {visible.map((circuit, ci) => (
          <div key={ci}>
            {/* Circuit Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-10 w-10 rounded-2xl flex items-center justify-center text-xl shadow-sm"
                style={{ background: circuit.bg, border: `2px solid ${circuit.color}40` }}
              >
                {circuit.emoji}
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">{circuit.title}</h3>
                <div className="text-[11px] text-muted-foreground font-medium">
                  {circuit.items.length} exercises
                </div>
              </div>
              <div className="hidden sm:block flex-1 h-px" style={{ background: `linear-gradient(to right, ${circuit.color}40, transparent)` }} />
            </div>

            {/* Exercise Grid — pic always visible */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {circuit.items.map((ex, ei) => {
                const key = `${circuit.category}-${ei}`;
                const isOpen = active === key;
                const showFallback = !ex.image || imgErrors[key];
                return (
                  <motion.div
                    key={ei}
                    layout
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className={`rounded-3xl overflow-hidden bg-card border shadow-card hover:shadow-card-hover cursor-pointer ${
                      isOpen ? 'sm:col-span-2 lg:col-span-3' : ''
                    }`}
                    style={{ borderColor: isOpen ? circuit.color + '80' : undefined }}
                    onClick={() => setActive(isOpen ? null : key)}
                  >
                    <div className={isOpen ? 'sm:flex' : ''}>
                      {/* Image */}
                      <div
                        className={`relative ${isOpen ? 'sm:w-1/2 h-64 sm:h-auto' : 'h-48'}`}
                        style={{ background: circuit.bg }}
                      >
                        {showFallback ? (
                          renderFallback(ex, circuit.color)
                        ) : (
                          <img
                            src={ex.image}
                            alt={ex.name}
                            loading="lazy"
                            onError={() => setImgErrors(p => ({ ...p, [key]: true }))}
                            className="h-full w-full object-contain bg-white p-2"
                          />
                        )}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur bg-card/90 shadow-sm" style={{ color: circuit.color }}>
                          {ex.duration}
                        </div>
                        <Heart className="absolute top-2 left-2 h-4 w-4 text-primary fill-primary/80 drop-shadow" />
                      </div>

                      {/* Body */}
                      <div className={`p-4 ${isOpen ? 'sm:w-1/2 sm:p-5' : ''}`}>
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm sm:text-base text-foreground leading-tight">
                            <span className="mr-1.5">{ex.emoji}</span>{ex.name}
                          </h4>
                          <ChevronDown
                            className="h-4 w-4 text-muted-foreground shrink-0 mt-1 transition-transform"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                          />
                        </div>
                        <div className="text-[11px] font-semibold mb-3" style={{ color: circuit.color }}>
                          ⏱ {ex.duration}
                        </div>

                        {!isOpen && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Tap to see step-by-step form & tips ✨
                          </p>
                        )}

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="space-y-3"
                            >
                              <div className="rounded-2xl p-3" style={{ background: circuit.bg }}>
                                <div className="text-[10px] font-extrabold uppercase tracking-wider mb-1.5" style={{ color: circuit.color }}>
                                  📋 How to do it
                                </div>
                                <p className="text-xs leading-relaxed text-foreground/85 m-0">{ex.how}</p>
                              </div>

                              <div
                                className="rounded-r-2xl p-3"
                                style={{ background: `${circuit.color}18`, borderLeft: `3px solid ${circuit.color}` }}
                              >
                                <div className="text-[10px] font-extrabold uppercase tracking-wider mb-1" style={{ color: circuit.color }}>
                                  💡 Pro tip
                                </div>
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
          </div>
        ))}
      </div>

      {/* Footer love note */}
      <div className="text-center px-6 py-5 border-t border-border/60 bg-secondary/30">
        <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          Made with <Heart className="h-3 w-3 text-primary fill-primary inline" /> for your strongest, softest self
        </p>
      </div>
    </Card>
  );
}
