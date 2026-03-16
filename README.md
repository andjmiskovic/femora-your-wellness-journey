# Femora — Women's Health & Cycle Tracking App

A modern, privacy-first women's health companion built with React, offering cycle tracking, fertility insights, and pregnancy guidance — all in one beautifully designed app.

## Features

- **Cycle Tracking** — Visualize your cycle phases, predict periods, and understand your rhythm with an interactive cycle ring and daily insights
- **Fertility Tracking** — Precision fertile window predictions and ovulation tracking for those trying to conceive
- **Pregnancy Mode** — Week-by-week pregnancy guidance with milestone tracking
- **AI Health Chat** — Conversational health assistant powered by AI for personalized wellness guidance
- **Daily Logging** — Track symptoms, mood, energy, and more with a streamlined daily log
- **Appointments** — Manage and track upcoming health appointments
- **Calendar View** — Full calendar overview of your cycle history and upcoming events
- **Smart Onboarding** — Personalized first-time setup that tailors the experience to your journey

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, shadcn/ui, Framer Motion
- **Backend:** Lovable Cloud (authentication, database, edge functions)
- **AI:** Integrated AI health chat via edge functions
- **State Management:** React Context API, TanStack React Query

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui primitives
│   ├── CycleDashboard.tsx
│   ├── ConceiveDashboard.tsx
│   ├── PregnancyDashboard.tsx
│   ├── Onboarding.tsx
│   └── ...
├── context/          # React context providers
│   ├── AuthContext.tsx
│   └── AppContext.tsx
├── pages/            # Route-level page components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
└── assets/           # Images and static assets
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint codebase |

## License

Private — All rights reserved.
