SHIVANI & KISHAN — OUR NEW BEGINNING
Wedding: 28 February 2027 (countdown to midnight IST)

GET STARTED
1. Extract the entire ZIP into a folder. Do not open index.html from inside the ZIP.
2. Open index.html in Chrome or another modern browser. Tap the music icon to hear the welcome soundtrack, or tap Turn our first page to begin.
3. The original instrumental is included as a fallback. No commercial songs or personal voice recordings are included. Add your own audio before sharing.

ADD YOUR 10 SONGS
Copy permitted MP3 files into songs/ and rename them as below:
 chapter01.mp3 — Welcome
 chapter02.mp3 — Wedding countdown
 chapter03.mp3 — Secret envelope
 chapter04.mp3 — First meeting
 chapter05.mp3 — Friendship question
 chapter06.mp3 — Heart to heart
 chapter07.mp3 — Scratch-card promises
 chapter08.mp3 — Future memories and bucket list
 chapter09.mp3 — Love letter and Hindi poetry
 chapter10.mp3 — Grand finale
You can also use different filenames and edit audio-config.js accordingly.
Example: { file: "songs/my_song.mp3", start: 35, volume: 0.38 }
start = playback offset in seconds. volume = 0 to 1. Each chapter loops its track.
If a file is missing, the included instrumental is used instead. To use the instrumental intentionally, set file: "".
Tracks start following a visitor tap. Background tracks stop on navigation; new tracks fade in on browsers that allow software volume adjustment. iPhone volume controls may be hardware-only.

ADD YOUR VOICE NOTES
Use Voice Memos or a phone recorder in a quiet room. Copy M4A files into voice/:
 welcome.m4a
 secret_letter.m4a
 first_meeting.m4a
 friendship.m4a
 promises.m4a
 poetry.m4a
 final_message.m4a
MP3 works too: change the relevant filename in audio-config.js. Do not just rename a file extension; use the actual format.
Each voice card expands on tap, then plays on pressing Play. Music pauses during the voice note and resumes when it ends. Pausing, closing or leaving a voice card stops/pauses its playback. Missing recordings display a friendly message. Set enabled: false for any voice card you don't want to show.

OPTIONAL PHOTOS AND TEXT
Add photos/ files, then edit the CONFIG object inside index.html. For example, set "photo": "photos/first-meeting.jpg". The existing illustrations remain until you add pictures. Names, letter, promises, and wedding date are in CONFIG. The finale is My Future Wife.

SHARE
Test all chapters on your phone before sending. Upload the entire extracted website folder (not just index.html) to a static host such as Netlify Drop: https://app.netlify.com/drop. If local audio playback fails due to file restrictions, test via a local web server or the deployed HTTPS site. Share the generated link only with the intended recipient. Static hosting links and media may be accessible to anyone who has the URL; do not upload private recordings unless you are comfortable with the hosting privacy/access settings. Use music you have permission to publish.

No installation, backend, login or tracking is needed.
