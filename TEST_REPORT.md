# CineVerse — Test Report

> Generated: 2026-06-17  
> Test Runner: Jest 30  
> Environment: jsdom (browser simulation)

---

## Summary

| Metric | Value |
|---|---|
| Total Test Suites | 4 |
| Total Tests | 59 |
| Passed | **59** |
| Failed | 0 |
| Skipped | 0 |
| Duration | ~1.5 seconds |
| Result | **ALL PASSING** |

---

## Test Suites

### 1. `src/__tests__/utils.test.ts` — Utility Functions

Tests the `cn()` class-name utility and `searchHistoryUtils` helpers used throughout the app.

| Test | Status |
|---|---|
| cn() returns a single class unchanged | PASS |
| cn() merges multiple class names | PASS |
| cn() filters out falsy values | PASS |
| cn() resolves conflicting Tailwind classes (last wins) | PASS |
| cn() returns empty string when called with no args | PASS |
| formatRelativeTime() returns "Just now" for timestamps < 60s | PASS |
| formatRelativeTime() returns "5 minutes ago" for 5 min delta | PASS |
| formatRelativeTime() returns singular minute for 1 min | PASS |
| formatRelativeTime() returns hours ago for 3 hours delta | PASS |
| formatRelativeTime() returns days ago for 2 days delta | PASS |
| normalizeQuery() lowercases the query | PASS |
| normalizeQuery() trims surrounding whitespace | PASS |
| normalizeQuery() removes special characters | PASS |
| normalizeQuery() returns empty string for empty input | PASS |
| highlightMatch() wraps matching text in mark tag | PASS |
| highlightMatch() returns original text when query is empty | PASS |
| highlightMatch() is case-insensitive | PASS |

**Result: 17/17 PASS**

---

### 2. `src/__tests__/actorApi.test.ts` — Actor API Service

Tests the static actor dataset integrity and the `actorApi` search/retrieval functions.

| Test | Status |
|---|---|
| Dataset contains at least 20 actors | PASS |
| Every actor has a non-empty name | PASS |
| Every actor has at least one movie | PASS |
| Every actor has at least one genre | PASS |
| Every actor has a valid birth year | PASS |
| searchActors() returns results for known name | PASS |
| searchActors() is case-insensitive | PASS |
| searchActors() returns empty array for empty query | PASS |
| searchActors() returns empty array for unknown actor | PASS |
| searchActors() strips 'movies by' prefix | PASS |
| getMoviesByActor() returns movie list for known actor | PASS |
| getMoviesByActor() returns Response False for unknown actor | PASS |
| getMoviesByActor() each movie has required OMDB fields | PASS |
| getPopularActors() returns exactly 10 actors | PASS |
| getPopularActors() returns actors with name property | PASS |
| getActorDetails() returns actor for known name | PASS |
| getActorDetails() returns null for unknown actor | PASS |
| getActorDetails() is case-sensitive (exact match) | PASS |

**Result: 18/18 PASS**

---

### 3. `src/__tests__/redux.test.ts` — Redux Toolkit Slices

Tests the Redux state management slices for watchlist and favorites features.

| Test | Status |
|---|---|
| watchlistSlice: initial state is empty | PASS |
| watchlistSlice: addToWatchlist adds a movie | PASS |
| watchlistSlice: addToWatchlist does NOT add duplicate | PASS |
| watchlistSlice: addToWatchlist adds multiple distinct movies | PASS |
| watchlistSlice: removeFromWatchlist removes correct movie | PASS |
| watchlistSlice: removeFromWatchlist on non-existent ID is no-op | PASS |
| watchlistSlice: clearWatchlist empties the list | PASS |
| watchlistSlice: loadWatchlist replaces the entire list | PASS |
| favoritesSlice: initial state is empty | PASS |
| favoritesSlice: addToFavorites adds a movie | PASS |
| favoritesSlice: addToFavorites does NOT add duplicate | PASS |
| favoritesSlice: removeFromFavorites removes correct movie | PASS |
| favoritesSlice: clearFavorites empties the list | PASS |
| favoritesSlice: loadFavorites replaces the entire list | PASS |

**Result: 14/14 PASS**

---

### 4. `src/__tests__/movieApi.test.ts` — OMDB Movie API Service

Integration tests for the OMDB API wrapper using mocked fetch calls.

| Test | Status |
|---|---|
| searchMovies() returns results for valid query | PASS |
| searchMovies() returns empty results for "Movie not found!" | PASS |
| searchMovies() throws error for Invalid API key response | PASS |
| searchMovies() throws error on HTTP 500 status | PASS |
| searchMovies() includes search query in fetch URL | PASS |
| getMovieDetails() returns movie details for valid imdbID | PASS |
| getMovieDetails() includes imdbID in fetch URL | PASS |
| searchMoviesWithPagination() passes page parameter | PASS |
| searchMoviesWithPagination() defaults to page 1 | PASS |
| searchMoviesWithPagination() returns empty for not-found | PASS |

**Result: 10/10 PASS**

---

## Test Configuration

| Config | Value |
|---|---|
| Test runner | Jest 30 |
| Test environment | jsdom |
| Module resolution | `@/` → `src/` alias |
| Environment setup | `jest.env.ts` injects dummy API keys |
| Framework | next/jest (Next.js 15 integration) |

---

## Coverage Summary

Coverage collected from `src/**/*.{ts,tsx}` (excluding page/layout files):

| Category | Key Files Tested |
|---|---|
| Utility functions | `src/lib/utils.ts` |
| API services | `src/services/movieApi.ts`, `src/services/actorApi.ts` |
| Redux slices | `src/store/watchlistSlice.ts`, `src/store/favoritesSlice.ts` |
| Type definitions | `src/types/movie.ts` (via test data) |

---

## What Is NOT Covered

| Area | Reason |
|---|---|
| React components | Requires full component rendering with providers — future work |
| Gemini AI service | External API; mocking not yet implemented |
| YouTube trailer API | External API; mocking not yet implemented |
| compareMovieSlice | Logic similar to watchlist; planned for v2 |
| Login/Signup pages | UI-only pages with no logic to test |
| localStorage persistence | Requires localStorage mock setup |

---

## How to Run Tests

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Watch mode (re-runs on file changes)
npm run test:watch
```

---

## Next Steps for Test Coverage Improvement

1. Add component tests using `@testing-library/react` for `MovieCard`, `SearchBar`, `Header`
2. Add Redux integration tests using the configured store
3. Mock `localStorage` and test persistence behavior
4. Add E2E tests using Playwright or Cypress
5. Target ≥ 80% coverage for production readiness

---

*All 59 tests passing — test suite is healthy and CI-ready.*
