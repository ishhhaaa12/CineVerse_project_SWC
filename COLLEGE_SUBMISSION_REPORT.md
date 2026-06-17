# CineVerse — College Submission Report

> **Course:** Web Development / Software Engineering  
> **Project Title:** CineVerse — Premium Movie Discovery Platform  
> **Author:** CineVerse Team  
> **Date:** 2026-06-17  
> **Repository:** GitHub — `cineverse`

---

## 1. Project Title & Objective

### Title
**CineVerse — A Premium Movie Discovery Web Application**

### Objective
To design, develop, and deploy a production-grade full-stack web application that enables users to:

1. Search and browse millions of movies and TV shows using the OMDB API
2. Explore actor filmographies and profiles
3. Manage personal watchlists, favorites, and viewing history
4. Compare movies side-by-side with detailed statistics
5. Interact with an AI-powered chatbot (Google Gemini) for personalized recommendations
6. View official movie trailers embedded from YouTube
7. Experience a polished, responsive UI with dark/light mode support

The project demonstrates proficiency in modern frontend development, external API integration, state management, CI/CD pipeline setup, and production deployment.

---

## 2. Technologies Used

### Core Framework
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.3.4 | Full-stack React framework with App Router |
| React | 19.1.1 | Component-based UI library |
| TypeScript | 5.9.2 | Type-safe JavaScript |
| Node.js | 22 (prod) / 18+ (dev) | JavaScript runtime |

### Frontend Libraries
| Technology | Purpose |
|---|---|
| TailwindCSS 3.4 | Utility-first CSS framework |
| Framer Motion | Smooth animations and transitions |
| Lucide React | Consistent icon set |
| Recharts | Data visualization (ratings, stats) |
| Chart.js + react-chartjs-2 | Additional chart components |

### State Management
| Technology | Purpose |
|---|---|
| Redux Toolkit | Global client state (watchlist, favorites, compare) |
| TanStack React Query v5 | Server state, API caching |
| localStorage | Browser-based data persistence |

### External APIs
| API | Purpose |
|---|---|
| OMDB API | Movie and TV show metadata, search |
| Google Gemini AI (2.0 Flash) | Intelligent movie recommendation chatbot |
| YouTube Data API v3 | Official movie trailer search and embed |

### DevOps & Tooling
| Technology | Purpose |
|---|---|
| GitHub Actions | CI/CD pipeline |
| Docker | Containerization |
| ESLint 9 | Code quality enforcement |
| Jest 30 | Unit and integration testing |
| Testing Library | React component testing utilities |

### Export & Utilities
| Technology | Purpose |
|---|---|
| jsPDF + html2canvas | PDF export of movie details |
| clsx + tailwind-merge | Conditional CSS class management |
| class-variance-authority | Component variant API |

---

## 3. Architecture

### Application Architecture
CineVerse follows a **JAMstack / Frontend-only** architecture:

```
Browser
  │
  ├── Next.js 15 (App Router)
  │     ├── Server-Side Rendering (SSR)
  │     ├── Static Generation where applicable
  │     └── Client-Side Navigation
  │
  ├── State Layer
  │     ├── Redux Toolkit Store (client state)
  │     ├── TanStack Query (API response caching)
  │     └── localStorage (persistence)
  │
  └── External APIs (direct browser calls)
        ├── OMDB API → movie/TV data
        ├── Google Gemini → AI chatbot
        └── YouTube API → trailers
```

**No dedicated backend server.** All data comes from external APIs, and all user data is stored in the browser's localStorage.

### Folder Structure
```
src/
├── app/          → Next.js pages (App Router)
├── components/   → Reusable UI components
├── hooks/        → Custom React hooks
├── lib/          → Pure utility functions
├── providers/    → Context providers
├── services/     → External API clients
├── store/        → Redux slices and store
└── types/        → TypeScript interfaces
```

### State Management Architecture
```
Redux Store
  ├── movies slice     → search state, query, results
  ├── watchlist slice  → saved watchlist (localStorage-synced)
  ├── favorites slice  → favorite movies (localStorage-synced)
  ├── watched slice    → viewing history (localStorage-synced)
  └── compare slice    → movies selected for comparison (localStorage-synced)
```

---

## 4. Features

### Core Features
| Feature | Implementation |
|---|---|
| Movie Search | Debounced OMDB API calls via `useDebounce` + TanStack Query |
| TV Shows Browse | OMDB API with `type=series` filter |
| Movie Details | Full metadata page with ratings, cast, awards, box office |
| Actor Profiles | Static dataset + OMDB movie data lookup |
| Movie Comparison | Redux-based selection + side-by-side statistics view |
| Watchlist | Redux slice + localStorage persistence |
| Favorites | Redux slice + localStorage persistence |
| Watched History | Redux slice + localStorage persistence |
| Star Rating | 5-star rating system stored in localStorage |
| AI Chatbot | Gemini 2.0 Flash via direct API call, floating UI widget |
| Trailer Player | YouTube iframe embed with scoring algorithm |
| PDF Export | html2canvas capture + jsPDF generation |
| Dark Mode | TailwindCSS class strategy, persisted to localStorage |
| Pagination | OMDB search pagination (10 results/page) |
| Skeleton Loading | Framer Motion animated loading states |
| Genre Browsing | Pre-defined genre categories with filtered search |
| Share Button | Web Share API with clipboard fallback |
| Scroll To Top | Animated scroll-to-top button |

### Pages
| Route | Feature |
|---|---|
| `/movies` | Search interface + browse |
| `/movies/[id]` | Full movie detail with trailer |
| `/movies/compare` | Side-by-side comparison |
| `/tv-shows` | TV series browse |
| `/actors` | Actor directory |
| `/actors/[name]` | Actor filmography profile |
| `/genres` | Genre-based discovery |
| `/watchlist` | Personal watchlist |
| `/profile` | Stats, charts, history |
| `/about` | Project about page |

---

## 5. CI/CD Setup

### GitHub Actions Workflow

**File:** `.github/workflows/ci.yml`

The pipeline triggers on:
- Every push to `master` / `main`
- Every pull request targeting `master` / `main`

### Pipeline Stages

| Stage | Tool | Description |
|---|---|---|
| Checkout | `actions/checkout@v4` | Clone repository with full git history |
| Setup Node | `actions/setup-node@v4` | Install Node.js 18.x and 22.x (matrix) |
| Install | `npm ci` | Reproducible, clean dependency install |
| Lint | `npm run lint` | ESLint code quality check |
| Type Check | `npx tsc --noEmit` | TypeScript strict compilation check |
| Test | `npm test --coverage` | Jest test suite with coverage report |
| Build | `npm run build` | Next.js production bundle compilation |
| Docker Build | `docker build` | Dockerfile validation (push to master only) |

### Matrix Strategy
The CI runs on **two Node.js versions**: 18.x (minimum supported) and 22.x (production Docker image). This ensures the app works across supported Node.js versions.

### Artifacts Saved
- **Coverage Report** — Jest code coverage (retained 30 days)
- **Build Artifact** — `.next/` production bundle (retained 7 days)

### CI/CD Screenshot Location
Screenshots of the CI workflow are stored in:
- `docs/screenshots/ci-yaml.png` — The CI YAML file
- `docs/screenshots/ci-success.png` — Successful workflow run

---

## 6. Testing Summary

### Test Framework
**Jest 30** with `next/jest` integration and jsdom test environment.

### Results
```
Test Suites: 4 passed, 4 total
Tests:       59 passed, 59 total
Time:        ~1.5 seconds
```

### Test Coverage by Suite

| Suite | Tests | What's Tested |
|---|---|---|
| `utils.test.ts` | 17 | CSS utilities, time formatting, text search helpers |
| `actorApi.test.ts` | 18 | Dataset integrity, search logic, actor retrieval |
| `redux.test.ts` | 14 | Watchlist & favorites state transitions |
| `movieApi.test.ts` | 10 | OMDB API wrapper with mocked fetch |

### Testing Approach
- **Unit tests:** Pure functions tested in isolation (utils, Redux reducers)
- **Integration tests:** API services tested with mocked `fetch` calls
- **Environment isolation:** Dummy API keys injected via `jest.env.ts` before module evaluation
- **No real network calls:** All external API calls are mocked

---

## 7. Deployment Strategy

### Primary Platform: Vercel

CineVerse is designed for **zero-configuration deployment on Vercel**:

1. Connect GitHub repository to Vercel
2. Set three environment variables in Vercel dashboard
3. Push to `master` → automatic deployment

**Why Vercel?**
- Native Next.js support (same team builds both)
- Automatic preview deployments per PR
- Global CDN edge network
- Automatic HTTPS
- Free tier available

### Alternative Deployments

| Platform | Use Case |
|---|---|
| Netlify | Alternative CDN hosting |
| Docker (self-hosted) | VPS, AWS EC2, GCP Compute Engine |
| Docker Compose | Multi-service setups |

### Production Architecture

```
User Browser
     │
     ▼
Vercel CDN (Global Edge Network)
     │
     ▼
Next.js Application
     │
     ├── OMDB API (movie data)
     ├── Google Gemini API (chatbot)
     └── YouTube API (trailers)
```

### Environment Variables in Production
All three API keys are set as environment variables in the hosting platform — never committed to the repository.

---

## 8. Future Scope

| Enhancement | Description | Priority |
|---|---|---|
| Authentication | Firebase Auth or NextAuth.js for user accounts | High |
| Backend API | Express/Fastify backend to proxy API calls (hide keys) | High |
| Database | MongoDB Atlas for user data (watchlist, ratings) | High |
| E2E Testing | Playwright or Cypress for full browser testing | Medium |
| PWA | Service worker for offline support | Medium |
| Recommendation Engine | ML-based movie recommendations | Medium |
| Social Features | Share watchlists with friends | Medium |
| TMDB Integration | Replace OMDB with TMDB for richer metadata | Medium |
| Actor Database | Expand from 26 to thousands of actors via API | Low |
| Advanced Filters | Filter by decade, language, streaming availability | Low |
| Notifications | Release alerts for anticipated movies | Low |
| Accessibility | ARIA improvements, keyboard navigation | High |

---

## 9. Conclusion

CineVerse demonstrates a complete, production-ready web application built with modern best practices:

- **Clean architecture** with clear separation of concerns
- **Type safety** throughout with TypeScript strict mode
- **Comprehensive state management** using Redux Toolkit and React Query
- **Automated CI/CD** pipeline with GitHub Actions
- **59 passing tests** covering utilities, API services, and Redux slices
- **Docker support** for containerized deployments
- **Production deployment** ready for Vercel

The project is actively maintained and follows open-source contribution practices with issue templates, pull request templates, and a code of conduct.

---

## Appendix A: File Inventory

| File | Purpose |
|---|---|
| `PROJECT_ANALYSIS.md` | Complete project analysis |
| `INSTALLATION_GUIDE.md` | Installation instructions |
| `RUNNING_GUIDE.md` | How to run the app |
| `DEPLOYMENT_GUIDE.md` | Deployment to Vercel/Netlify/Docker |
| `TEST_REPORT.md` | Full test suite results |
| `README.md` | Project overview and quick start |
| `.env.example` | Environment variable template |
| `.github/workflows/ci.yml` | CI/CD pipeline |
| `jest.config.ts` | Jest configuration |
| `jest.env.ts` | Test environment setup |
| `jest.setup.ts` | Jest matchers setup |
| `src/__tests__/utils.test.ts` | Utility function tests |
| `src/__tests__/actorApi.test.ts` | Actor API tests |
| `src/__tests__/redux.test.ts` | Redux slice tests |
| `src/__tests__/movieApi.test.ts` | Movie API integration tests |
| `docs/screenshots/README.md` | Screenshot capture guide |
| `Dockerfile` | Docker container definition |

---

*Report prepared for college submission — CineVerse v0.1.0*
