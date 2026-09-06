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

## Read RSVP / Ucapan (guest submissions)
1. Go to **https://publicpagemy.github.io/aishah-jimie/admin.html**
2. Tap **Log masuk dengan Google** → choose **ainrazakk@gmail.com** (the only accounts allowed are ainrazakk@gmail.com and ain@pandai.org — anyone else gets "permission denied").
3. Top tiles: Hadir (responses), Jumlah pax, Tidak hadir, Ucapan.
4. **RSVP** tab: name, phone (tap = WhatsApp), hadir/tidak, pax, time. **Ucapan** tab: wishes.
5. Search box filters by name/phone/text. **Download CSV** exports the current tab (opens in Excel/Numbers). **Padam** deletes a row (asks to confirm).

Raw data: https://console.firebase.google.com/project/aishah-jimie/firestore/data → collections `rsvp` and `ucapan`.

Security rules are in `firestore.rules` (already published). To add another admin, add their email to `isAdmin()` and re-publish.

## Wording, colours, layout
`index.html` (text), `styles.css` (look), `app.js` (behaviour).
