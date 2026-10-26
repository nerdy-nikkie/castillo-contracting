#!/usr/bin/env bash
# Download a full, browsable copy of a website into ./site
#
# Usage:  bash scripts/mirror-site.sh [URL]
# Default URL: https://castillo-contracting.com/
#
# Output:
#   site/raw/        the downloaded site (open site/raw/<domain>/index.html)
#   site/urls.txt    every page URL found (crawl + sitemap)
#   site/headers.txt HTTP headers of the home page (hints at the hosting platform)
#   site/wget.log    full download log

set -uo pipefail

URL="${1:-https://castillo-contracting.com/}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/site"
RAW="$OUT/raw"

# BASE = scheme + host (+ port), HOST = bare host name without "www."
BASE="$(printf '%s' "$URL" | sed -E 's#^([a-zA-Z]+://[^/]+).*#\1#')"
HOST="$(printf '%s' "$BASE" | sed -E 's#^[a-zA-Z]+://##; s#:[0-9]+$##; s#^www\.##')"

# Sites built on website builders keep images, fonts and CSS on separate CDN
# hosts. Allow those so the copy has every asset, not just the HTML.
DOMAINS="$HOST,www.$HOST"
DOMAINS="$DOMAINS,wsimg.com,img1.wsimg.com,img.secureserver.net"   # GoDaddy Website Builder
DOMAINS="$DOMAINS,wp.com,i0.wp.com,i1.wp.com,i2.wp.com"            # WordPress / Jetpack
DOMAINS="$DOMAINS,wixstatic.com,parastorage.com"                    # Wix
DOMAINS="$DOMAINS,squarespace-cdn.com,sqspcdn.com"                  # Squarespace
DOMAINS="$DOMAINS,fonts.googleapis.com,fonts.gstatic.com"           # Google Fonts
DOMAINS="$DOMAINS,cdnjs.cloudflare.com,cdn.jsdelivr.net,unpkg.com"  # common JS/CSS CDNs

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

command -v wget >/dev/null || { echo "wget is required (mac: brew install wget)"; exit 1; }
command -v curl >/dev/null || { echo "curl is required"; exit 1; }

mkdir -p "$RAW"
echo "Mirroring $URL into $RAW"

# 1. Save home page headers (the Server / X-Powered-By lines show the platform).
curl -sSIL -A "$UA" "$URL" > "$OUT/headers.txt" 2>&1 || true

# 2. Collect page URLs from sitemap.xml so pages not linked from menus are included.
: > "$OUT/sitemap-urls.txt"
extract_locs() { tr '<' '\n' | sed -n 's#^loc>[[:space:]]*##p' | sed 's/[[:space:]]*$//; s/&amp;/\&/g'; }
for sm in sitemap.xml sitemap_index.xml wp-sitemap.xml; do
  body="$(curl -sSL -A "$UA" --max-time 30 "$BASE/$sm" 2>/dev/null || true)"
  case "$body" in *"<loc>"*) ;; *) continue ;; esac
  printf '%s\n' "$body" | extract_locs | while read -r loc; do
    case "$loc" in
      *.xml|*.xml\?*)  # nested sitemap: read the pages inside it
        curl -sSL -A "$UA" --max-time 30 "$loc" 2>/dev/null | extract_locs ;;
      *) printf '%s\n' "$loc" ;;
    esac
  done >> "$OUT/sitemap-urls.txt"
done
sort -u -o "$OUT/sitemap-urls.txt" "$OUT/sitemap-urls.txt"
echo "Sitemap pages found: $(wc -l < "$OUT/sitemap-urls.txt" | tr -d ' ')"

# 3. Crawl. Start URLs = home page + every sitemap page.
{ echo "$URL"; cat "$OUT/sitemap-urls.txt"; } | sort -u > "$OUT/start-urls.txt"

wget \
  --recursive --level=10 --timestamping \
  --page-requisites \
  --convert-links \
  --adjust-extension \
  --span-hosts --domains="$DOMAINS" \
  --restrict-file-names=windows \
  --execute robots=off \
  --user-agent="$UA" \
  --wait=0.5 --random-wait \
  --tries=3 --timeout=30 \
  --directory-prefix="$RAW" \
  --input-file="$OUT/start-urls.txt" \
  --output-file="$OUT/wget.log"
WGET_STATUS=$?
# wget exit 8 = some URLs returned errors (e.g. a missing image). The copy is still usable.

# 4. List every page that was downloaded.
grep -Eo '^--[0-9-]+ [0-9:]+--  https?://[^ ]+' "$OUT/wget.log" \
  | awk '{print $3}' \
  | grep -E "^https?://(www\.)?${HOST//./\\.}(:[0-9]+)?(/|$)" \
  | grep -Ev '\.(css|js|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|eot|mp4|pdf|xml|json)(\?|$)' \
  | sort -u > "$OUT/urls.txt"

echo
echo "Done (wget exit code $WGET_STATUS; 0 = clean, 8 = some files missing, see site/wget.log)."
echo "Pages:  $(wc -l < "$OUT/urls.txt" | tr -d ' ')   (list in site/urls.txt)"
echo "Files:  $(find "$RAW" -type f | wc -l | tr -d ' ')"
echo "Errors: $(grep -c 'ERROR' "$OUT/wget.log" || true)"
echo "Open:   $(find "$RAW" -maxdepth 2 -path "*$HOST*" -name 'index.html' | head -1)"
