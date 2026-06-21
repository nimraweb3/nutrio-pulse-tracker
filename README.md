#  Nutrio Pulse Tracker

> Nutrio Pulse Tracker is a personal health dashboard designed to track nutrition, workouts, body metrics, and daily fitness goals in one place.

Built with the help of Lovable AI and a vibe-coding approach.

The tracker supports both Pakistani and international food items, calorie and macro tracking, workout logging, and progress monitoring. It is especially useful for users who follow calisthenics, strength training, or general fitness routines and want a clean, data-driven overview of their health journey.

---

##  What It Does

- **Nutrition Logging** — Log meals with a food database that includes Pakistani staples (biryani, nihari, roti, daal, parathas) alongside global foods
- **Macro Tracker** — Daily calories, protein, carbs, fats, and fiber at a glance
- **Calisthenics Workouts** — Bodyweight exercises with difficulty levels and calorie burn estimates
- **Daily Dashboard** — Weight log, water intake, and progress toward your daily targets
- **Weekly Analytics** — Charts to spot trends in your nutrition and fitness over time
- **AI Chef Chat** — Describe what ingredients you have and get meal suggestions

---

## 🛠️ Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Frontend   | React 18 + TypeScript + Vite       |
| Styling    | Tailwind CSS + shadcn/ui           |
| Charts     | Recharts                           |
| Backend/DB | Supabase (Auth + PostgreSQL + RLS) |
| AI         | Lovable AI Gateway (Gemini)        |
| Build      | Bun + Vite                         |

---

##  Run It Locally

### Prerequisites

- Node.js `v18+` or Bun
- A free [Supabase](https://supabase.com) account

### 1. Clone the repo

```bash
git clone https://github.com/nimraweb3/nutrio-pulse-tracker.git
cd nutrio-pulse-tracker
```

### 2. Install dependencies

```bash
npm install
# or
bun install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your values (see [Environment Variables](#-environment-variables) below).

### 4. Run Supabase migrations

In your Supabase project → SQL Editor, run the migration files from `supabase/migrations/` in order (sorted by date).

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
VITE_SUPABASE_PROJECT_ID=your-project-ref-id
```

You can find these in your Supabase project under **Settings → API**.

A `.env.example` template is included in the repo — copy it and fill in your own values.

---

##  Project Structure

```
nutrio-pulse-tracker/
├── public/
├── src/
│   ├── components/     # UI components (dashboard, meal logger, workout tracker)
│   ├── context/        # Global app state (auth, user data)
│   ├── data/           # Static food + exercise databases
│   ├── pages/          # Route-level pages (Dashboard, Auth)
│   ├── utils/          # Nutrition calculation helpers
│   └── index.css       # Global styles and design tokens
├── supabase/
│   ├── functions/      # Edge functions (AI chef chat)
│   └── migrations/     # Database setup SQL files
├── .env.example        # Template — copy this to .env
├── .gitignore
├── package.json
└── vite.config.ts
```

---

## 🧪 Scripts

| Command           | Description                      |
|-------------------|----------------------------------|
| `npm run dev`     | Start dev server with hot reload |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm test`        | Run tests with Vitest            |

---

## 🔒 Security

- All API keys are stored in `.env` — never hardcoded
- `.env` is listed in `.gitignore` and not committed to the repo
- Supabase Row Level Security (RLS) is enabled on all tables — users can only access their own data
- Only the `anon` public key is used on the frontend — the `service_role` key is never exposed

See [SECURITY.md](./SECURITY.md) for full details.

---

##  Deployment

Built with Lovable — deploy in one click from the Lovable dashboard. You can also deploy manually:

**Vercel:** Connect your GitHub repo → add environment variables in Project Settings → Deploy

**Netlify:** Same process — add env vars under Site Settings → Environment Variables

---

## 📄 License

MIT — use it however you want.

---

## 👩‍💻 Author

Built by [@nimraweb3](https://github.com/nimraweb3)
