# My Fitness — Personal Health Dashboard

> **This is a personal project I built to track my own health, workouts and nutrition.**
> Nothing fancy — just a clean dashboard where I log meals, track bodyweight exercises, and see if I'm hitting my daily targets. If it helps you too, feel free to use it.
>
> **Built with vibe coding** — I iterated on this with AI prompts, not traditional software planning. It works well for what I need.

---

## What It Does

- **Nutrition tracking** — log meals using a Pakistani + global food database (biryani, nihari, roti, eggs, oats, etc.)
- **Calisthenics workouts** — bodyweight exercises with difficulty levels and calorie estimates
- **Daily dashboard** — calories, protein, carbs, fats, water intake, weight log
- **Weekly analytics** — simple charts to see trends over time
- **AI meal suggestions** — chat with an AI chef based on ingredients you have

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Backend | Supabase (Auth, Postgres, RLS) |
| AI | Lovable AI Gateway (Gemini) |

---

## Step by Step — Run It Locally

### 1. Clone the repo

```bash
git clone https://github.com/nimraweb3/nutrio-pulse-tracker.git
cd nutrio-pulse-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

- Create a free project at [supabase.com](https://supabase.com)
- Go to Project Settings → API
- Copy the **Project URL** and **anon public key**

### 4. Add environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-ref
```

### 5. Run database migrations

In your Supabase project, go to the SQL Editor and run the migration files from `supabase/migrations/` in order (by date).

### 6. Deploy the AI chat function (optional)

If you want the AI chef chat to work:

```bash
# Install Supabase CLI if you haven't
# Then deploy the edge function
supabase functions deploy chef-chat --project-ref your-project-ref
```

Add your `LOVABLE_API_KEY` in Supabase Edge Function secrets.

### 7. Start the app

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code with ESLint |
| `npm test` | Run tests with Vitest |

---

## Project Structure

```
src/
├── components/     # UI components (dashboard, meal logger, workouts, etc.)
├── context/        # Global app state
├── data/           # Static food and exercise databases
├── pages/          # Main pages (Dashboard, Auth)
├── utils/          # Nutrition calculation helpers
└── index.css       # Theme and design tokens

supabase/
├── functions/      # Edge functions (AI chat)
└── migrations/     # Database setup SQL
```

---

## A Note on This Project

This isn't a commercial product or a startup. It's just something I put together because I wanted a simple, focused tool for my own fitness tracking. The code is "vibe coded" — I described what I wanted, iterated with AI, and refined until it felt right.

If you're a developer looking at this repo, don't expect enterprise architecture. It works, it's clean enough, and it solves my problem. That's the goal.

---

## License

MIT — use it however you want.
