
/* ======================================
   LOVE SURPRISE ❤️
====================================== */

const PASSWORD = "01042005";
const MAX_ATTEMPTS = 5;

let attempts = 0;
let locked = false;
let rainTimer = null;
let musicStarted = false;

/*
  CHANGE THESE FILENAMES TO YOUR VIDEOS.
  Keep the video files beside index.html.
*/
const videoFiles = [
  "Snapchat-578223551.mp4",
  "Snapchat-1002566367.mp4",
  "Snapchat-1334863849.mp4",
  "Snapchat-796184130.mp4"
];

const captions = [
  "A little moment to remember ❤️",
  "You make my world beautiful 💕",
  "My favorite person 💌",
  "A little piece of happiness 💗"
];

const $ = id => document.getElementById(id);

const login = $("loginScreen");
const opening = $("opening");
const surprise = $("surprise");
const passwordInput = $("password");
const unlockBtn = $("unlockBtn");
const error = $("error");
const attemptText = $("attemptText");
const music = $("music");
const musicBtn = $("musicBtn");
const universe = $("videoUniverse");
const rain = $("loveRain");

function show(element) {
  element.classList.remove("hidden");
}

function hide(element) {
  element.classList.add("hidden");
}

/* ======================================
   BIRTHDAY PASSWORD
====================================== */

function unlock() {
  if (locked) return;

  if (passwordInput.value.trim() === PASSWORD) {
    error.textContent = "";
    attemptText.textContent = "";
    passwordInput.value = "";

    hide(login);
    show(opening);
    return;
  }

  attempts++;
  passwordInput.value = "";
  error.textContent = "Not quite! Try again ❤️";

  if (attempts >= MAX_ATTEMPTS) {
    locked = true;
    unlockBtn.disabled = true;
    passwordInput.disabled = true;
    error.textContent = "Too many attempts. Reload to try again.";
    attemptText.textContent = "🔒 Locked";
  } else {
    attemptText.textContent =
      `${MAX_ATTEMPTS - attempts} attempts remaining`;
  }
}

unlockBtn.addEventListener("click", unlock);

passwordInput.addEventListener("keydown", event => {
  if (event.key === "Enter") unlock();
});

/* ======================================
   RANDOM FLOATING VIDEO POSITIONS
====================================== */

function shuffledPositions(count) {
  const positions = [
    { x: 4, y: 4, r: -7 },
    { x: 54, y: 8, r: 6 },
    { x: 26, y: 29, r: -3 },
    { x: 3, y: 53, r: 5 },
    { x: 56, y: 54, r: -6 },
    { x: 28, y: 72, r: 4 }
  ];

  // Shuffle positions each time the surprise opens.
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  return Array.from(
    { length: count },
    (_, i) => positions[i % positions.length]
  );
}

function buildVideoUniverse() {
  universe.replaceChildren();

  const positions = shuffledPositions(videoFiles.length);

  videoFiles.forEach((file, index) => {
    const pos = positions[index];

    const card = document.createElement("div");
    card.className = "floating-video";

    card.style.left = pos.x + "%";
    card.style.top = pos.y + "%";
    card.style.rotate = pos.r + "deg";
    card.style.zIndex = String(index + 1);
    card.style.animationDelay = (index * -0.45) + "s";

    const video = document.createElement("video");

    video.src = file;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";

    const tag = document.createElement("div");
    tag.className = "video-tag";
    tag.textContent = captions[index % captions.length];

    card.append(video, tag);
    universe.appendChild(card);

    video.play().catch(() => {
      tag.textContent = "Tap to play 💗";
    });

    // Tap to play or pause a video.
    // Videos remain muted so background music is separate.
    card.addEventListener("click", async () => {
      if (video.paused) {
        try {
          await video.play();
          card.classList.add("playing");
          tag.textContent = "I Love You ❤️";
        } catch {
          tag.textContent = "Video unavailable";
        }
      } else {
        video.pause();
        card.classList.remove("playing");
        tag.textContent = "Paused 💗";
      }
    });

    video.addEventListener("play", () => {
      card.classList.add("playing");
    });

    video.addEventListener("pause", () => {
      card.classList.remove("playing");
    });

    video.addEventListener("error", () => {
      tag.textContent = "Check video filename 💌";
    });
  });
}

/* ======================================
   BACKGROUND MUSIC
====================================== */

async function startMusic() {
  if (!music) return;

  music.volume = 0.65;

  try {
    await music.play();
    musicStarted = true;
    musicBtn.textContent = "♫ Music: On";
  } catch (error) {
    musicBtn.textContent = "♫ Tap to Play Music";
  }

  show(musicBtn);
}

musicBtn.addEventListener("click", async () => {
  if (!music) return;

  if (music.paused) {
    await startMusic();
  } else {
    music.pause();
    musicBtn.textContent = "♫ Music: Off";
  }
});

/* ======================================
   OPEN SURPRISE
====================================== */

$("openBtn").addEventListener("click", async () => {
  hide(opening);
  show(surprise);

  buildVideoUniverse();
  typeLetter();

  // Starts music from this user tap.
  await startMusic();
});

/* ======================================
   ANIMATED LOVE LETTER
====================================== */

const letter =
`There are a thousand things I could say...

You make ordinary days feel special.
Your smile makes little moments unforgettable.

I made this just for you, to remind you that you are loved,
you are special, and you mean more to me than you know.

Always remember that. ❤️`;

let typingToken = 0;

function typeLetter() {
  const target = $("letterText");
  const token = ++typingToken;

  target.textContent = "";

  let index = 0;

  function type() {
    if (token !== typingToken || index >= letter.length) return;

    target.textContent += letter[index++];
    setTimeout(type, 25 + Math.random() * 25);
  }

  type();
}

/* ======================================
   FALLING I LOVE YOU MESSAGES
====================================== */

const messages = [
  "I Love You ❤️ 💌",
  "Forever Mine 💗",
  "I Love You 💕",
  "My Favorite Person 💖",
  "You + Me ♾️❤️",
  "You make me smile 🥹",
  "Always and forever 💌"
];

function createLoveWord() {
  if (rain.children.length > 100) return;

  const word = document.createElement("div");

  word.className = "love-word";
  word.textContent =
    messages[Math.floor(Math.random() * messages.length)];

  word.style.left = Math.random() * 85 + "%";
  word.style.fontSize = 12 + Math.random() * 14 + "px";
  word.style.animationDuration = 5 + Math.random() * 6 + "s";

  rain.appendChild(word);

  setTimeout(() => word.remove(), 12000);
}

function startLoveRain() {
  for (let i = 0; i < 35; i++) {
    setTimeout(createLoveWord, i * 80);
  }

  if (!rainTimer) {
    rainTimer = setInterval(createLoveWord, 230);
  }
}

/* ======================================
   ACCEPT MY LOVE
====================================== */

$("finalBtn").addEventListener("click", () => {
  show($("loveAccepted"));
  startLoveRain();

  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 180]);
  }
});

/* ======================================
   REPLAY SURPRISE
====================================== */

$("replayBtn").addEventListener("click", () => {
  hide($("loveAccepted"));

  // Reposition videos for a fresh reveal.
  buildVideoUniverse();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (!musicStarted && music) {
    startMusic();
  }
});

console.log("Love Surprise loaded ❤️");
     
