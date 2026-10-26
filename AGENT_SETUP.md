# Agent setup: clone castillo-contracting.com for local editing

## Goal

Make a complete local copy of **https://castillo-contracting.com** (every page, image,
stylesheet, script and font) that the owner can open and edit on their own computer,
then commit it to this repo.

The owner cannot get into the GoDaddy account that holds the domain and does not know
where the site is hosted. **Do not suggest account recovery.** They have already tried
it. The public website is the only source.

## Current status

The site has **not been downloaded yet**. The first attempt ran in a Claude cloud
sandbox whose network policy blocked `castillo-contracting.com` (and `web.archive.org`).
The site itself is live: a web search on 2026-10-26 showed it at
`https://castillo-contracting.com/`, titled "Castillo Contracting- For all your home
repair and maintenance needs".

The download scripts are written and were tested against a local test site.

## Before you start: check you can reach the site

```bash
curl -sSI https://castillo-contracting.com/ | head -5
```

- `HTTP/... 200` (or a 301/302 redirect): continue.
- `CONNECT tunnel failed, response 403` in a Claude cloud session: the environment's
  network policy blocks the domain. Have the owner open the environment settings and
  under **Network access** choose a broader level, or add `castillo-contracting.com`
  and `www.castillo-contracting.com` to **Allowed domains**. Also add the CDN host
  that step 2 finds, for example `img1.wsimg.com` for GoDaddy Website Builder.
  Docs: https://code.claude.com/docs/en/cloud-environments#network-access
  Running on the owner's own computer avoids this completely.

## Steps

### 1. Install tools

- `wget` and `curl` (macOS: `brew install wget`; Debian/Ubuntu: `apt-get install wget curl`;
  Windows: use WSL).
- Node.js 18 or newer, plus Playwright, for step 4 only:
  `npm install playwright && npx playwright install chromium`.

### 2. Download the site

```bash
bash scripts/mirror-site.sh
```

What it does:

- Reads `sitemap.xml`, `sitemap_index.xml` and `wp-sitemap.xml` to find pages the
  menus don't link to.
- Crawls the site and downloads every page and every asset, including assets on
  website-builder CDNs (GoDaddy, WordPress, Wix, Squarespace, Google Fonts).
- Rewrites links so the copy works offline.

Output in `site/`:

| Path | What it is |
|---|---|
| `site/raw/castillo-contracting.com/` | the browsable copy; start at `index.html` |
| `site/raw/<cdn-host>/` | images, fonts and CSS that came from CDNs |
| `site/urls.txt` | every page URL found |
| `site/headers.txt` | home-page HTTP headers |
| `site/wget.log` | full log; search for `ERROR` |

Exit code 8 from wget only means some URLs failed. Check `ERROR` lines in the log. One
broken image link that is also broken on the live site is fine. Anything else must be fixed.

### 3. Work out what platform built the site

The answer decides how the local copy can be edited and republished.

```bash
grep -iE '^(server|x-powered-by|x-generator|via|x-served-by):' site/headers.txt
grep -ioE '<meta name="generator"[^>]*>' -r site/raw | head
grep -oE 'https?://[a-z0-9.-]+' -r site/raw --include=*.html -h | sort | uniq -c | sort -rn | head -20
dig +short castillo-contracting.com A; dig +short castillo-contracting.com NS
whois "$(dig +short castillo-contracting.com A | head -1)" | grep -iE 'orgname|org-name|netname|descr'
```

Common signs:

- **GoDaddy Website Builder / Websites + Marketing:** `img1.wsimg.com` assets, a
  `generator` meta naming GoDaddy, or the IP belonging to GoDaddy. Pages are built from
  JavaScript, so **step 4 is required**. GoDaddy keeps no editable server files, so this
  copy becomes the source code.
- **WordPress:** `/wp-content/` paths and `generator` set to WordPress. The theme and
  database are on the server. The mirror is a static snapshot of the output.
- **Wix / Squarespace:** `wixstatic.com` or `squarespace-cdn.com` assets. Pages are
  built from JavaScript. Run step 4.
- **Plain HTML/CSS:** no generator and simple files. The mirror is already editable.

Write the result in a "Findings" section at the end of this file.

### 4. Capture the rendered pages (required for builder sites, recommended always)

```bash
node scripts/render-pages.cjs
```

For each URL in `site/urls.txt` this saves, under `site/rendered/<page>/`:

- `index.html`: the page HTML after JavaScript has run
- `page.png`: a full-page screenshot of how the live site looks (use this as the
  reference when rebuilding or checking edits)
- `text.txt`: all visible text, so wording can be edited easily

### 5. Check the copy is complete

1. Serve it locally and click through every page:
   ```bash
   cd site/raw && python3 -m http.server 8080
   # open http://localhost:8080/castillo-contracting.com/
   # (if the site redirects to www, the folder is www.castillo-contracting.com/)
   ```
   Opening the HTML files straight from disk can break some scripts and fonts. Use
   the local server.
2. Compare each page with its `site/rendered/<page>/page.png`. Text, images, menu,
   phone number, email, contact form and footer should all match.
3. Fix any gaps: a missing asset can be fetched with `wget -x -P site/raw <url>`.
4. Note what can't work offline. Contact forms that post to the builder's servers,
   embedded maps, booking and chat widgets need a new backend or embed code once the
   site moves to new hosting.

### 6. Make the editable version

If the mirror (`site/raw/...`) is clean HTML, the owner can edit it directly.

If it came from a website builder, the mirrored HTML will be heavy with builder
scripts and hard to edit. Build a clean, editable copy in `website/`:

- One HTML file per page, using `site/rendered/<page>/index.html`, `text.txt` and
  `page.png` as the reference.
- Copy images from `site/raw/` into `website/images/`.
- Keep the wording, images, colors, layout, phone numbers and email addresses
  exactly as they are on the live site. Don't invent or "improve" content.
- Add `website/README.md` telling the owner which file holds which page and how to
  preview it (`python3 -m http.server` inside `website/`).

### 7. Commit

Commit `site/` (and `website/` if you made it), plus the Findings in this file. If
the copy is very large (more than 100 MB), list the largest files with
`du -ah site | sort -rh | head -20` and ask the owner before committing videos.

## Publishing edits (tell the owner)

Editing locally does not change the live site. To put an edited version online at
`castillo-contracting.com`, the domain's DNS records must be pointed at new hosting
(for example Netlify, Cloudflare Pages or GitHub Pages, which can host these files).
That needs control of the domain at GoDaddy. Until then the edited site can go live
on a free subdomain from one of those hosts, or on a new domain.

## Findings

_(Fill in after step 3: platform, hosting provider/IP, number of pages, anything that
could not be captured.)_
