# CineVerse — Running Guide

> How to run CineVerse locally, in Docker, and verify everything works.

---

## Quick Start

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your API keys

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to `/movies`.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack (hot reload) |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint on all source files |

---

## Development Mode

```bash
npm run dev
```

- Uses **Turbopack** for instant hot-module replacement
- Server starts at **http://localhost:3000**
- Changes to files in `src/` are reflected immediately
- API calls go directly to OMDB / Gemini / YouTube from the browser

**Verification checklist:**
- [ ] Browser opens without errors
- [ ] `/movies` page loads the search interface
- [ ] Typing "Inception" in the search bar returns movie results
- [ ] Clicking a movie card navigates to the detail page
- [ ] Dark mode toggle works (header button)
- [ ] AI chatbot opens (bottom-right floating button)

---

## Production Mode

Build the application first, then start:

```bash
# Step 1: Build
npm run build

# Expected output:
# ✓ Compiled successfully
# Route (app) ...
# ○ /movies — static pages listed

# Step 2: Start
npm run start
```

Production server runs at **http://localhost:3000** with:
- Optimized, minified JavaScript bundles
- Static page pre-rendering where applicable
- Image optimization via Next.js

---

## Docker Mode

```bash
# Build the image
docker build -t cineverse:latest .

# Run with your API keys
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_OMDB_API_KEY="your_omdb_key" \
  -e NEXT_PUBLIC_GEMINI_API_KEY="your_gemini_key" \
  -e NEXT_PUBLIC_YOUTUBE_API_KEY="your_youtube_key" \
  cineverse:latest

# Or use a .env file
docker run -p 3000:3000 --env-file .env.local cineverse:latest
```

The Dockerfile uses Node 22 Alpine and runs:
1. `npm install`
2. `npm run build`
3. `npm run start`

---

## Environment Variables Verification

After starting the dev server, verify your API keys work:

**OMDB API:**
```
Search for "Inception" → should return 10 results
```

**Gemini AI:**
```
Click the chatbot button (bottom-right) → type "recommend a thriller movie"
→ should get a response
```

**YouTube API (optional):**
```
Open any movie detail page → scroll to Trailer section
→ should show an embedded YouTube video
```

---

## Common Runtime Errors & Fixes

### Error: `OMDB API key is not configured`
**Fix:** Add `NEXT_PUBLIC_OMDB_API_KEY` to your `.env.local` and restart the dev server.

### Error: `NEXT_PUBLIC_GEMINI_API_KEY is not set`
**Fix:** Add `NEXT_PUBLIC_GEMINI_API_KEY` to your `.env.local` and restart the dev server.

### Error: `Invalid API key!` (from OMDB)
**Fix:** Your OMDB key may be incorrect or not yet activated (check your email for the activation link from OMDB).

### Error: Port 3000 already in use
```bash
# Run on a different port
npm run dev -- --port 3001
```

### Error: `Module not found` or import errors
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

### Error: Hydration mismatch
The dark mode script in `layout.tsx` runs before React hydrates. This is expected behavior and not an error. The warning can be suppressed with `suppressHydrationWarning` (already in place on `<html>`).

---

## Running Linter

```bash
npm run lint
```

ESLint is configured via `eslint.config.mjs` using the Next.js flat config. It checks:
- React hooks rules
- Import ordering
- TypeScript-specific rules
- Next.js best practices

---

## Application URL Map

| URL | What You See |
|---|---|
| http://localhost:3000 | Redirects to /movies |
| http://localhost:3000/movies | Movie search & browse |
| http://localhost:3000/movies/tt0468569 | The Dark Knight detail page |
| http://localhost:3000/movies/compare | Movie comparison tool |
| http://localhost:3000/tv-shows | TV series browse |
| http://localhost:3000/actors | Actor directory |
| http://localhost:3000/actors/Tom%20Hanks | Tom Hanks profile |
| http://localhost:3000/genres | Genre browsing |
| http://localhost:3000/watchlist | Your watchlist |
| http://localhost:3000/profile | Your profile & stats |
| http://localhost:3000/about | About page |
