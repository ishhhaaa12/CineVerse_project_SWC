# CineVerse — Project Analysis Report

> Generated: 2026-06-17  
> Analyst: Claude Code (Senior Full Stack Engineer)

---

## 1. Project Overview

**CineVerse** is a premium, production-grade movie discovery web application built with Next.js 15 and React 19. It enables users to search and browse movies, TV shows, and actor filmographies, manage personal watchlists, compare films side-by-side, and interact with an AI-powered chatbot for recommendations — all without a traditional backend server.

| Property | Value |
|---|---|
| Application Name | CineVerse |
| Package Name | movie-search |
| Version | 0.1.0 |
| Type | Frontend SPA / SSR Hybrid (Next.js App Router) |
| Node.js Requirement | ≥ 18 (Docker image uses Node 22) |
| Package Manager | npm |
| License | MIT |

---

## 2. Tech Stack Summary

### Core Framework
| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | ^15.3.4 |
| UI Library | React | ^19.1.1 |
| Language | TypeScript | ^5.9.2 |
| Build Tool | Turbopack (dev) / Next.js Build (prod) | bundled |

### State Management
| Tool | Purpose |
|---|---|
| Redux Toolkit | Global app state (watchlist, favorites, watched, compare, movies) |
| TanStack React Query v5 | Server-state / API data fetching & caching |
| localStorage | Client-side persistence (ratings, dark mode, watchlist) |

### Styling
| Tool | Purpose |
|---|---|
| Tailwind CSS | Utility-first CSS framework |
| @tailwindcss/forms | Form element styles |
| @tailwindcss/typography | Prose/article typography |
| Framer Motion | Animations and transitions |
| class-variance-authority | Component variant management |
| clsx + tailwind-merge | Conditional class utilities |

### Data Visualization
| Tool | Purpose |
|---|---|
| Recharts | Statistics charts on actor/movie pages |
| Chart.js + react-chartjs-2 | Additional chart components |

### Export
| Tool | Purpose |
|---|---|
| jsPDF + html2canvas | Export movie details / profiles as PDF |

### API Clients
| API | Environment Variable | Purpose |
|---|---|---|
| OMDB API | `NEXT_PUBLIC_OMDB_API_KEY` | Movie & TV show data |
| Google Gemini AI | `NEXT_PUBLIC_GEMINI_API_KEY` | AI chatbot (movie recommendations) |
| YouTube Data API v3 | `NEXT_PUBLIC_YOUTUBE_API_KEY` | Official movie trailers |

### Icons & Fonts
| Tool | Purpose |
|---|---|
| Lucide React | Icon set |
| Geist Sans / Geist Mono | Primary fonts (via next/font/google) |

### DevOps
| Tool | Purpose |
|---|---|
| Docker | Multi-stage containerization |
| ESLint 9 + eslint-config-next | Code linting |
| GitHub Actions | CI/CD (existing: issue automation) |

---

## 3. Project Architecture Overview

```
CineVerse (Pure Frontend / BFF-less)
│
├── Client Browser
│   ├── Next.js App Router (SSR + CSR hybrid)
│   ├── React 19 components
│   ├── Redux Toolkit store (client state)
│   ├── TanStack Query (API cache)
│   └── localStorage (user data persistence)
│
├── External APIs (called directly from browser)
│   ├── OMDB API         → movie/TV metadata
│   ├── Google Gemini    → AI chatbot responses
│   └── YouTube API      → trailer search
│
└── Static Assets (public/)
    ├── favicon, icons, manifest
    └── placeholder images
```

**Architecture Decision:** CineVerse has **no dedicated backend server**. All API calls are made directly from the browser using `NEXT_PUBLIC_*` environment variables. User data (watchlist, favorites, ratings) is persisted exclusively in `localStorage` — no database is used.

---

## 4. Folder Structure Explanation

```
cineverse/
│
├── .github/
│   ├── workflows/           # GitHub Actions CI/CD workflows
│   └── ISSUE_TEMPLATE/      # Standardized issue templates
│
├── public/                  # Static assets served at root URL
│   ├── favicon.ico/.svg     # App favicon
│   ├── icon-512.svg         # PWA icon
│   ├── apple-touch-icon.svg # iOS icon
│   ├── manifest.json        # PWA manifest
│   └── placeholder-movie.svg # Fallback movie poster
│
├── src/
│   ├── app/                 # Next.js 15 App Router
│   │   ├── layout.tsx       # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx         # Root page → redirects to /movies
│   │   ├── globals.css      # Global CSS (Tailwind base)
│   │   ├── providers.tsx    # Redux + React Query providers wrapper
│   │   ├── movies/
│   │   │   ├── page.tsx         # /movies — search & browse
│   │   │   ├── [id]/page.tsx    # /movies/:id — detail view
│   │   │   └── compare/page.tsx # /movies/compare — side-by-side compare
│   │   ├── tv-shows/page.tsx    # /tv-shows — TV series browse
│   │   ├── actors/
│   │   │   ├── page.tsx         # /actors — actor directory
│   │   │   └── [name]/page.tsx  # /actors/:name — actor profile
│   │   ├── genres/page.tsx      # /genres — genre browsing
│   │   ├── watchlist/page.tsx   # /watchlist — saved watchlist
│   │   ├── profile/page.tsx     # /profile — user profile & stats
│   │   ├── about/page.tsx       # /about — about page
│   │   ├── login/page.js        # /login — login UI (no auth backend)
│   │   ├── signup/page.js       # /signup — signup UI (no auth backend)
│   │   └── not-found.tsx        # 404 page
│   │
│   ├── components/          # Reusable React components
│   │   ├── ui/              # Generic UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── StarRating.tsx
│   │   ├── skeletons/       # Loading skeleton components
│   │   │   └── MovieCardSkeleton.tsx
│   │   ├── Header.tsx       # Global navigation header
│   │   ├── Footer.tsx       # Global footer
│   │   ├── MovieCard.tsx    # Movie/show card widget
│   │   ├── MovieGrid.tsx    # Grid layout for movie cards
│   │   ├── MovieSection.tsx # Section wrapper with title
│   │   ├── SearchBar.tsx    # Debounced search input
│   │   ├── SearchFilters.tsx # Filter controls (type, year, genre)
│   │   ├── ActorCard.tsx    # Actor profile card
│   │   ├── ActorGrid.tsx    # Grid layout for actor cards
│   │   ├── TrailerPlayer.tsx # YouTube trailer embed
│   │   ├── Chatbot.tsx      # Gemini AI floating chatbot
│   │   ├── CompareDrawer.tsx # Movie comparison slide-out drawer
│   │   ├── DarkModeToggle.tsx # Theme toggle button
│   │   ├── WatchlistButton.tsx # Add-to-watchlist toggle
│   │   ├── favoritesButton.tsx # Add-to-favorites toggle
│   │   ├── watchedButton.tsx   # Mark-as-watched toggle
│   │   ├── WatchlistSection.tsx
│   │   ├── WatchedSection.tsx
│   │   ├── FavoritesSection.tsx
│   │   ├── ProfileSection.tsx   # Profile stats & history
│   │   ├── StatChart.tsx        # Statistics charts
│   │   ├── ShareButton.tsx      # Social share
│   │   ├── ScrollToTopButton.tsx
│   │   ├── CustomTooltip.tsx
│   │   └── LoadingStates.tsx
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useMovieQueries.ts   # TanStack Query hooks for movie API
│   │   ├── useActorQueries.ts   # TanStack Query hooks for actor API
│   │   ├── useDebounce.ts       # Input debounce hook
│   │   └── useSearchHistory.ts  # Search history management
│   │
│   ├── lib/                 # Pure utility functions
│   │   ├── utils.ts         # General helpers (cn, formatters)
│   │   └── localStorageUtils.ts # Redux persist helpers
│   │
│   ├── providers/           # Context / provider components
│   │   └── ReactQueryProvider.tsx # TanStack Query client setup
│   │
│   ├── services/            # External API client modules
│   │   ├── movieApi.ts      # OMDB API wrapper
│   │   ├── actorApi.ts      # Static actor dataset + search logic
│   │   ├── trailerApi.ts    # YouTube Data API wrapper
│   │   └── gemini.ts        # Google Gemini API wrapper
│   │
│   ├── store/               # Redux Toolkit store
│   │   ├── store.ts         # Root store configuration
│   │   ├── movieSlice.ts    # Search query / results state
│   │   ├── watchlistSlice.ts # Watchlist state
│   │   ├── favoritesSlice.ts # Favorites state
│   │   ├── watchedSlice.ts   # Watched history state
│   │   └── compareMovieSlice.ts # Movie comparison state
│   │
│   └── types/               # TypeScript type definitions
│       └── movie.ts         # Movie, Actor, SearchResponse interfaces
│
├── Dockerfile               # Docker container definition
├── .dockerignore            # Docker build exclusions
├── next.config.ts           # Next.js configuration (image domains)
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript compiler options
├── eslint.config.mjs        # ESLint flat config
├── postcss.config.mjs       # PostCSS config
├── package.json             # Dependencies & scripts
└── .env.local               # Local environment variables (gitignored)
```

---

## 5. Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Redirects to `/movies` |
| `/movies` | `src/app/movies/page.tsx` | Movie search & browse |
| `/movies/[id]` | `src/app/movies/[id]/page.tsx` | Movie detail view |
| `/movies/compare` | `src/app/movies/compare/page.tsx` | Side-by-side movie compare |
| `/tv-shows` | `src/app/tv-shows/page.tsx` | TV series browse |
| `/actors` | `src/app/actors/page.tsx` | Actor directory |
| `/actors/[name]` | `src/app/actors/[name]/page.tsx` | Actor profile |
| `/genres` | `src/app/genres/page.tsx` | Genre browsing |
| `/watchlist` | `src/app/watchlist/page.tsx` | User watchlist |
| `/profile` | `src/app/profile/page.tsx` | User stats & history |
| `/about` | `src/app/about/page.tsx` | About CineVerse |
| `/login` | `src/app/login/page.js` | Login UI |
| `/signup` | `src/app/signup/page.js` | Signup UI |

---

## 6. Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_OMDB_API_KEY` | **Yes** | OMDB movie/TV data API |
| `NEXT_PUBLIC_GEMINI_API_KEY` | **Yes** | Google Gemini AI chatbot |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Optional | YouTube trailer search |

> All variables are prefixed `NEXT_PUBLIC_` which means they are embedded into the client-side JavaScript bundle at build time. **Never put secrets in `NEXT_PUBLIC_` variables.**

---

## 7. Key Findings & Observations

### Strengths
- Clean App Router structure with proper separation of concerns
- Comprehensive Redux store with localStorage persistence
- TanStack Query provides efficient caching and background refetching
- Tailwind dark mode (class strategy) implemented correctly
- Docker support out of the box
- Rich feature set: compare, favorites, watchlist, AI chat, trailers

### Areas for Improvement
- **No authentication backend** — Login/Signup pages are UI-only
- **No test suite** — Zero test files exist in the repo
- **Mixed JS/TS** — Some files use `.js` (login, signup, home pages) alongside `.tsx`
- **API keys exposed** — `NEXT_PUBLIC_*` keys are embedded in the client bundle
- **No rate limiting** — Direct browser-to-API calls with no proxy layer
- **Actor dataset is static** — Hardcoded list of 26 actors in `actorApi.ts`
- **Missing `NEXT_PUBLIC_YOUTUBE_API_KEY`** in `.env.local`

---

## 8. Deployment Readiness

| Check | Status |
|---|---|
| `npm run build` compatible | ✅ |
| Docker image defined | ✅ |
| `.env.example` | ❌ Missing (will be created) |
| CI/CD pipeline | ❌ Missing (will be created) |
| Test suite | ❌ Missing (will be created) |
| Production environment variables | ⚠️ Partially configured |
| Vercel deployment ready | ✅ (Next.js) |

---

*End of Project Analysis*
