/* ================= GLOBAL ================= */

const bgVideo = document.getElementById("bgVideo");
const bgMusic = document.getElementById("bgMusic");

const countdownPage = document.getElementById("countdownPage");
const passwordPage = document.getElementById("passwordPage");
const catPage = document.getElementById("catPage");
const menuPage = document.getElementById("menuPage");
const cameraPage = document.getElementById("cameraPage");

const pages = document.querySelectorAll(".page");

function showPage(page) {
  pages.forEach(p => p.classList.remove("active"));
  page.classList.add("active");
}

/* Enable music after first interaction (mobile fix) */
document.body.addEventListener(
  "click",
  () => bgMusic.play().catch(() => {}),
  { once: true }
);

/* ================= COUNTDOWN ================= */

const birthdayTime = new Date("Feb 14, 2026 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");

let countdownFinished = false;
let countdownInterval = null;

function startCountdown() {
  countdownInterval = setInterval(() => {
    const diff = birthdayTime - Date.now();

    if (diff <= 0) {
      clearInterval(countdownInterval);
      countdownFinished = true;
      showPage(passwordPage);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
  }, 1000);
}

/* ================= PASSWORD ================= */

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const errorMsg = document.getElementById("errorMsg");

unlockBtn.addEventListener("click", () => {
  const correctPassword = "mohithxkenpachi"; // CHANGE THIS

  if (!countdownFinished) return;

  if (passwordInput.value === correctPassword) {
    errorMsg.textContent = "";
    showPage(catPage);
    startCatSequence();
  } else {
    errorMsg.textContent = "Nahhh 😘 Try again, birthday boy";
  }
});

/* ================= CAT PAGE ================= */

const catText = document.getElementById("catText");
const catImage = document.getElementById("catImage");
const buttons = document.querySelector(".buttons");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

function startCatSequence() {
  buttons.classList.add("hidden");
  catText.style.opacity = 1;
  catText.textContent = "Happy Birthday Daddy 💜";

  setTimeout(() => {
    catText.style.opacity = 0;

    setTimeout(() => {
      catText.textContent = "Are you ready for the surprise? 👀";
      catText.style.opacity = 1;
      buttons.classList.remove("hidden");
    }, 800);
  }, 2000);
}

noBtn.addEventListener("click", () => {
  catImage.src = "assets/cat-knife.png";
  catText.textContent = "Say YES 😼🔪";
});

yesBtn.addEventListener("click", () => {
  catText.style.opacity = 0;

  setTimeout(() => {
    showPage(menuPage);
    catText.style.opacity = 1;
  }, 800);
});

/* ================= CAMERA PAGE ================= */

const cameraBgVideo = document.getElementById("cameraBgVideo");
const cameraMusic = document.getElementById("cameraMusic");

const cameraText = document.getElementById("cameraText");
const cameraContent = document.getElementById("cameraContent");
const cameraPhoto = document.getElementById("cameraPhoto");
const cameraPoem = document.getElementById("cameraPoem");
const cameraBackBtn = document.getElementById("cameraBackBtn");

/* Assets */
cameraBgVideo.src = "assets/camera-bg.mp4";
cameraMusic.src = "assets/camera-music.mp3";

const photos = [
  "assets/photos/1.jpg",
  "assets/photos/2.jpg",
  "assets/photos/3.jpg",
  "assets/photos/4.jpg",
  "assets/photos/5.jpg",
  "assets/photos/6.jpg",
  "assets/photos/7.jpg",
  "assets/photos/8.jpg",
  "assets/photos/9.jpg",
  "assets/photos/10.jpg"
];
const poems = [
  "I walked through days calling loneliness normal,\nUntil you arrived\nAnd proved it wasn’t. 🖤",

  "I thought you’d be a friend,\nLife corrected me gently \nYou became family. 💜",

  "I don’t know how the smile appears,\nIt just does\nEvery time I see you. ✨",

  "Before you, happiness felt distant,\nWith you, it sits beside me\nAnd breathes. 🤍",

  "When I’m low, you don’t lift me,\nYou simply exist\nAnd somehow, that’s enough. 🌙",

  "I don’t mirror your happiness,\nI share it\nThat’s how deep it runs. 🔥",

  "Best friend is too small a word,\nBrother fits better,\nBut even that feels incomplete. 🫂",

  "I don’t need many people,\nI just needed one\nWho felt like home. 🏠",

  "I don’t say ‘I love you’ loudly,\nBut every smile around you\nSays it for me. 💫",

  "If the world ever asks who stayed,\nI’ll say your name\nWithout hesitation. ♾️"
];



let photoIndex = 0;

function startCameraPage() {
  bgMusic.pause();

  cameraBgVideo.play();
  cameraMusic.currentTime = 0;
  cameraMusic.play().catch(() => {});

  cameraText.style.opacity = 1;
  cameraContent.style.opacity = 0;
  cameraPoem.style.opacity = 0;

  photoIndex = 0;

  setTimeout(() => {
    cameraText.style.opacity = 0;
    cameraContent.style.opacity = 1;
    showCameraPhoto();
  }, 2000);
}

function showCameraPhoto() {
  if (photoIndex >= photos.length) return;

  cameraPhoto.src = photos[photoIndex];

  cameraPoem.classList.remove("show");
  cameraPhoto.classList.remove("active");

  cameraPhoto.onclick = () => {
    cameraPhoto.classList.add("active");

    cameraPoem.textContent = poems[photoIndex];
    cameraPoem.classList.add("show");

    setTimeout(() => {
      cameraPhoto.classList.remove("active");
      cameraPoem.classList.remove("show");
      photoIndex++;
      showCameraPhoto();
    }, 6000);
  };
}

cameraBackBtn.addEventListener("click", () => {
  cameraMusic.pause();
  bgMusic.play().catch(() => {});
  showPage(menuPage);
});

/* ================= MENU ICON ================= */
/* Call this when camera icon is clicked */

const cameraIcon = document.getElementById("cameraIcon");

cameraIcon.addEventListener("click", () => {
  showPage(cameraPage);
  startCameraPage();
});

/* ================= INIT ================= */

startCountdown();
/* ================= VIDEO PAGE LOGIC ================= */

const videoPage = document.getElementById("videoPage");
const videoOverlay = document.getElementById("videoOverlay");
const surpriseVideo = document.getElementById("surpriseVideo");
const videoBackBtn = document.getElementById("videoBackBtn");
const giftBoxes = document.querySelectorAll(".gift-box");

/* MENU → VIDEO PAGE */
document.getElementById("videoIcon").addEventListener("click", () => {
  showPage(videoPage);
});

/* Gift box click */
giftBoxes.forEach(box => {
  box.addEventListener("click", () => {
    const videoSrc = box.dataset.video;

    /* Fade out bg music */
    bgMusic.volume = 1;
    const fadeOut = setInterval(() => {
      if (bgMusic.volume > 0.05) {
        bgMusic.volume -= 0.05;
      } else {
        bgMusic.pause();
        clearInterval(fadeOut);
      }
    }, 50);

    /* Show video */
    surpriseVideo.src = videoSrc;
    videoOverlay.style.display = "flex";
    videoBackBtn.style.display = "none";

    setTimeout(() => {
      surpriseVideo.play();
    }, 500);
  });
});

/* When video ends */
surpriseVideo.addEventListener("ended", () => {
  videoOverlay.style.display = "none";
  surpriseVideo.src = "";

  /* Fade bg music back */
  bgMusic.volume = 0;
  bgMusic.play().catch(()=>{});
  const fadeIn = setInterval(() => {
    if (bgMusic.volume < 1) {
      bgMusic.volume += 0.05;
    } else {
      clearInterval(fadeIn);
    }
  }, 50);

  videoBackBtn.style.display = "block";
});

/* Back to Menu */
videoBackBtn.addEventListener("click", () => {
  showPage(menuPage);
});
/* ================= ENVELOPE PAGE ================= */
document.addEventListener("DOMContentLoaded", () => {

  const envelopeIcon = document.getElementById("envelopeIcon");
  const envelopePage = document.getElementById("envelopePage");
  const envWrapper = document.getElementById("envWrapper");
  const letterText = document.getElementById("letterText");
  const letterPhotos = document.getElementById("letterPhotos");
  const envelopeNextBtn = document.getElementById("envelopeNextBtn");

  const envelopeBgVideo = document.getElementById("envelopeBgVideo");
  const envelopeMusic = document.getElementById("envelopeMusic");

  envelopeIcon.addEventListener("click", () => {
    bgMusic.pause();
    envelopeMusic.currentTime = 0;
    envelopeMusic.play().catch(()=>{});
    envelopeBgVideo.play();

    showPage(envelopePage);

    envWrapper.classList.remove("open");
    letterText.innerHTML = "";
    envelopeNextBtn.classList.add("hidden");
  });

  envWrapper.addEventListener("click", () => {
    if (envWrapper.classList.contains("open")) return;

    envWrapper.classList.add("open");
    letterPhotos.classList.add("show");
 const letterLines = [
  "Happy birthday, my dear brother.",
  "I never knew life could give me a bond like this; I’m so grateful and blessed.",
  "You are the biggest gem life has given me.",
  "Till 11th, I thought I had no one, but God kept me safe just for you bro.",
  "You truly deserve all the happiness in the world.",
  "No matter how big my problems are, spending even a little time with you makes me happy.",
  "I love seeing your smile, so keep smiling it makes me smile too.",
  "Please don’t leave, bruh.",
  "I’m a loyal bitch for you 😘",
  "— Jai Surya 💜"
];


    let i = 0;
    function revealText() {
      if (i >= letterLines.length) {
        envelopeNextBtn.classList.remove("hidden");
        return;
      }
      const p = document.createElement("p");
      p.textContent = letterLines[i++];
      letterText.appendChild(p);
      setTimeout(revealText, 700);
    }
    revealText();
  });

});
/* ================= FINAL VALENTINE LOGIC ================= */

const finalMusic = document.getElementById("finalMusic");

const valentinePage = document.getElementById("valentinePage");
const valentineYesPage = document.getElementById("valentineYesPage");

const valYes = document.getElementById("valYes");
const valNo = document.getElementById("valNo");

/* Messages for NO button */
const valMessages = [
  "Are you sure?",
  "Really sure??",
  "Pookie please...",
  "Think again 😭",
  "Don't break my heart 💔",
  "Say yes please ❤️"
];

let valIndex = 0;


/* Envelope → Valentine */
document.getElementById("envelopeNextBtn").addEventListener("click", () => {

  // Stop envelope music
  document.getElementById("envelopeMusic").pause();

  // Start final music
  finalMusic.currentTime = 0;
  finalMusic.play().catch(()=>{});

  // Show Valentine page
  showPage(valentinePage);
});


/* NO button logic */
valNo.addEventListener("click", () => {

  valNo.textContent = valMessages[valIndex];

  valIndex = (valIndex + 1) % valMessages.length;

  const size = parseFloat(
    window.getComputedStyle(valYes).fontSize
  );

  valYes.style.fontSize = (size * 1.4) + "px";
});


/* YES button logic */
valYes.addEventListener("click", () => {

  showPage(valentineYesPage);

});
