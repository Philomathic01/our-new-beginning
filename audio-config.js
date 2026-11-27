// Edit this file to customize songs and voice notes.
// Use relative paths, e.g. songs/my_song.mp3. Start is in seconds.
// Set file: "" to use the included original instrumental instead.
// Voice enabled: false hides that voice card. MP3 and M4A are supported by most phones.
const AUDIO_SETTINGS = {
  musicVolume: 0.38,
  fallback: "assets/ambient.wav",
  songs: [
    { file: "songs/chapter01.mp3", start: 0, volume: 0.38 }, // 1. Welcome
    { file: "songs/chapter02.mp3", start: 0, volume: 0.38 }, // 2. Wedding countdown
    { file: "songs/chapter03.mp3", start: 0, volume: 0.38 }, // 3. Secret envelope
    { file: "songs/chapter04.mp3", start: 0, volume: 0.38 }, // 4. First meeting
    { file: "songs/chapter05.mp3", start: 0, volume: 0.38 }, // 5. Friendship question
    { file: "songs/chapter06.mp3", start: 0, volume: 0.38 }, // 6. Heart to heart
    { file: "songs/chapter07.mp3", start: 0, volume: 0.38}, // 7. Promises
    { file: "songs/chapter08.mp3", start: 0, volume: 0.38 }, // 8. Future memories and bucket list
    { file: "songs/chapter09.mp3", start: 0, volume: 0.38 }, // 9. Love letter and poetry
    { file: "songs/chapter10.mp3", start: 0, volume: 0.38}, // 10. Grand finale
  ],
  voices: [
    { mount: "welcomeVoice", file: "voice/welcome.m4a", title: "A little hello from Kishan", enabled: true },
    { mount: "envelopeVoice", file: "voice/secret_letter.m4a", title: "A secret message inside the letter", enabled: true },
    { mount: "meetingVoice", file: "voice/first_meeting.m4a", title: "What I felt when I first saw you", enabled: true },
    { mount: "friendshipVoice", file: "voice/friendship.m4a", title: "A little wish for our friendship", enabled: true },
    { mount: "promisesVoice", file: "voice/promises.m4a", title: "My promises, in my own words", enabled: true },
    { mount: "poetryVoice", file: "voice/poetry.m4a", title: "A few lines, in my own voice", enabled: true },
    { mount: "finalVoice", file: "voice/final_message.m4a", title: "One last secret for my future wife", enabled: true },
  ]
};
