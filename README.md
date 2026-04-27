# The Daily Chronicle
A newspaper-style live news site built with React + Vite, deployed on Vercel with a serverless NewsAPI proxy.

---

## Project structure

```
daily-chronicle-react/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── api/
│   └── news.js              ← Vercel serverless proxy (keeps API key server-side)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.module.css
    ├── styles/
    │   └── global.css
    ├── hooks/
    │   └── useNews.js       ← Data fetching + auto-refresh hook
    ├── utils/
    │   └── articleHelpers.js
    └── components/
        ├── Masthead
        ├── BreakingTicker
        ├── HeroArticle
        ├── Sidebar
        ├── ArticleGrid
        ├── Skeleton
        ├── RefreshBar
        ├── StatusBanner
        └── Footer
```

---

## Running locally

### Prerequisites
- Node.js 18 or newer (`node -v` to check)
- npm (comes with Node)

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (Vite)
npm run dev
```

Open http://localhost:5173 in your browser.

> **Note on the API proxy in dev mode:**  
> The dev server proxies `/api/*` to `http://localhost:3001` by default (see `vite.config.js`).  
> The easiest way to run the proxy locally is with the **Vercel CLI**:

```bash
# Install Vercel CLI once
npm i -g vercel

# Run everything together (frontend + serverless function)
vercel dev
```

`vercel dev` starts the site at http://localhost:3000 and also runs `api/news.js` as a local function, pulling `NEWSAPI_KEY` from your linked Vercel project automatically.

---

## Deploy to Vercel

### 1. Get a free NewsAPI key
Sign up at https://newsapi.org/register — 30 seconds, no credit card.

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create daily-chronicle --public --push
# or create manually on github.com and push
```

### 3. Import to Vercel

1. Go to https://vercel.com/new
2. Click **Import Git Repository** → select your repo
3. Vercel auto-detects Vite. Leave all settings default.
4. Click **Deploy**

### 4. Add the environment variable

1. Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `NEWSAPI_KEY`
   - **Value:** your key from newsapi.org
   - **Environments:** ✓ Production ✓ Preview ✓ Development
3. Click **Save**
4. Go to **Deployments** → click the three dots on the latest → **Redeploy**

### 5. Done ✓

Your site is live at `https://your-project.vercel.app`

---

## How the proxy works

```
Browser  →  GET /api/news?category=technology
                    ↓
         Vercel Serverless Function  (api/news.js)
                    ↓   NEWSAPI_KEY never leaves the server
              newsapi.org
                    ↓
         JSON cached 5 min at CDN edge
                    ↓
              React renders articles
```

---

## Customising

| What to change | Where |
|---|---|
| Site name & tagline | `src/components/Masthead.jsx` |
| Accent colour (dark red) | `src/styles/global.css` → `--accent` |
| News country | `api/news.js` → `country = 'us'` |
| Auto-refresh interval | `src/hooks/useNews.js` → `REFRESH_INTERVAL` |
| Number of articles | `api/news.js` → `pageSize = 20` |
| Hero / sidebar / grid split | `src/App.jsx` → slice indices |

---

## Free tier limits

| Service | Free allowance |
|---|---|
| NewsAPI | 100 requests / day (developer tier) |
| Vercel Functions | 100,000 invocations / month |
| Vercel Bandwidth | 100 GB / month |

At 4 refreshes/day per visitor, you can serve ~25 daily visitors on the free NewsAPI tier. For more traffic, upgrade NewsAPI or increase the cache duration in `api/news.js`.
