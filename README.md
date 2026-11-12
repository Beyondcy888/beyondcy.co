# beyondcy.co

The public Beyondcy portfolio site: **Home, About, Work, Contact**. Built by the team with Next.js 15 (App Router, plain JavaScript, CSS Modules), exported as static files and deployed to GitHub Pages.

- **Live:** https://beyondcy888.github.io/beyondcy.co/ (later **https://beyondcy.co**, see `11_CONNECT_DOMAIN.md` in the tracker repo's `docs/`)
- **Repo:** `github.com/Beyondcy888/beyondcy.co`. This repo holds **only the portfolio**. The marketing dashboard is `Beyondcy888/beyondcy.co-dash` and the content tracker is `Beyondcy888/beyondcy.co-track`, whose `docs/` holds the project docs. The history before the split is kept here, and under the tag `pre-split-backup`.

The team's own README (Indonesian) is kept in [`docs/README-original.md`](docs/README-original.md): folder structure, components, where to change text and images, animations, the iPhone compatibility notes and the open placeholders. Read it before changing the design.

> **Local only:** `.original-from-team/` holds the team's project folder exactly as it was delivered (before it was adapted for GitHub Pages). It is git-ignored and not part of the site; delete it once the live site has been checked.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | The site on http://localhost:3000, reloading as you edit |
| `npm run build` | Production build: the whole site as static files in `out/` (this is what gets published) |
| `npm run lint` | ESLint |
| `npm run assets -- "<assets folder>"` | Re-creates the images and videos in `public/` from the original asset folder (needs `ffmpeg`) |

There is no `npm run start`: the site has no server. To look at a production build, serve `out/` with any static file server (for a build without `BASE_PATH`, Next.js itself suggests `npx serve@latest out`).

## Code map

```
app/            layout.js (fonts, page title), globals.css, icon.png (favicon), apple-icon.png,
                not-found.js (the 404 page: becomes out/404.html)
  (site)/       the four pages (Home, About, Work, Contact); they share the navbar
  _login/       the login page: kept, not published (see below)
components/     Navbar, Reveal (scroll animations), Orbit, ServiceCard, AboutVideo, ...
content/        ALL the text of the pages, and the list of logos / photos
lib/site.js     menu, WhatsApp + social links, and the helpers asset(), pageHref(), pageLinks(), siteUrl
public/         images, logos, videos (already optimised), .nojekyll
scripts/        prepare-assets.mjs
next.config.mjs static export + the base path
```

## The base path is one value

On github.io the site lives in the sub-folder `/beyondcy.co/`; at the domain it will live at the root. That sub-folder comes from **one variable, `BASE_PATH`**, set only in `.github/workflows/deploy.yml`:

`BASE_PATH` → `next.config.mjs` (`basePath`, and passed to the code as `NEXT_PUBLIC_BASE_PATH`) → `lib/site.js` (`basePath`, `asset()`, `siteUrl`).

- Next.js adds it by itself to page links (`next/link`), scripts, styles, fonts and the favicon.
- Files in `public/` need **`asset()`**: `<img src={asset("/clients/homy8.png")}>`, also for `<video>`, `poster` and `next/image` with a text `src`. The paths in `content/*.js` stay plain (`/clients/homy8.png`); the page wraps them when it draws them.
- Page links end with a `/` (`/about/`), because the export writes `about/index.html`. **`pageHref()`** adds it: `Navbar` and `PillButton` already use it, so the menu and `content/*.js` keep plain paths (`/about`); a `<Link>` written by hand needs `href={pageHref("/about")}`. Next.js normally does this itself, but that is switched off (`skipTrailingSlashRedirect` in `next.config.mjs`): it reads the `.co` of `/beyondcy.co` as a file extension and then links Home to an address GitHub Pages doesn't have.
- Don't put `url(/...)` to a `public/` file in a `.css` file: CSS does not get the base path. Use an `<img>` or an inline style with `asset()`.
- `siteUrl` (canonical link and `og:url`, through `pageLinks()`) follows it too: github.io with a base path, `https://beyondcy.co` without.
- Never type `/beyondcy.co` in the code. Locally the base path is empty.

To build the github.io version locally (PowerShell; in Git Bash the value gets rewritten into a Windows path, so use PowerShell):

```powershell
$env:BASE_PATH='/beyondcy.co'; npm run build; Remove-Item Env:BASE_PATH
```

Then serve `out/` so that it answers under `/beyondcy.co/`. Or run the dev server under the sub-path: `$env:BASE_PATH='/beyondcy.co'; npm run dev` → http://localhost:3000/beyondcy.co/

## The login page

Login page - not connected yet. Will be linked in a later update.

Its code is kept as the team wrote it (plus a one-line note at the top of each file) in `app/_login/`, with its text in `content/login.js`. The underscore keeps Next.js from publishing it, so there is no `/login` on the site, and the two Login buttons in `components/Navbar.js` and `loginHref` in `lib/site.js` are commented out. It is not connected to anything (no Supabase, no auth). To bring it back: rename the folder to `app/login`, un-comment those three places, and remove the login check in the workflow.

## Deploy (GitHub Pages)

**Push:** from the parent folder `Beyondcy-Web`, run `.\deploy.ps1 site`. It commits, refuses secret files and keys, pushes to this repo, and prints the live link.

On every push to `main`, `.github/workflows/deploy.yml` ("Deploy portfolio") runs `npm ci`, builds with `BASE_PATH=/beyondcy.co`, checks that `out/` has no `CNAME` and no login page, and publishes `out/`. It's live in about 1–2 minutes. No secrets are needed: the site has none.

One-time setup (owner): Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch": the repo holds the source, the site is built by the workflow). Custom domain: **leave empty** for now.

**No `CNAME` file yet:** it would make GitHub redirect the github.io link to a domain that isn't connected. When the domain is connected (file 11): delete the `BASE_PATH` line in the workflow (and its `CNAME` check if a `public/CNAME` is added), then set the custom domain and **Enforce HTTPS** in Settings → Pages. Nothing else changes: links, images and `og:url` follow the base path.
