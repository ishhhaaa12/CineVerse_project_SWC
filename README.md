# CineVerse

A premium, cinematic movie discovery platform built with **Next.js 15**, **React 19**, **TypeScript**, and **Redux Toolkit**. Search millions of movies and TV shows, explore actor filmographies, manage your watchlist, compare films side-by-side, and chat with an AI-powered recommendation bot.

[![CI](https://github.com/prachiaggarwal609/cineverse/actions/workflows/ci.yml/badge.svg)](https://github.com/prachiaggarwal609/cineverse/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://typescriptlang.org)
[![Tests](https://img.shields.io/badge/tests-59%20passing-brightgreen)](#testing)

---

## Features

| Feature | Description |
|---|---|
| Movie Search | Debounced real-time search via OMDB API |
| TV Shows | Browse and search TV series |
| Actor Profiles | Explore filmographies of 26+ actors |
| Movie Details | Full metadata: ratings, cast, plot, awards, box office |
| Movie Comparison | Side-by-side compare tool for 2 movies |
| Watchlist | Save movies to watch later (persisted in localStorage) |
| Favorites | Mark and manage favorite films |
| Watched History | Track movies you've already seen |
| Star Ratings | Rate movies 1–5 stars |
| AI Chatbot | Gemini-powered recommendation chatbot |
| Trailer Player | Embedded YouTube official trailers |
| PDF Export | Export movie details as PDF |
| Dark Mode | Class-based theme with persistence |
| Responsive Design | Optimized for mobile, tablet, and desktop |

---

## Screenshots

> Deploy the app and capture screenshots for your README here.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.3 (App Router) |
| Language | TypeScript 5.9 |
| UI | React 19, TailwindCSS 3.4 |
| Animations | Framer Motion |
| State | Redux Toolkit + TanStack React Query v5 |
| Charts | Recharts + Chart.js |
| Icons | Lucide React |
| AI | Google Gemini 2.0 Flash |
| Movie Data | OMDB API |
| Trailers | YouTube Data API v3 |
| PDF | jsPDF + html2canvas |
| Testing | Jest 30 + Testing Library |
| CI/CD | GitHub Actions |
| Container | Docker (Node 22 Alpine) |

---

## Quick Start

### Prerequisites

- Node.js 18+ (22 recommended)
- npm 9+
- API keys for OMDB and Gemini AI

### Installation

```bash
# Clone
git clone https://github.com/prachiaggarwal609/cineverse.git
cd cineverse

# Install
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local and add your API keys

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/movies`.

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_OMDB_API_KEY` | Yes | Movie and TV show data |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Yes | AI chatbot responses |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | No | Movie trailer search |

Get your keys:
- OMDB: [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
- Gemini: [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- YouTube: [console.cloud.google.com](https://console.cloud.google.com) → YouTube Data API v3

---

## Available Scripts

```bash
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run all tests
npm run test:watch   # Watch mode tests
npm run test:coverage # Tests with coverage report
```

---

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── movies/         # Movie listing and detail pages
│   ├── tv-shows/       # TV shows page
│   ├── actors/         # Actor pages
│   ├── genres/         # Genre browsing
│   ├── watchlist/      # Watchlist page
│   ├── profile/        # User profile
│   ├── about/          # About page
│   ├── login/          # Login UI
│   └── signup/         # Signup UI
├── components/         # Reusable React components
│   ├── ui/             # Base UI primitives
│   └── skeletons/      # Loading skeleton components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── providers/          # React context providers
├── services/           # External API clients
├── store/              # Redux Toolkit store & slices
└── types/              # TypeScript type definitions
```

---

## Testing

```bash
npm test
```

**59 tests across 4 suites — all passing:**

| Suite | Tests | Coverage Area |
|---|---|---|
| `utils.test.ts` | 17 | Utility functions & search helpers |
| `actorApi.test.ts` | 18 | Actor dataset & search logic |
| `redux.test.ts` | 14 | Watchlist & favorites Redux slices |
| `movieApi.test.ts` | 10 | OMDB API wrapper (mocked fetch) |

---

## API Documentation

### Movie Search
```
GET https://www.omdbapi.com/?s={query}&apikey={key}
```

### Movie Details
```
GET https://www.omdbapi.com/?i={imdbID}&apikey={key}
```

### TV Show Search
```
GET https://www.omdbapi.com/?s={query}&type=series&apikey={key}
```

### Gemini AI Chatbot
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
Headers: X-goog-api-key: {key}
```

### YouTube Trailers
```
GET https://www.googleapis.com/youtube/v3/search?q={title}+official+trailer&key={key}
```

---

## Deployment

**Vercel (Recommended):**
1. Push to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy — done

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for full instructions including Netlify and Docker.

---

## Documentation Index

| Document | Description |
|---|---|
| [PROJECT_ANALYSIS.md](PROJECT_ANALYSIS.md) | Full project architecture analysis |
| [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) | Step-by-step installation instructions |
| [RUNNING_GUIDE.md](RUNNING_GUIDE.md) | How to run locally, in Docker, or for production |
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | Vercel, Netlify, and Docker deployment |
| [TEST_REPORT.md](TEST_REPORT.md) | Complete test suite results |
| [COLLEGE_SUBMISSION_REPORT.md](COLLEGE_SUBMISSION_REPORT.md) | Academic submission report |
| [API_SETUP.md](API_SETUP.md) | API key setup instructions |
| [contributing.md](contributing.md) | Contribution guidelines |

---

## CI/CD

GitHub Actions workflow runs on every push and PR:

1. **Lint** — ESLint code quality check
2. **Type Check** — TypeScript strict compilation
3. **Test** — Jest unit & integration tests with coverage
4. **Build** — Next.js production bundle
5. **Docker Build** — Verify Dockerfile on pushes to master

Workflow file: [.github/workflows/ci.yml](.github/workflows/ci.yml)

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Follow the [contributing guidelines](contributing.md)
4. Run tests: `npm test`
5. Open a Pull Request

---

## License

MIT — see [LICENSE](LICENSE)

---

Built with love using Next.js and the OMDB API
