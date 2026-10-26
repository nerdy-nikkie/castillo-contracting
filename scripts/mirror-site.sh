#!/usr/bin/env bash
# Download a full static copy of the live site into docs/ so GitHub Pages can
# serve it from the main branch's /docs folder.
#
# Usage: scripts/mirror-site.sh [domain] [output-dir]
#   domain      defaults to castillo-contracting.com
#   output-dir  defaults to docs (relative to the repo root)
# Set FORCE=1 to mirror into an output dir that already has files.
set -euo pipefail

DOMAIN="${1:-castillo-contracting.com}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/${2:-docs}"

if ! command -v wget >/dev/null 2>&1; then
  echo "wget is required. Install it first:" >&2
  echo "  macOS:   brew install wget" >&2
  echo "  Ubuntu:  sudo apt-get install wget" >&2
  echo "  Windows: run this script inside WSL or Git Bash with wget installed" >&2
  exit 1
fi

if [ -d "$OUT" ] && [ -n "$(ls -A "$OUT" 2>/dev/null)" ] && [ "${FORCE:-0}" != "1" ]; then
  echo "$OUT already has files. Re-run with FORCE=1 to mirror into it anyway." >&2
  exit 1
fi
mkdir -p "$OUT"

# Seed with the home page plus anything listed in the sitemap, so pages that
# nothing links to are still captured.
SEEDS="$(mktemp)"
trap 'rm -f "$SEEDS"' EXIT
echo "https://$DOMAIN/" >"$SEEDS"
for extra in 404.html robots.txt sitemap.xml favicon.ico; do
  echo "https://$DOMAIN/$extra" >>"$SEEDS"
done
if sitemap="$(wget -qO- "https://$DOMAIN/sitemap.xml" 2>/dev/null)"; then
  printf '%s\n' "$sitemap" | grep -oE '<loc>[^<]+</loc>' | sed -E 's#</?loc>##g' >>"$SEEDS" || true
fi

echo "Mirroring https://$DOMAIN into $OUT ..."
# wget exits non-zero when any single file 404s; check the result below instead.
wget \
  --mirror \
  --page-requisites \
  --convert-links \
  --adjust-extension \
  --no-parent \
  --span-hosts \
  --domains="$DOMAIN,www.$DOMAIN" \
  --no-host-directories \
  --directory-prefix="$OUT" \
  --execute robots=off \
  --wait=1 --random-wait \
  --user-agent="Mozilla/5.0 (site backup)" \
  --input-file="$SEEDS" || true

if [ ! -f "$OUT/index.html" ]; then
  echo "No index.html was downloaded. Check that https://$DOMAIN loads in a browser." >&2
  exit 1
fi

# GitHub Pages needs CNAME for the custom domain. .nojekyll keeps Pages from
# dropping files and folders that start with an underscore (e.g. _next/).
[ -f "$OUT/CNAME" ] || echo "$DOMAIN" >"$OUT/CNAME"
touch "$OUT/.nojekyll"

echo
echo "Done. $(find "$OUT" -type f | wc -l | tr -d ' ') files saved in $OUT"
echo
echo "Other hosts the pages still load from (download anything that belonged to"
echo "the old site or old GitHub account, then repoint the links):"
grep -rhoE 'https?://[A-Za-z0-9.-]+' "$OUT" --include='*.html' --include='*.css' --include='*.js' 2>/dev/null \
  | sed -E 's#https?://##' | grep -viE "(^|\.)$DOMAIN\$" | sort | uniq -c | sort -rn || true
