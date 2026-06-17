# CineVerse — Installation Guide

> This guide covers every step needed to install and configure CineVerse from scratch on any machine.

---

## Prerequisites

| Requirement | Minimum Version | Check Command |
|---|---|---|
| Node.js | 18.x LTS or higher (22.x recommended) | `node --version` |
| npm | 9.x or higher | `npm --version` |
| Git | 2.x or higher | `git --version` |
| Docker (optional) | 20.x or higher | `docker --version` |

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-org>/cineverse.git
cd cineverse
```

---

## Step 2 — Verify Node.js Version

```bash
node --version
# Expected: v18.x.x or higher
```

If you need to manage multiple Node versions, use [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) or [nvm-windows](https://github.com/coreybutler/nvm-windows):

```bash
# Install and use the correct version
nvm install 22
nvm use 22
```

---

## Step 3 — Install Dependencies

```bash
npm install
```

This installs all packages defined in `package.json` including:

### Production Dependencies
| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.3.4 | Full-stack React framework |
| `react` / `react-dom` | ^19.1.1 | UI library |
| `@reduxjs/toolkit` | ^2.8.2 | State management |
| `react-redux` | ^9.2.0 | React–Redux bindings |
| `@tanstack/react-query` | ^5.81.2 | Server-state / data fetching |
| `axios` | ^1.12.2 | HTTP client |
| `framer-motion` | ^12.23.12 | Animations |
| `lucide-react` | ^0.523.0 | Icon library |
| `recharts` | ^3.1.0 | Charts |
| `react-chartjs-2` | ^5.3.0 | Chart.js wrapper |
| `@google/generative-ai` | ^0.24.1 | Gemini AI SDK |
| `tailwind-merge` | ^3.3.1 | CSS class utilities |
| `clsx` | ^2.1.1 | Conditional classes |
| `class-variance-authority` | ^0.7.1 | Component variants |
| `html2canvas` | ^1.4.1 | HTML to canvas |
| `jspdf` | ^3.0.1 | PDF generation |

### Dev Dependencies
| Package | Purpose |
|---|---|
| `typescript` | TypeScript compiler |
| `@types/react` / `@types/node` | Type definitions |
| `eslint` + `eslint-config-next` | Linting |
| `tailwindcss` + `postcss` | CSS processing |
| `@tailwindcss/forms` | Form styles |
| `@tailwindcss/typography` | Typography plugin |

---

## Step 4 — Configure Environment Variables

Copy the example environment file and fill in your API keys:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
# Required — get from https://www.omdbapi.com/apikey.aspx
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here

# Required — get from https://aistudio.google.com/app/apikey
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Optional — get from https://console.cloud.google.com (YouTube Data API v3)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
```

> See [API_SETUP.md](API_SETUP.md) for detailed API key setup instructions.

---

## Step 5 — Verify the Installation

Run the TypeScript type checker to confirm no type errors:

```bash
npx tsc --noEmit
```

Run ESLint to verify code quality:

```bash
npm run lint
```

---

## Troubleshooting Common Issues

### Issue: `npm install` fails with peer dependency errors

```bash
npm install --legacy-peer-deps
```

### Issue: `node_modules` is corrupted

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors on build

Make sure you have the correct TypeScript version:

```bash
npx tsc --version
# Should be 5.x
```

### Issue: TailwindCSS not applying styles

Ensure PostCSS config is correct. Delete `.next` cache and rebuild:

```bash
rm -rf .next
npm run build
```

### Issue: Environment variables not loading

- Ensure the file is named exactly `.env.local` (not `.env`)
- All CineVerse variables must be prefixed with `NEXT_PUBLIC_`
- Restart the dev server after changing `.env.local`

---

## Docker Installation (Alternative)

If you prefer Docker over a local Node.js setup:

```bash
# Build the Docker image
docker build -t cineverse .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_OMDB_API_KEY=your_key \
  -e NEXT_PUBLIC_GEMINI_API_KEY=your_key \
  -e NEXT_PUBLIC_YOUTUBE_API_KEY=your_key \
  cineverse
```

Access the app at [http://localhost:3000](http://localhost:3000).

---

## Verifying a Successful Installation

After `npm install` completes without errors:

1. Run `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. You should be redirected to `/movies`
4. The movie search bar should be visible
5. Searching for a movie (e.g., "Inception") should return results

If the movie search works, your installation is complete and correct.
