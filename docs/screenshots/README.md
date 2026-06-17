# CineVerse — CI/CD Screenshots

This directory stores screenshots required for college submission.

## Required Screenshots

| File | Description | Status |
|---|---|---|
| `ci-yaml.png` | Screenshot of `.github/workflows/ci.yml` open in VS Code or GitHub | Capture after push |
| `ci-success.png` | Screenshot of a successful GitHub Actions workflow run | Capture from GitHub Actions tab |

## How to Capture

### ci-yaml.png
1. Open `.github/workflows/ci.yml` in VS Code
2. Take a full-screen screenshot showing the complete YAML file
3. Save as `docs/screenshots/ci-yaml.png`

**OR** — after pushing to GitHub:
1. Navigate to your repository on GitHub
2. Go to the `.github/workflows/` directory
3. Click `ci.yml`
4. Take a screenshot of the rendered file view
5. Save as `docs/screenshots/ci-yaml.png`

### ci-success.png
1. Push your code to the `master` branch
2. Go to your GitHub repository
3. Click the **Actions** tab
4. Wait for the "CI — Lint, Test & Build" workflow to complete (green checkmark)
5. Click the workflow run to expand the details
6. Take a screenshot showing:
   - The workflow name
   - Green "Success" status
   - All job steps with green checkmarks
7. Save as `docs/screenshots/ci-success.png`

## Notes
- Screenshots must be PNG format
- Both screenshots are required for the college submission report
- The CI workflow must show a **passing** (green) run, not a failing one
