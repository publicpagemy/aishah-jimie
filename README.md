# Aishah & Najimie — Walimatul Urus e-invite

Live: https://publicpagemy.github.io/aishah-jimie/

## Change anything (no coding)
1. Open **config.js** on GitHub → pencil icon → edit → **Commit changes**.
2. Wait ~1 minute. Done.

Things you can change there: aturcara rows, contacts, hadiah (bank / account / QR / address), max pax, calendar text.

## Change photos
Replace `assets/photo1.jpg` / `assets/photo2.jpg` (upload files with the same names).
QR for hadiah: upload e.g. `assets/qr.png` and set `qrImage: 'assets/qr.png'` in config.js.

## Change music
Replace `assets/bgm.mp3`.

## Read RSVP / Ucapan
Firebase console → project **aishah-jimie** → Firestore Database → collections `rsvp` and `ucapan`.
Security rules are in `firestore.rules` (paste into Firestore → Rules → Publish).

## Wording, colours, layout
`index.html` (text), `styles.css` (look), `app.js` (behaviour).
