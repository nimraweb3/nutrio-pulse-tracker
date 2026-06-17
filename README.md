# NIM — Calisthenics & Nutrition Dashboard

> A production-grade fitness companion that pairs a **calisthenics training library** with a **Pakistani + global nutrition tracker** and a clean, Apple-Fitness–inspired **analytics dashboard**.

Built as a portfolio / hackathon project to demonstrate full-stack product thinking: real domain data, accessible UX, secure auth, RLS-protected cloud sync, and a polished design system.

---

## ✨ Highlights

- **Calisthenics library** — 30+ bodyweight exercises with animated GIF demos, difficulty tiers (Beginner / Intermediate / Advanced), MET-based calorie burn estimates, and one-tap session logging.
- **Pakistani-first food database** — 150+ items including Biryani, Nihari, Haleem, Karahi, Seekh Kebab, Sajji, BBQ, street food (Bun Kebab, Gol Gappay, Chana Chaat) and global staples.
- **Smart meal logger** — natural-language quick-add ("2 rotis and dal"), auto meal-type detection by time of day, recent-items shortcuts and a custom recipe builder.
- **Macro + micro tracking** — calories, P/C/F, fiber, sugar plus 14 micronutrients (vitamins A–K, iron, zinc, magnesium, omega-3/6, …).
- **Analytics dashboard** — weekly calorie & macro charts (Recharts), weight trend with forecast, weekly insights and goal progress.
- **Goals & streaks** — workout streaks, weight-change goals, daily calorie banner.
- **AI Chef chat** — ingredient-aware meal suggestions via Lovable AI Gateway (Gemini).
- **Responsive shell** — desktop sidebar + mobile slide-in drawer, no overlapping bottom nav.
- **Secure by default** — Supabase Auth (email/password + HIBP leaked-password protection), Row Level Security on every user table, no service-role keys in the client.

---

## 🧱 Tech Stack

| Layer       | Choice                                              |
| ----------- | --------------------------------------------------- |
| Framework   | **React 18** + **Vite 5** + **TypeScript**          |
| Styling     | **Tailwind CSS** + **shadcn/ui** + semantic tokens  |
| Motion      | **Framer Motion**                                   |
| Charts      | **Recharts**                                        |
| Backend     | **Supabase** (Postgres, Auth, Edge Functions, RLS)  |
| AI          | **Lovable AI Gateway** (Google Gemini)              |
| State       | React Context + TanStack Query                      |
| Forms       | React Hook Form + Zod validation                    |
| Routing     | React Router v6                                     |

---

## 📁 Project Structure

```
src/
├── components/        # Feature + UI components (shadcn primitives in ui/)
│   ├── CalisthenicsWorkout.tsx
│   ├── MealLogger.tsx
│   ├── WeeklyAnalytics.tsx
│   ├── NutritionSummary.tsx
│   └── ...
├── context/           # AppContext — global app state & data sync
├── data/              # Static datasets (foodDatabase, exerciseDatabase, supplements)
├── hooks/             # useAuth, use-mobile, use-toast
├── integrations/
│   └── supabase/      # Auto-generated client & types (do not edit)
├── pages/             # Route-level pages (Index, Auth, NotFound)
├── types/             # Shared TypeScript types
├── utils/             # Pure helpers (nutritionCalculations, formatters)
└── index.css          # Design tokens & global styles

supabase/
├── functions/         # Edge Functions (chef-chat)
└── migrations/        # Versioned SQL migrations
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+** (or **Bun**)
- A Supabase project (free tier works)

### Local setup

```bash
# 1. Clone
git clone https://github.com/<your-username>/nim-fitness.git
cd nim-fitness

# 2. Install
npm install        # or: bun install

# 3. Configure environment
cp .env.example .env
# fill in:
#   VITE_SUPABASE_URL=
#   VITE_SUPABASE_PUBLISHABLE_KEY=
#   VITE_SUPABASE_PROJECT_ID=

# 4. Run migrations against your Supabase project
#    (apply files in supabase/migrations/ in order)

# 5. Start the dev server
npm run dev
```

App runs at **http://localhost:8080**.

### Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Vite dev server with HMR          |
| `npm run build`   | Production build to `dist/`      |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | ESLint                            |
| `npm test`        | Vitest                            |

---

## 🔐 Security

- **RLS everywhere** — every `public.*` user table is protected by `auth.uid() = user_id` policies.
- **Roles in a dedicated table** — never on the profile row (prevents privilege escalation).
- **HIBP protection** — leaked-password check enabled on Supabase Auth.
- **Server-only keys** — `LOVABLE_API_KEY` lives in Edge Function secrets; no service-role key in the browser.
- **Validation** — Zod schemas on form input, length and type guards on user-submitted strings.

---

## 🧮 Nutrition Engine (in short)

- **BMR** — Mifflin–St Jeor.
- **TDEE** — BMR × activity multiplier (sedentary → very_active).
- **Goal adjustment** — −20% (fat loss), 0% (maintenance), +15% (muscle gain).
- **Macros** — protein 1.6–2.2 g/kg, fats 25–30% of kcal, carbs fill the remainder.
- **Workout net calories** — `intake − burned`, surfaced on the daily banner.

See `src/utils/nutritionCalculations.ts`.

---

## 🗺️ Roadmap

- [ ] Photo-based meal logging (vision API)
- [ ] Apple Health / Google Fit import
- [ ] Workout plan generator (periodised calisthenics)
- [ ] Social — share workouts & recipes
- [ ] PWA install + offline-first cache

---

## 🤝 Contributing

PRs welcome. Please:
1. Open an issue to discuss the change first.
2. Keep components small and use the existing design tokens.
3. Run `npm run lint` and `npm test` before submitting.

---

## 📸 Screenshots

> Add screenshots to `docs/screenshots/` and reference them here.

| Dashboard | Calisthenics | Analytics |
| --- | --- | --- |
| _coming soon_ | _coming soon_ | _coming soon_ |

---

## 📄 License

MIT © NIM Fitness — built with [Lovable](https://lovable.dev).
