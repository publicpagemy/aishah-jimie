// ═══════════════════════════════════════════════════════════════════════════
//  EDIT THIS FILE to change the invitation. Nothing else needs touching.
//  On GitHub: open config.js → pencil icon (Edit) → change → "Commit changes".
//  The site updates itself about a minute later.
//  Keep the quotes; a comma at the end of each line.
// ═══════════════════════════════════════════════════════════════════════════
window.INVITE_CONFIG = {

  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  //  TERIMA KASIH POEM — paste it on the empty lines between the two ` marks.
  //  One line of the poem per line. A blank line = a pause between verses.
  poem: `Once, the days were wide
and neither knew
where the other was.

The years turned,
seasons passed,
and somewhere between
one quiet evening
and the next,
our paths began
to soften toward each other.

Perhaps love is not
the thunder of finding,
but the slow remembrance
of something
we did not know
we had been looking for.

And now,
with all our tomorrows
still unwritten,
we turn toward the years
the same way we found each other—

still becoming,
still wandering,
still finding our way
home to one another.


`,
 
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  event: {
    title: 'Walimatul Urus Aishah & Muhammad Najimie',
    start: '2026-11-15T11:00:00+08:00',
    end:   '2026-11-15T16:00:00+08:00',
    venue: 'Rumah Abang Jamil IPOH, Jalan Raja Dihilir, Ipoh, Perak, Malaysia',
    details: 'Dengan segala hormatnya menjemput Tuan/Puan ke Majlis Perkahwinan Aishah Binti Abdul Razak & Muhammad Najimie Bin Abdullah. #MieCintaiAishah',
  },
  maxPax: 6,            // largest number selectable in "Jumlah kehadiran"
  // Aturcara — add rows as { t: 'time', ms: 'Bahasa Melayu', en: 'English' }
  timeline: [
    { t: '11:00 AM', ms: 'Majlis bermula', en: 'Reception begins' },
    { t: '4:00 PM',  ms: 'Majlis berakhir', en: 'Reception ends' },
  ],
  contacts: [
    { name: 'Ain Razak',   phone: '0195593647' },
    { name: 'Afiq Razak',  phone: '0125386947' },
    { name: 'Abdul Razak', phone: '0172229785' },
  ],
  firebase: {
    apiKey: 'AIzaSyCBkP3-F7Yt_iMEbD2eRETnp5-42wZHz9E',
    authDomain: 'aishah-jimie.firebaseapp.com',
    projectId: 'aishah-jimie',
    storageBucket: 'aishah-jimie.firebasestorage.app',
    messagingSenderId: '1010276410178',
    appId: '1:1010276410178:web:31aacacfe4038f145a9edb',
  },
};
