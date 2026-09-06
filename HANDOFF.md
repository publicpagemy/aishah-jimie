# Aishah & Najimie e-invite — project handoff

Paste this file (or its path) into a new chat to continue with minimal context.

## Links
- Live invite: https://publicpagemy.github.io/aishah-jimie/
- Admin dashboard (RSVP + ucapan): https://publicpagemy.github.io/aishah-jimie/admin.html — sign in with Google as ainrazakk@gmail.com, aishahrzak53@gmail.com or aishahrazakk@gmail.com
- GitHub repo (owner `publicpagemy`): https://github.com/publicpagemy/aishah-jimie — Pages deploys from `main` / root, ~1 min after any commit
- Firebase project `aishah-jimie` (owner ainrazakk@gmail.com): https://console.firebase.google.com/project/aishah-jimie — Firestore collections `rsvp`, `ucapan`; Google sign-in enabled; authorized domain `publicpagemy.github.io`; rules published (guests create-only, admin read/delete)
- Local copy on Mac: `~/Projects/aishah-jimie` (git repo, remote set, not pushed via git — uploads were done through the GitHub web UI)

## What it is
Hogwarts-letter themed wedding e-invite. Walimatul Urus of Aishah binti Abdul Razak & Muhammad Najimie bin Abdullah, Sunday 15 Nov 2026, 11 AM–4 PM, Rumah Abang Jamil, Jalan Raja Dihilir, Ipoh. Bilingual BM/EN, all copy identical to the original aliveinvite.com/aishah-jimie page. Hashtag #MieCintaiAishah.

## Files (all static, no build step)
- `index.html` — intro + 9 tab pages (Salam, Pengantin, Aturcara, Lokasi, RSVP, Ucapan, Hadiah, Hubungi, Terima Kasih). Owl and envelope are inline SVG.
- `styles.css` — parchment theme (ink #3b2a1a, maroon #7a1f1f, gold #b8925a), fonts Cinzel / IM Fell English / Pinyon Script (Google Fonts). Textures are PNG data-URIs (no SVG filters — iOS perf).
- `app.js` — intro timeline, tab switching with footsteps transition, countdown, calendar links, Firestore (RSVP write, ucapan live list with optimistic insert).
- `config.js` — **the only file to edit for content**: event, aturcara rows, contacts, hadiah (bank/account/QR/address), maxPax, Firebase web config.
- `admin.html` — private dashboard: totals, RSVP/Ucapan tables, search, Download CSV, Padam (delete).
- `firestore.rules` — copy of the published rules. To add an admin, add the email to `isAdmin()` and re-publish in Firestore → Rules.
- `assets/` — bgm.mp3 (Hindia karaoke track, normalised, 96 kbps), photo1.jpg (formal, Pengantin page), photo2.jpg (playful, Terima Kasih page), venue.jpg (Lokasi), venue-sepia.jpg (Salam hero, logo kept, horse faded), og.jpg (WhatsApp preview), clouds.png / moon.png / stars.png (intro).
- `README.md` — same instructions in short.

## Intro sequence (matches the motionstamp TikTok reference)
Moon fades in → stars + moonlit clouds → distant owl silhouette crosses the moon (1.5 s) → copper-ink snowy owl flies toward the viewer with the letter (2.6–5.3 s) → letter tumbles down → "Buka Surat · Open Letter" (tap starts music) → white flash → first page pops in. Skip button at 3 s. Timings live in `runIntro()` in app.js; owl drawing is the `#owl` SVG in index.html (original drawing, not the WB Hedwig artwork).

## Tab transition
Every tab tap: Marauder's-Map footprints walk across the viewport (random curve), old page fades out, new page fades in under the trail. Opacity-only animation (Safari-safe), `walk()` + `go()` in app.js.

## How to change things
- Text/contacts/hadiah/aturcara: GitHub → `config.js` → pencil → edit → Commit. No chat needed.
- Photos/music: upload files with the same names into `assets/`.
- Wording/colours/layout: edit `index.html` / `styles.css` (or ask Claude).
- Delete a wish or RSVP: admin page → Padam.

## Workflow that worked with Claude (Cowork)
1. Claude edits files in its workspace, writes them to `~/Projects/aishah-jimie` (folder must be connected in the desktop app) and a single-file preview to `~/Downloads/preview-aishah-najimie.html`.
2. Review the preview in Safari/Chrome **on the Mac** (on iPhone the .html opens in Quick Look and runs no JS — use the live URL instead).
3. Publish: Claude stages the changed files from the Mac folder, then uses Claude in Chrome on github.com → "Upload files" → Commit. Large (>4 MB) single-file uploads get "You can't perform that action" — upload normal files instead.
- Chrome is logged into GitHub as `publicpagemy` and Firebase as Google account #2 (`/u/1/` in console URLs).
- iOS gotcha: never put `transform`/`filter` on `#phone` (breaks fixed tab bar/footsteps) and never put CSS `filter` on the map iframe (renders blank).
- Never solve TikTok captchas; TikTok/Instagram pages are read via the built-in browser pane, not WebFetch.

## Open items
- Hadiah details (bank / DuitNow QR / salam kaut address) still empty → page shows "Details coming soon".
- Two test entries named "Ujian Claude" (1 RSVP, 1 ucapan) to delete via admin → Padam.
- RSVP has a single slot (11 AM–4 PM); aturcara only lists start/end.
