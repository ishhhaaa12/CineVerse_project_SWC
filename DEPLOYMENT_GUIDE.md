# CineVerse — Deployment Guide

> Production deployment instructions for Vercel (recommended), Netlify, and Docker.

---

## Architecture Note

CineVerse is a **pure frontend application** with no backend server or database:
- All API calls are made from the browser directly to OMDB, Gemini, and YouTube APIs
- User data (watchlist, favorites) lives in the browser's `localStorage`
- No database is needed — no provisioning required

This means deployment is simpler than a typical full-stack app.

---

## Recommended Deployment: Vercel

Vercel is the official hosting platform for Next.js and provides the best experience.

### Step 1 — Prepare the Repository

Ensure `.env.local` is listed in `.gitignore` (it already is):
```
.env*
.env.local
```

Ensure `.env.example` is committed (it now is).

### Step 2 — Push to GitHub

```bash
git add .
git commit -m "Production ready: add CI, tests, and deployment config"
git push origin master
```

### Step 3 — Connect Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Import your `cineverse` repository
4. Vercel auto-detects Next.js and sets the correct defaults

### Step 4 — Configure Environment Variables

In the Vercel dashboard → Settings → Environment Variables, add:

| Variable | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_OMDB_API_KEY` | your actual OMDB API key | Production, Preview, Development |
| `NEXT_PUBLIC_GEMINI_API_KEY` | your actual Gemini API key | Production, Preview, Development |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | your actual YouTube API key | Production, Preview, Development |

### Step 5 — Deploy

Click **Deploy**. Vercel will:
1. Run `npm ci`
2. Run `npm run build`
3. Deploy the `.next/` output to its global CDN

### Step 6 — Custom Domain (Optional)

In Vercel → Settings → Domains, add your custom domain (e.g., `cineverse.app`).

### Build Configuration

| Setting | Value |
|---|---|
| Framework | Next.js (auto-detected) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm ci` |
| Node.js Version | 22.x |

---

## Alternative: Netlify

### Setup

1. Go to [netlify.com](https://netlify.com) and sign in with GitHub
2. Click **Add new site → Import an existing project**
3. Connect your repository

### Build Settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | 22 |

### Netlify Configuration File

Create `netlify.toml` in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "22"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

Install the Netlify Next.js plugin:
```bash
npm install --save-dev @netlify/plugin-nextjs
```

### Environment Variables

In Netlify → Site configuration → Environment variables, add the same three variables as Vercel.

---

## Docker Deployment

Use this for self-hosted, VPS, or cloud VM deployments (AWS EC2, GCP Compute Engine, DigitalOcean Droplet).

### Build the Image

```bash
docker build -t cineverse:latest .
```

The Dockerfile:
```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Run with Environment Variables

```bash
docker run -d \
  --name cineverse \
  -p 80:3000 \
  -e NEXT_PUBLIC_OMDB_API_KEY="your_key" \
  -e NEXT_PUBLIC_GEMINI_API_KEY="your_key" \
  -e NEXT_PUBLIC_YOUTUBE_API_KEY="your_key" \
  --restart unless-stopped \
  cineverse:latest
```

### Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  cineverse:
    build: .
    ports:
      - "80:3000"
    environment:
      - NEXT_PUBLIC_OMDB_API_KEY=${NEXT_PUBLIC_OMDB_API_KEY}
      - NEXT_PUBLIC_GEMINI_API_KEY=${NEXT_PUBLIC_GEMINI_API_KEY}
      - NEXT_PUBLIC_YOUTUBE_API_KEY=${NEXT_PUBLIC_YOUTUBE_API_KEY}
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

---

## Environment Variables Reference

| Variable | Required | How to Get |
|---|---|---|
| `NEXT_PUBLIC_OMDB_API_KEY` | Yes | [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx) — free tier: 1k req/day |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Yes | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) — free tier available |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | No | [console.cloud.google.com](https://console.cloud.google.com) → YouTube Data API v3 |

---

## Production Checklist

### Before Deploying
- [ ] All environment variables set in the hosting platform
- [ ] `.env.local` NOT committed to git (verify with `git status`)
- [ ] `npm run build` succeeds locally with no errors
- [ ] `npm run lint` passes with no errors
- [ ] All 59 tests pass (`npm test`)
- [ ] OMDB API key is activated (check email)
- [ ] Gemini API key is valid

### After Deploying
- [ ] Production URL loads `/movies` correctly
- [ ] Movie search returns results (tests the OMDB API key)
- [ ] AI chatbot responds (tests the Gemini API key)
- [ ] Dark mode toggle works and persists
- [ ] Movie detail pages load with full info
- [ ] Watchlist add/remove works
- [ ] Compare feature works (add 2 movies, click compare)
- [ ] Mobile layout is responsive

### Performance
- [ ] Lighthouse performance score > 80
- [ ] First Contentful Paint < 2s
- [ ] Images are properly optimized (check Network tab)

---

## Domain & HTTPS

Both Vercel and Netlify provide:
- Free automatic HTTPS/TLS certificates via Let's Encrypt
- Automatic certificate renewal
- HTTP → HTTPS redirect

For custom domains, both platforms support:
- Apex domains (`cineverse.app`)
- Subdomains (`www.cineverse.app`)
- CNAME and A record configuration

---

## Deployment URLs

After a successful Vercel deployment:

| Environment | URL |
|---|---|
| Production | `https://cineverse.vercel.app` (or your custom domain) |
| Preview (PRs) | Auto-generated per PR, e.g., `https://cineverse-git-feature-xyz.vercel.app` |

---

## CI/CD Integration

The `.github/workflows/ci.yml` pipeline runs on every push and PR. To auto-deploy after CI passes:

**Vercel:** Automatically deploys on every push to `master` — no extra config needed.

**Netlify:** Add the Netlify CLI to CI or use Netlify's GitHub integration for auto-deploys.

---

## Updating the Application

```bash
# Make your code changes, then:
git add .
git commit -m "feat: your change description"
git push origin master
# → CI pipeline runs automatically
# → Vercel/Netlify deploys automatically on success
```
