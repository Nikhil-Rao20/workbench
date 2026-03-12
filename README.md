# Workbench

> Personal productivity tracker for PhD research — time blocks, project log, daily targets, and analytics.

**Live:** [nikhil-rao20.github.io/workbench](https://nikhil-rao20.github.io/workbench)

---

## Features

- **Dashboard** — live current time-block countdown, day timeline, daily minimum progress rings, and weekly project rotation
- **Timer** — block countdown + manual stopwatch; save sessions directly to the log
- **Log** — browse and manage all sessions by date; add entries manually
- **Projects** — manage research projects with multi-category tags, deadlines, and color coding
- **Analytics** — 7-day stacked bar chart, project distribution pie chart, and weekly stats
- **Day Report** — per-day breakdown with target progress rings, time-by-block bars, and full session list
- **Dark / Light mode** — persistent theme preference
- **Browser notifications** — warns N minutes before a time block ends

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Charts | Recharts |
| Routing | React Router v7 |
| Data | localStorage (no backend) |
| Deployment | GitHub Pages via `gh-pages` |

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173/workbench/`

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs `vite build` then publishes the `dist/` folder to the `gh-pages` branch of this repo.

> Make sure the repo is named **`workbench`** on GitHub and GitHub Pages is enabled for the `gh-pages` branch.

## Schedule

The app is pre-configured with a daily time-block schedule (GATE prep, deep research, conceptual learning, exercise, etc.) defined in `src/data/schedule.js`. Edit that file to customise blocks, colors, and daily targets.

## Projects

Nine research projects are pre-loaded in `src/data/projects.js`. Add, edit, or delete them directly from the **Projects** page — changes are saved to localStorage automatically.

---

*Built for personal use. Data is stored entirely in the browser.*
