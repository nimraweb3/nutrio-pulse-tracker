import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Exercise {
  name: string;
  duration: string;
  image: string;
  how: string;
  tip: string;
}
interface Circuit {
  category: string;
  color: string;
  bg: string;
  items: Exercise[];
}

const exercises: Circuit[] = [
  {
    category: '🌷 Warm Up',
    color: 'hsl(335 78% 65%)',
    bg: 'hsl(335 90% 96%)',
    items: [
      { name: 'Jumping Jacks', duration: '1 min', image: 'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif', how: 'Stand with feet together, arms at sides. Jump feet out wide while raising arms overhead. Jump back to start. Keep rhythm steady and breathe!', tip: 'Land softly on the balls of your feet' },
      { name: 'High Knees', duration: '1 min', image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif', how: 'Run in place, lifting knees to hip height with each step. Pump arms for balance. Stay light on your toes and keep core tight.', tip: 'Drive knees UP — not forward' },
      { name: 'Arm Circles', duration: '30 sec each way', image: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif', how: 'Extend arms out to sides at shoulder height. Make big circles forward for 30 sec, then reverse. Keep shoulders relaxed.', tip: 'Make the circles as BIG as possible' },
    ],
  },
  {
    category: '💖 Circuit 1 — Lower Body',
    color: 'hsl(340 80% 60%)',
    bg: 'hsl(340 90% 96%)',
    items: [
      { name: 'Squats', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif', how: 'Feet shoulder-width apart, toes slightly out. Push hips back and bend knees like sitting on a chair. Keep chest up, heels on floor. Lower until thighs are parallel, then push back up.', tip: 'Knees track over toes — never cave inward' },
      { name: 'Sumo Squats', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif', how: 'Feet wider than shoulder-width, toes pointing outward at 45°. Lower straight down, keeping back straight. Targets inner thighs and glutes.', tip: 'Point toes OUT — that is the key!' },
      { name: 'Reverse Lunges', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/3ohjV3KahwmqTHjqly/giphy.gif', how: 'Stand tall. Step one foot BACK and lower the back knee toward the floor. Front thigh parallel to ground. Push through front heel to return. Alternate legs.', tip: 'Front knee above ankle — don\'t push it forward' },
      { name: 'Glute Bridges', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/l4FGGafcOHmrlQxG0/giphy.gif', how: 'Lie on back, knees bent, feet flat on floor near hips. Push hips up toward ceiling, squeezing glutes. Hold 1 sec, lower slowly.', tip: 'SQUEEZE at the top — that\'s the magic' },
      { name: 'Wall Sit', duration: 'Hold 40 sec', image: 'https://media.giphy.com/media/l46Cbqvg6gxGvh3dC/giphy.gif', how: 'Back flat against wall. Slide down until thighs parallel to floor, knees at 90°. Arms on thighs or crossed. HOLD and breathe!', tip: 'Feet flat on floor — don\'t go on tiptoes' },
    ],
  },
  {
    category: '🦋 Circuit 2 — Upper Body & Core',
    color: 'hsl(280 70% 65%)',
    bg: 'hsl(280 80% 96%)',
    items: [
      { name: 'Push-Ups', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif', how: 'Hands shoulder-width apart, body in straight line head to heels. Lower chest toward floor, elbows ~45°. Push back up. Knees on floor is TOTALLY FINE for beginners!', tip: 'Don\'t let hips sag — flat plank body!' },
      { name: 'Pike Push-Ups', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif', how: 'Start in downward dog — hips high, body inverted V. Bend elbows to lower head toward floor between hands. Push back up. Targets shoulders!', tip: 'Higher hips = harder. Start lower if needed' },
      { name: 'Tricep Dips', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/l46CyJmS9KUbokzsI/giphy.gif', how: 'Sit on floor, hands behind hips, fingers forward. Lift hips off ground. Bend elbows to lower hips toward floor (don\'t touch!), push back up.', tip: 'Elbows pointing BACK — not out to sides' },
      { name: 'Plank Hold', duration: 'Hold 40 sec', image: 'https://media.giphy.com/media/26xBwdIuRJiAIqHIA/giphy.gif', how: 'Forearms on floor, elbows under shoulders. Body straight from head to heels. Squeeze core, glutes, everything! Look at floor. BREATHE.', tip: 'Slow steady breathing through the hold' },
      { name: 'Superman Hold', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/3o7btUmVCKtHWK3Hgk/giphy.gif', how: 'Lie face down, arms extended overhead. Lift arms, chest, and legs off floor at the same time. Hold 2–3 sec then lower. Strengthens your back chain.', tip: 'Look DOWN — don\'t crane your neck' },
    ],
  },
  {
    category: '🌸 Circuit 3 — Full Body Fat Burn',
    color: 'hsl(15 90% 65%)',
    bg: 'hsl(20 100% 96%)',
    items: [
      { name: 'Burpees', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/23hPPMRbFgm9pOmRgI/giphy.gif', how: 'Stand → squat hands on floor → jump feet back to plank → push-up (optional) → jump feet forward → jump up arms overhead. The KING of calorie burn!', tip: 'No jump at top as a beginner — just stand up!' },
      { name: 'Mountain Climbers', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/l3q2Z0fHBNFglHUvS/giphy.gif', how: 'High plank, hands under shoulders. Drive one knee toward chest, quickly switch in a running motion. Keep hips level — don\'t bounce!', tip: 'The FASTER you go, the more cardio' },
      { name: 'Jump Squats', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif', how: 'Regular squat, then explode upward into a jump! Land softly with bent knees and go straight into the next squat.', tip: 'Land toe-heel, softly — protect knees!' },
      { name: 'Lateral Shuffles', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif', how: 'Slight squat, stay low. Shuffle 3 steps right, tap foot, shuffle 3 steps left, tap. Stay in the athletic low position.', tip: 'Don\'t stand up between shuffles — stay LOW' },
      { name: 'Squat to Kick', duration: '40s ON / 20s REST', image: 'https://media.giphy.com/media/3ohzdMDbNXvnntM6Aw/giphy.gif', how: 'Do a squat, as you stand kick one leg out front or side. Next squat, kick the other leg. Challenges balance, works glutes!', tip: 'Keep standing leg slightly bent — don\'t lock' },
    ],
  },
  {
    category: '🎀 Circuit 4 — Core Finisher',
    color: 'hsl(180 60% 55%)',
    bg: 'hsl(180 70% 95%)',
    items: [
      { name: 'Crunches', duration: '30 sec', image: 'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif', how: 'Lie on back, knees bent, hands behind head (don\'t pull neck!). Curl shoulders off floor toward knees. Lower slowly.', tip: 'Exhale UP, inhale DOWN' },
      { name: 'Bicycle Crunches', duration: '30 sec', image: 'https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif', how: 'Lie on back, hands behind head. Bring right elbow to left knee while right leg extends. Switch — left elbow to right knee. Like pedaling a bike!', tip: 'SLOW & controlled beats fast and sloppy' },
      { name: 'Leg Raises', duration: '30 sec', image: 'https://media.giphy.com/media/3ohzdR1pX1RSPNZP4c/giphy.gif', how: 'Lie flat on back, hands under hips. Legs straight. Raise both legs to 90°, then lower SLOWLY without touching floor.', tip: 'Press lower back INTO the floor' },
      { name: 'Russian Twists', duration: '30 sec', image: 'https://media.giphy.com/media/26BRzozg4TCBXv6QU/giphy.gif', how: 'Sit on floor, knees bent, feet lifted or on floor. Lean back slightly. Clasp hands and twist torso right, then left.', tip: 'Feet up = harder, feet down = easier' },
      { name: 'Dead Bug Hold', duration: '30 sec', image: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif', how: 'Lie on back. Arms up toward ceiling, knees bent at 90°. Slowly lower right arm overhead AND left leg down — without arching back. Switch.', tip: 'Press lower back FLAT into the floor' },
    ],
  },
];

export default function CalisthenicsWorkout() {
  const [active, setActive] = useState<string | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <Card className="p-5 shadow-card border-primary/20 gradient-card">
      <div className="flex items-center gap-2 mb-1">
        <div className="gradient-primary rounded-xl p-2 shadow-cute">
          <Sparkles className="h-4 w-4 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Calisthenics Workout</h2>
        <Heart className="h-4 w-4 text-primary fill-primary ml-auto" />
      </div>
      <p className="text-xs text-muted-foreground mb-4 ml-1">
        45 min · No equipment · Tap any exercise for full form guide ✨
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {['🔥 Burn Fat', '💪 Build Strength', '🏠 Home Friendly', '⏱ 45 Min'].map(t => (
          <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {t}
          </span>
        ))}
      </div>

      <div className="space-y-7">
        {exercises.map((circuit, ci) => (
          <div key={ci}>
            <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: `2px solid ${circuit.color}33` }}>
              <span className="block w-1 h-6 rounded" style={{ background: circuit.color }} />
              <h3 className="text-sm font-bold text-foreground">{circuit.category}</h3>
            </div>

            <div className="space-y-2.5">
              {circuit.items.map((ex, ei) => {
                const key = `${ci}-${ei}`;
                const isOpen = active === key;
                return (
                  <motion.div
                    key={ei}
                    layout
                    onClick={() => setActive(isOpen ? null : key)}
                    className="rounded-2xl overflow-hidden cursor-pointer transition-all border bg-card hover:shadow-card-hover"
                    style={{ borderColor: isOpen ? circuit.color + '66' : undefined }}
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: circuit.color }} />
                      <div className="flex-1">
                        <div className="font-bold text-sm text-foreground">{ex.name}</div>
                        <div className="text-[11px] font-semibold mt-0.5" style={{ color: circuit.color }}>
                          {ex.duration}
                        </div>
                      </div>
                      <ChevronDown
                        className="h-4 w-4 text-muted-foreground transition-transform"
                        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-3.5 pb-3.5"
                          style={{ borderTop: `1px solid ${circuit.color}33` }}
                        >
                          <div
                            className="w-full h-48 rounded-xl overflow-hidden my-3 flex items-center justify-center"
                            style={{ background: circuit.bg }}
                          >
                            {imgErrors[key] ? (
                              <div className="text-center p-4">
                                <div className="text-4xl mb-1">🏋️‍♀️</div>
                                <div className="text-xs font-semibold text-foreground">{ex.name}</div>
                                <div className="text-[10px] text-muted-foreground mt-1">Reference image</div>
                              </div>
                            ) : (
                              <img
                                src={ex.image}
                                alt={ex.name}
                                onError={() => setImgErrors(p => ({ ...p, [key]: true }))}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          <div className="bg-muted/60 rounded-xl p-3 mb-2">
                            <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: circuit.color }}>
                              📋 How to do it
                            </div>
                            <p className="text-xs leading-relaxed text-foreground/80 m-0">{ex.how}</p>
                          </div>

                          <div
                            className="rounded-r-xl p-3"
                            style={{ background: `${circuit.color}18`, borderLeft: `3px solid ${circuit.color}` }}
                          >
                            <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: circuit.color }}>
                              💡 Pro tip
                            </div>
                            <p className="text-xs text-foreground/85 m-0">{ex.tip}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
