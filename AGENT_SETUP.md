# Agent setup: move castillo-contracting.com to GitHub Pages

You are setting up the Castillo Contracting website so it is served for free by
GitHub Pages from this repo (`nickavion/castillo-contracting`). Work through the
steps in order and tick the checklist at the bottom as you go.

## Background

- **Domain:** `castillo-contracting.com`, registered at **GoDaddy**. The owner
  can log in to GoDaddy. GoDaddy's site builder is **not** used.
- **Current site:** probably GitHub Pages, published from a GitHub account the
  owner is locked out of. That account and its repo are not available here.
- **Target:** this repo serves the site from the `main` branch, `/docs` folder,
  with the custom domain pointed at it through GoDaddy DNS.
- **Repo is currently private.** On a free GitHub plan, Pages only works on
  public repos. Making the repo public is the owner's call (step 4).
- The first copy of the site you commit is also the snapshot for a separate
  portfolio repo later, so commit it **exactly as downloaded** before changing
  anything (step 3).

## Layout

```
docs/                    the website (GitHub Pages serves this folder)
  CNAME                  custom domain, one line: castillo-contracting.com
  .nojekyll              tells Pages to serve files as-is (no Jekyll build)
scripts/mirror-site.sh   downloads the live site into docs/
AGENT_SETUP.md           this file
```

## Step 0: Find the old GitHub account (5 minutes, saves the most work)

The owner logs in to GoDaddy → **My Products** → `castillo-contracting.com` →
**DNS**, and reads off the records:

- `CNAME` record `www` → `SOMETHING.github.io`. `SOMETHING` is the old GitHub
  username.
- `A` records on `@` with `185.199.108.153` / `.109` / `.110` / `.111` confirm
  the site is on GitHub Pages.

**Write down every existing DNS record before changing anything.**

If you have the old username, open `https://github.com/SOMETHING?tab=repositories`
in a browser (no login needed). If the site's repo is **public**, download it
(green **Code** button → **Download ZIP**, or `git clone`). The original source
beats a mirrored copy, so use it in step 1A.

## Step 1: Get the site files into `docs/`

### 1A: From the old repo (preferred, if it is public)

1. Copy the repo's files into `docs/`.
2. Work out what kind of site it is:
   - **Plain HTML/CSS/JS** (an `index.html` at the top): copy as-is. Keep its
     `CNAME` file if it has one. Add an empty `docs/.nojekyll`.
   - **Jekyll** (`_config.yml`, `_layouts/`, `_posts/`): copy as-is and
     **do not** add `.nojekyll`, because Pages has to build it.
   - **Built by a framework** (`package.json` with React/Vite/Next/Astro etc.):
     either commit the built output (`dist/`, `build/` or `out/`) into `docs/`,
     or keep the source at the repo root and add a GitHub Actions workflow that
     builds and deploys to Pages. Pick the built-output route unless the owner
     plans to keep editing the source.
3. Make sure `docs/CNAME` contains exactly `castillo-contracting.com` (or
   whatever domain the old `CNAME` file used, if it had `www.` in front).

### 1B: Mirror the live site (if the old repo is private or gone)

From any computer with normal internet access (the cloud sandbox this repo was
prepared in could not reach the site):

```bash
git clone https://github.com/nickavion/castillo-contracting.git
cd castillo-contracting
bash scripts/mirror-site.sh            # writes into docs/
```

The script downloads every page linked from the home page or listed in
`sitemap.xml`, plus its CSS, JS, images and fonts. It rewrites links to relative
paths, writes `docs/CNAME` and `docs/.nojekyll`, and at the end lists other
hosts the pages still load from.

If wget cannot be installed, HTTrack (https://www.httrack.com, free, has a
Windows GUI) does the same job. Point it at `https://castillo-contracting.com`
and copy its output folder into `docs/`.

## Step 2: Check the copy before committing

1. Serve it locally: `python3 -m http.server 8000 --directory docs`, then
   open http://localhost:8000.
2. Click every page in the menu. Check that images, fonts and styles load, and
   that the browser console (F12) shows no 404s.
3. Look at the "other hosts" list from the mirror script (or search `docs/` for
   `http`). Anything served from the **old account** must be downloaded into
   `docs/` and the links repointed, or it disappears if that account is
   deleted. Examples: `raw.githubusercontent.com/OLDUSER/...`,
   `OLDUSER.github.io/...`, `user-images.githubusercontent.com`. Public CDNs
   (Google Fonts, cdnjs, jsDelivr) can stay.
4. Contact forms: note which service the form posts to. Netlify Forms do not
   work on GitHub Pages; Formspree, Getform, or a plain `mailto:` link do.
   Report a broken form to the owner rather than silently swapping services.

## Step 3: Commit the untouched copy and tag it

```bash
git add docs
git commit -m "Import castillo-contracting.com as downloaded"
git tag original-site
git push origin main --tags
```

The `original-site` tag is the snapshot for the future portfolio repo.

## Step 4: Turn on GitHub Pages

1. **Owner decision:** repo **Settings → General → Danger Zone → Change
   visibility → Public** (required on a free plan). Before doing it, check that
   nothing in the repo is secret (API keys, private documents).
2. Repo **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/docs** → Save.
   (Choose "GitHub Actions" instead only if you took the framework/Actions
   route in 1A.)
3. Wait about a minute, then open `https://nickavion.github.io/castillo-contracting/`
   to confirm it builds. Some links may look wrong at this URL because of the
   `/castillo-contracting/` path. That is fine, since it goes away once the
   custom domain is on.

## Step 5: Verify the domain on the new GitHub account

Do this **before** pointing DNS at the new site. It stops anyone else's repo
from claiming the domain, and it is how the new account wins it from the old
locked account.

1. GitHub **profile picture → Settings → Pages** (account settings, not repo
   settings) → **Add a domain** → `castillo-contracting.com`.
2. GitHub shows a TXT record. In GoDaddy DNS, **Add record**:
   - Type `TXT`, Name `_github-pages-challenge-nickavion`, Value: the code
     GitHub shows.
3. Back in GitHub, click **Verify** (DNS can take up to 24h, usually minutes).

## Step 6: Set the custom domain on the repo

Repo **Settings → Pages → Custom domain** → `castillo-contracting.com` → Save.
It must match `docs/CNAME`.

If GitHub says the domain is **already taken**, the old account's repo still
claims it. Finish step 5 first. If it is still taken after verification,
contact GitHub Support (https://support.github.com) with proof of domain
ownership (the verified TXT record / GoDaddy account).

## Step 7: Point GoDaddy DNS at GitHub Pages

GoDaddy → **My Products** → `castillo-contracting.com` → **DNS**.

| Type  | Name  | Value                                   |
|-------|-------|-----------------------------------------|
| A     | @     | 185.199.108.153                         |
| A     | @     | 185.199.109.153                         |
| A     | @     | 185.199.110.153                         |
| A     | @     | 185.199.111.153                         |
| AAAA  | @     | 2606:50c0:8000::153                     |
| AAAA  | @     | 2606:50c0:8001::153                     |
| AAAA  | @     | 2606:50c0:8002::153                     |
| AAAA  | @     | 2606:50c0:8003::153                     |
| CNAME | www   | nickavion.github.io                     |

- Remove any **other** `A` / `AAAA` records on `@` (for example GoDaddy's
  "Parked" record) and change the existing `www` CNAME from the old username to
  `nickavion.github.io`. A name can only have one CNAME.
- If the old site was already on GitHub Pages, the four `A` records are already
  correct. Only the `www` CNAME changes.
- **Do not touch** `MX` records (email), `TXT` records for SPF/DKIM/other
  verification, or `NS` records.
- If GoDaddy **Domain Forwarding** is turned on for this domain, turn it off.

## Step 8: HTTPS and final checks

1. Wait for DNS (minutes to a few hours). Repo **Settings → Pages** shows
   "DNS check successful" when ready.
2. Tick **Enforce HTTPS** once it is clickable (the certificate can take up to
   24h after DNS resolves).
3. Confirm all four load the site with a padlock:
   `https://castillo-contracting.com`, `https://www.castillo-contracting.com`,
   `http://castillo-contracting.com` (should redirect), and every menu page.
4. Confirm email still works if the domain has email (send a test message).

## Troubleshooting

- **"There isn't a GitHub Pages site here" (404):** Pages source is not
  `main` + `/docs`, `docs/index.html` is missing, or `docs/CNAME` doesn't match
  the custom domain setting.
- **Styles missing only on `nickavion.github.io/castillo-contracting/`:** the
  site uses root paths (`/css/...`). Expected; fine on the custom domain.
- **"Domain's DNS record could not be retrieved":** DNS not propagated yet, or
  conflicting records left over in GoDaddy. Re-check step 7.
- **Files starting with `_` return 404:** `docs/.nojekyll` is missing.

## Later (separate tasks, not part of this setup)

1. **Portfolio repo:** create a new repo from the `original-site` tag
   (`git archive original-site docs | tar -x -C ../portfolio`). Do **not** give
   it the custom domain; it lives at `nickavion.github.io/<repo>`.
2. **Rebrand this site** as a company site: company name, services, service
   area and "Get a quote" up front; a Projects gallery of completed jobs;
   license/insurance numbers, reviews and phone number; remove personal
   portfolio content (bio, resume, personal social links).

## Checklist

- [ ] Step 0: old DNS records written down; old GitHub username found (or not)
- [ ] Step 1: site files in `docs/` (from old repo or mirror)
- [ ] Step 2: copy checked locally; old-account assets pulled in
- [ ] Step 3: committed and tagged `original-site`
- [ ] Step 4: repo public (owner approved); Pages on `main` `/docs`
- [ ] Step 5: domain verified on the `nickavion` account
- [ ] Step 6: custom domain set on the repo
- [ ] Step 7: GoDaddy DNS updated (MX/TXT untouched)
- [ ] Step 8: HTTPS enforced; apex, www and all pages load
