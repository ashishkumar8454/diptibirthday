"use strict";

/* ===========================================================
    SEAMLESS CONTINUOUS MULTI-SONG PLAYLIST (WITH STATE SAVING)
=========================================================== */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const nextSongBtn = document.getElementById("nextSongBtn");
const prevSongBtn = document.getElementById("prevSongBtn");

// 🎵 Aapki Music Playlist
const playlist = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3",
    "music/song4.mp3"
];

// Load saved state from LocalStorage or set defaults
let currentSongIndex = parseInt(localStorage.getItem("currentSongIndex")) || 0;
let isMusicPlaying = localStorage.getItem("isMusicPlaying") === "true";
let savedTime = parseFloat(localStorage.getItem("musicCurrentTime")) || 0;

function syncMusicState() {
    if (!bgMusic) return;

    // Check if song source changed
    const targetSrc = playlist[currentSongIndex];
    if (!bgMusic.src.includes(targetSrc)) {
        bgMusic.src = targetSrc;
        bgMusic.currentTime = savedTime;
    } else if (Math.abs(bgMusic.currentTime - savedTime) > 2) {
        bgMusic.currentTime = savedTime;
    }

    bgMusic.volume = 0.6;

    if (isMusicPlaying) {
        bgMusic.play().then(() => {
            if (musicToggle) musicToggle.classList.add("playing");
        }).catch(() => {
            if (musicToggle) musicToggle.classList.remove("playing");
        });
    } else {
        bgMusic.pause();
        if (musicToggle) musicToggle.classList.remove("playing");
    }
}

// Constantly save current time before leaving page
window.addEventListener("beforeunload", () => {
    if (bgMusic) {
        localStorage.setItem("musicCurrentTime", bgMusic.currentTime);
        localStorage.setItem("isMusicPlaying", !bgMusic.paused);
        localStorage.setItem("currentSongIndex", currentSongIndex);
    }
});

// Periodic save every 500ms
setInterval(() => {
    if (bgMusic && !bgMusic.paused) {
        localStorage.setItem("musicCurrentTime", bgMusic.currentTime);
    }
}, 500);

function toggleAudio() {
    if (!bgMusic) return;
    if (bgMusic.paused) {
        isMusicPlaying = true;
        localStorage.setItem("isMusicPlaying", "true");
        bgMusic.play().then(() => {
            if (musicToggle) musicToggle.classList.add("playing");
        }).catch(() => {});
    } else {
        isMusicPlaying = false;
        localStorage.setItem("isMusicPlaying", "false");
        bgMusic.pause();
        if (musicToggle) musicToggle.classList.remove("playing");
    }
}

// ⏭️ Next Song (Circular Loop)
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    savedTime = 0;
    localStorage.setItem("currentSongIndex", currentSongIndex);
    localStorage.setItem("musicCurrentTime", 0);
    localStorage.setItem("isMusicPlaying", "true");
    isMusicPlaying = true;
    syncMusicState();
}

// ⏮️ Previous Song (Circular Loop)
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    savedTime = 0;
    localStorage.setItem("currentSongIndex", currentSongIndex);
    localStorage.setItem("musicCurrentTime", 0);
    localStorage.setItem("isMusicPlaying", "true");
    isMusicPlaying = true;
    syncMusicState();
}

if (musicToggle) musicToggle.addEventListener("click", toggleAudio);
if (nextSongBtn) nextSongBtn.addEventListener("click", playNextSong);
if (prevSongBtn) prevSongBtn.addEventListener("click", playPrevSong);

if (bgMusic) {
    bgMusic.addEventListener("ended", playNextSong);
}

// Initial Sync when Page Loads
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isMusicPlaying") === null) {
        localStorage.setItem("isMusicPlaying", "true");
        isMusicPlaying = true;
    }
    syncMusicState();
});

/* ===========================================================
        1ST AUGUST BIRTHDAY COUNTDOWN TIMER (Home Page)
=========================================================== */
const countdownClock = document.getElementById("countdownClock");

function updateCountdownTimer() {
    if (!countdownClock) return;

    const now = new Date();
    let currentYear = now.getFullYear();
    let birthdayDate = new Date(`August 1, ${currentYear} 00:00:00`);

    if (now > birthdayDate && now.getDate() !== 1) {
        birthdayDate = new Date(`August 1, ${currentYear + 1} 00:00:00`);
    }

    const diff = birthdayDate - now;

    if (now.getMonth() === 7 && now.getDate() === 1) {
        countdownClock.textContent = "🎉 It's Birthday Time! Happy Birthday Dipti! 🎂❤️";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const d = String(days).padStart(2, '0');
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');

    countdownClock.textContent = `${d}d : ${h}h : ${m}m : ${s}s`;
}

if (countdownClock) {
    setInterval(updateCountdownTimer, 1000);
    updateCountdownTimer();
}

/* ===========================================================
                LOADER (index.html)
=========================================================== */
const loader = document.getElementById("loader");
const loadingFill = document.querySelector(".loading-fill");
const loadingText = document.querySelector(".loader-content p");

if (loader) {
    let percent = 0;
    document.body.style.overflow = "hidden";
    const loaderTimer = setInterval(() => {
        percent++;
        if (loadingFill) loadingFill.style.width = percent + "%";
        if (loadingText) loadingText.textContent = "Loading " + percent + "% 💖";
        
        if (percent >= 100) {
            clearInterval(loaderTimer);
            setTimeout(() => {
                loader.style.transition = "all .8s ease";
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.style.display = "none";
                    document.body.style.overflow = "auto";
                }, 800);
            }, 500);
        }
    }, 25);
}

/* ===========================================================
            QUESTION PAGE: ANTI-OVERLAP NO BUTTON
=========================================================== */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const buttonArea = document.querySelector(".button-area");

if (noBtn && buttonArea && yesBtn) {
    let noCount = 0;
    
    function moveNoButton() {
        const areaRect = buttonArea.getBoundingClientRect();
        const yesRect = yesBtn.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth || 100;
        const btnHeight = noBtn.offsetHeight || 50;

        let x, y, isOverlapping;
        let attempts = 0;

        do {
            x = Math.random() * (areaRect.width - btnWidth);
            y = Math.random() * (areaRect.height - btnHeight);

            const proposedLeft = areaRect.left + x;
            const proposedTop = areaRect.top + y;

            isOverlapping = !(
                proposedLeft + btnWidth < yesRect.left - 10 ||
                proposedLeft > yesRect.right + 10 ||
                proposedTop + btnHeight < yesRect.top - 10 ||
                proposedTop > yesRect.bottom + 10
            );
            attempts++;
        } while (isOverlapping && attempts < 20);

        noBtn.style.position = "absolute";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
        noBtn.style.transform = `rotate(${(Math.random() * 30) - 15}deg)`;

        noCount++;
        if (noCount === 5) noBtn.innerHTML = "Really? 😂💖";
        if (noCount === 10) noBtn.innerHTML = "Catch Me 😜✨";
        if (noCount === 15) noBtn.innerHTML = "Never 😆💞";
    }

    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); });
    noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
}

/* ===========================================================
            PANDA PAGE FLOWER BURST
=========================================================== */
const pandaPage = document.getElementById("pandaPage");

function triggerFlowerBurst() {
    const burstEmojis = ["💖", "🌸", "🌺", "✨", "💞", "🌷", "💕", "💮"];
    for (let i = 0; i < 40; i++) {
        const flower = document.createElement("div");
        flower.className = "flower-burst";
        flower.innerHTML = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
        flower.style.left = "50vw";
        flower.style.top = "40vh";
        flower.style.fontSize = random(22, 38) + "px";
        
        const tx = random(-320, 320) + "px";
        const ty = random(-360, 220) + "px";
        flower.style.setProperty("--tx", tx);
        flower.style.setProperty("--ty", ty);

        document.body.appendChild(flower);
        setTimeout(() => flower.remove(), 2500);
    }
}

if (pandaPage) {
    window.addEventListener("DOMContentLoaded", () => {
        setTimeout(triggerFlowerBurst, 300);
    });
}

/* ===========================================================
            VIRTUAL CAKE CUTTING GAME (cake.html)
=========================================================== */
const cakeElement = document.getElementById("cakeElement");
const flameElement = document.getElementById("flameElement");
const cakeStatusText = document.getElementById("cakeStatusText");
const nextWishBtn = document.getElementById("nextWishBtn");

if (cakeElement) {
    cakeElement.addEventListener("click", () => {
        if (flameElement) flameElement.style.display = "none";
        if (cakeStatusText) cakeStatusText.innerHTML = "Happy Birthday Dipti! 🎉🎂❤️";
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement("div");
            confetti.className = "firework";
            confetti.style.left = random(20, 80) + "vw";
            confetti.style.top = random(20, 60) + "vh";
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 1200);
        }

        if (nextWishBtn) {
            nextWishBtn.classList.remove("hidden");
        }
    });
}

/* ===========================================================
                TYPEWRITER ANIMATION (message.html)
=========================================================== */
const typewriter = document.getElementById("typewriter");
const galleryBtn = document.getElementById("galleryBtn");

function startTypewriter() {
    if (!typewriter) return;
    const birthdayText = `Happy Birthday Dipti ❤️\n\nToday is all about you... ✨\n\nI don't know if words are enough to tell you how special you are. 💖\n\nThank you for every smile... 😊\nThank you for every conversation... 💭\nThank you for every beautiful memory... 💞\n\nMay this birthday bring you happiness, success, good health and endless smiles. 🌸\n\nAlways keep shining... ✨\nAlways stay happy... 💕\nAnd never stop being the amazing person you are.\n\nOnce Again...\n🎂 Happy Birthday Dipti ❤️✨`;

    typewriter.innerHTML = "";
    let typingIndex = 0;
    
    const timer = setInterval(() => {
        typewriter.innerHTML += birthdayText.charAt(typingIndex);
        typingIndex++;
        typewriter.scrollTop = typewriter.scrollHeight;
        if (typingIndex >= birthdayText.length) {
            clearInterval(timer);
            if (galleryBtn) {
                galleryBtn.style.opacity = "1";
                galleryBtn.style.pointerEvents = "auto";
            }
        }
    }, 35);
}

if (typewriter) {
    startTypewriter();
}

/* ===========================================================
        GALLERY LEFT SLIDE-IN (gallery.html)
=========================================================== */
const photoCards = document.querySelectorAll(".photo-card");

if (photoCards.length > 0) {
    const memoryTitles = [
        "", "", "", "", "",
        "Little Dipti 👶✨💖",
        "Marathi Mulgi 🚩🌸💫",
        "", "", "", "", "", "", "", "", "", "", "", "", ""
    ];

    photoCards.forEach((card, index) => {
        const caption = card.querySelector("span");
        if (caption) {
            if (memoryTitles[index]) {
                caption.textContent = memoryTitles[index];
                caption.style.display = "block";
            } else {
                caption.textContent = "";
                caption.style.display = "none";
            }
        }

        setTimeout(() => {
            card.classList.add("slide-in");
        }, index * 120);
    });
}

/* ===========================================================
                LIGHTBOX PREVIEW (gallery.html)
=========================================================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const closeLightbox = document.getElementById("closeLightbox");

if (lightbox && closeLightbox) {
    document.querySelectorAll(".photo-card img").forEach((img) => {
        img.addEventListener("click", () => {
            lightbox.classList.remove("hidden");
            lightboxImg.src = img.src;
            lightboxTitle.textContent = "Special Memory ❤️✨";
        });
    });

    closeLightbox.addEventListener("click", () => lightbox.classList.add("hidden"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.add("hidden");
    });
}

/* ===========================================================
            DYNAMIC FLOATING AMBIENT BACKGROUNDS
=========================================================== */
function random(min, max) { return Math.random() * (max - min) + min; }

const wishesList = [
    "Happy Birthday ❤️", "Keep Smiling 😊✨", "You Are Amazing 💖",
    "Stay Blessed 🌸", "Shine Forever 💕", "Dream Big ⭐💫",
    "Enjoy Your Day 🎂🎉", "You Deserve Happiness 💞", "Stay Happy Forever 🌺"
];

function createFloatingQuote() {
    const quote = document.createElement("div");
    quote.className = "quote";
    quote.innerHTML = wishesList[Math.floor(Math.random() * wishesList.length)];
    quote.style.left = random(5, 80) + "vw";
    quote.style.top = "100vh";
    quote.style.animationDuration = random(8, 12) + "s";
    document.body.appendChild(quote);
    setTimeout(() => quote.remove(), 12000);
}

function createFloatingFlower() {
    const flowerEmojis = ["🌸", "🌺", "💖", "🌷", "💮", "✨", "💞", "💕"];
    const flower = document.createElement("div");
    flower.className = "floating-flower";
    flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = random(0, 100) + "vw";
    flower.style.fontSize = random(20, 34) + "px";
    flower.style.animationDuration = random(5, 9) + "s";
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 9000);
}

function createFloatingBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = random(0, 100) + "vw";
    balloon.style.background = `hsl(${random(0, 360)}, 85%, 65%)`;
    balloon.style.animationDuration = random(10, 15) + "s";
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 15000);
}

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = random(0, 100) + "vw";
    sparkle.style.top = random(0, 100) + "vh";
    const size = random(4, 8) + "px";
    sparkle.style.width = size;
    sparkle.style.height = size;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2200);
}

setInterval(createSparkle, 250);
setInterval(createFloatingFlower, 1100);
setInterval(createFloatingQuote, 3200);
setInterval(createFloatingBalloon, 2600);

/* ===========================================================
            FIREWORKS CELEBRATION (letter.html)
=========================================================== */
const letterPage = document.getElementById("letterPage");

function startCelebration() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const firework = document.createElement("div");
            firework.className = "firework";
            firework.style.left = random(10, 90) + "vw";
            firework.style.top = random(10, 50) + "vh";
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1200);
        }, i * 250);
    }
}

if (letterPage) {
    startCelebration();
}