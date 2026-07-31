"use strict";

/* ===========================================================
    SEAMLESS CONTINUOUS MULTI-SONG PLAYLIST (FULLY FIXED)
=========================================================== */
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const nextSongBtn = document.getElementById("nextSongBtn");
const prevSongBtn = document.getElementById("prevSongBtn");

const playlist = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3",
    "music/song4.mp3"
];

let currentSongIndex = parseInt(localStorage.getItem("currentSongIndex")) || 0;
let isMusicPlaying = localStorage.getItem("isMusicPlaying") !== "false";
let savedTime = parseFloat(localStorage.getItem("musicCurrentTime")) || 0;

function syncMusicState() {
    if (!bgMusic) return;

    const targetSrc = playlist[currentSongIndex];
    
    // Exact Source Matching & Re-buffering
    if (!bgMusic.src || !bgMusic.src.includes(encodeURI(targetSrc))) {
        bgMusic.src = targetSrc;
        bgMusic.load();
        bgMusic.currentTime = savedTime;
    } else if (Math.abs(bgMusic.currentTime - savedTime) > 2) {
        bgMusic.currentTime = savedTime;
    }

    bgMusic.volume = 0.7;

    if (isMusicPlaying) {
        let playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (musicToggle) musicToggle.classList.add("playing");
            }).catch(err => {
                console.log("Browser waiting for user tap to enable audio:", err);
                if (musicToggle) musicToggle.classList.remove("playing");
            });
        }
    }
}

// Global user click/tap listener to unblock browser autoplay policy
function enableAutoplayOnFirstInteraction() {
    if (bgMusic) {
        isMusicPlaying = true;
        localStorage.setItem("isMusicPlaying", "true");
        bgMusic.play().then(() => {
            if (musicToggle) musicToggle.classList.add("playing");
        }).catch(() => {});
    }
    window.removeEventListener("click", enableAutoplayOnFirstInteraction);
    window.removeEventListener("touchstart", enableAutoplayOnFirstInteraction);
}

window.addEventListener("click", enableAutoplayOnFirstInteraction);
window.addEventListener("touchstart", enableAutoplayOnFirstInteraction);

window.addEventListener("beforeunload", () => {
    if (bgMusic) {
        localStorage.setItem("musicCurrentTime", bgMusic.currentTime);
        localStorage.setItem("isMusicPlaying", !bgMusic.paused);
        localStorage.setItem("currentSongIndex", currentSongIndex);
    }
});

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

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    savedTime = 0;
    localStorage.setItem("currentSongIndex", currentSongIndex);
    localStorage.setItem("musicCurrentTime", 0);
    localStorage.setItem("isMusicPlaying", "true");
    isMusicPlaying = true;
    syncMusicState();
}

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

window.addEventListener("DOMContentLoaded", () => {
    syncMusicState();
});

/* ===========================================================
        1ST AUGUST BIRTHDAY COUNTDOWN TIMER
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
    noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); }, { passive: false });
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
    VIRTUAL CAKE & HEAVY FLOWER SHOWER (cake.html)
=========================================================== */
const cakeElement = document.getElementById("cakeElement");
const flameElement = document.getElementById("flameElement");
const cakeStatusText = document.getElementById("cakeStatusText");
const nextWishBtn = document.getElementById("nextWishBtn");

if (cakeElement) {
    let candleBlown = false;

    cakeElement.addEventListener("click", () => {
        if (!candleBlown) {
            candleBlown = true;
            if (flameElement) flameElement.style.display = "none";
            
            if (cakeStatusText) {
                cakeStatusText.innerHTML = `
                    <div class="wish-box">
                        ✨ Close your eyes and make a wish Dipti... 💖
                    </div>
                `;
            }

            triggerFlowerShower();

            if (nextWishBtn) {
                setTimeout(() => {
                    nextWishBtn.textContent = "Open Next Surprise 🎈";
                    nextWishBtn.classList.remove("hidden");
                }, 1500);
            }
        }
    });
}

function triggerFlowerShower() {
    const flowerEmojis = ["🌸", "🌺", "🌷", "💐", "🌹", "✨", "💖", "💮", "🌻"];

    for (let i = 0; i < 35; i++) {
        const confetti = document.createElement("div");
        confetti.className = "firework";
        confetti.style.left = random(10, 90) + "vw";
        confetti.style.top = random(10, 60) + "vh";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1200);
    }

    for (let i = 0; i < 55; i++) {
        setTimeout(() => {
            const flower = document.createElement("div");
            flower.className = "flower-burst";
            flower.innerHTML = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            flower.style.left = random(5, 95) + "vw";
            flower.style.top = random(15, 55) + "vh";
            flower.style.fontSize = random(26, 42) + "px";
            
            const tx = random(-280, 280) + "px";
            const ty = random(-320, 320) + "px";
            flower.style.setProperty("--tx", tx);
            flower.style.setProperty("--ty", ty);

            document.body.appendChild(flower);
            setTimeout(() => flower.remove(), 2500);
        }, i * 35);
    }
}

/* ===========================================================
        INTERACTIVE BALLOON POPPING GAME (balloons.html)
=========================================================== */
const balloonCards = document.querySelectorAll(".interactive-balloon-card");
const fullBalloonMessage = document.getElementById("fullBalloonMessage");
const nextBalloonBtn = document.getElementById("nextBalloonBtn");

if (balloonCards.length > 0) {
    let poppedCount = 0;

    balloonCards.forEach((card) => {
        card.addEventListener("click", () => {
            const balloon = card.querySelector(".pop-balloon");
            const word = card.querySelector(".revealed-word");

            if (balloon && !balloon.classList.contains("popped")) {
                balloon.classList.add("popped");
                
                balloon.style.transform = "scale(1.4)";
                balloon.style.opacity = "0";

                setTimeout(() => {
                    balloon.style.display = "none";
                    if (word) word.classList.remove("hidden");
                }, 200);

                const rect = card.getBoundingClientRect();
                createPopBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

                poppedCount++;

                if (poppedCount === 4) {
                    setTimeout(() => {
                        if (fullBalloonMessage) fullBalloonMessage.classList.remove("hidden");
                        if (nextBalloonBtn) nextBalloonBtn.classList.remove("hidden");
                        triggerRosePetalShower();
                    }, 600);
                }
            }
        });
    });
}

function createPopBurst(x, y) {
    const popItems = ["🌹", "🌸", "✨", "💖", "🎉"];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement("div");
        p.className = "flower-burst";
        p.innerHTML = popItems[Math.floor(Math.random() * popItems.length)];
        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.fontSize = random(20, 32) + "px";

        const tx = random(-180, 180) + "px";
        const ty = random(-200, 100) + "px";
        p.style.setProperty("--tx", tx);
        p.style.setProperty("--ty", ty);

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }
}

function triggerRosePetalShower() {
    const roseItems = ["🌹", "🌹", "🌸", "💖", "🌷", "✨"];
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const petal = document.createElement("div");
            petal.className = "floating-flower";
            petal.innerHTML = roseItems[Math.floor(Math.random() * roseItems.length)];
            petal.style.left = random(0, 100) + "vw";
            petal.style.fontSize = random(24, 38) + "px";
            petal.style.animationDuration = random(4, 8) + "s";
            document.body.appendChild(petal);
            setTimeout(() => petal.remove(), 8000);
        }, i * 60);
    }
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
                galleryBtn.classList.remove("hidden");
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
            if (lightboxTitle) lightboxTitle.textContent = "Special Memory ❤️✨";
        });
    });

    closeLightbox.addEventListener("click", () => lightbox.classList.add("hidden"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.add("hidden");
    });
}

/* ===========================================================
        ENVELOPE OPEN & TYPEWRITER LETTER LOGIC (letter.html)
=========================================================== */
const envelope = document.getElementById("envelope");
const letterPaper = document.getElementById("letterPaper");
const typewriterLetter = document.getElementById("typewriterLetter");
const letterSignature = document.getElementById("letterSignature");
const watchAgainBtn = document.getElementById("watchAgainBtn");

if (envelope && letterPaper) {
    envelope.addEventListener("click", () => {
        envelope.classList.add("open");

        setTimeout(() => {
            envelope.style.opacity = "0";
            setTimeout(() => {
                envelope.style.display = "none";
                letterPaper.classList.remove("hidden");
                letterPaper.style.animation = "slideFromLeft 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards";
                
                startLetterTypewriter();
                startCelebration();
            }, 400);
        }, 600);
    });
}

function startLetterTypewriter() {
    if (!typewriterLetter) return;

    const fullLetterText = `Dear Dipti,\n\nHappy Birthday ❤️✨\n\n6th October 2024... mujhe aaj bhi wo din ache se yaad hai jab main tumse mila tha. Tab mujhe zara sa bhi andaza nahi tha ki tum meri life mein itni important ho jaogi.\n\nIn do saalon mein hum lade bhi, kabhi-kabhi baat bhi nahi hui... par sach boloon toh jab tumse ek din bhi baat nahi hoti na, toh dil ko bohot bura lagta hai. Pata hi nahi chala ki time ke saath hamari friendship kab itni strong aur special ho gayi.\n\nThank you so much for all the conversations, all the memories, and all the smiles jo tumne mujhe in do saalon mein diye hain. Tumhe shayad andaza bhi nahi hai ki tum kitni special ho. Khas-kar mere liye...\n\nKaash mere paas koi aisa power hota ki main tumhe apni aankhon se khud ko dekhne ki ability de pata, tab tumhe pata chalta ki tum kitni pyari aur kitni special ho! 💖\n\nBas ek baat hamesha yaad rakhna... hamesha khush raha karo, hasti raha karo, aur kabhi roya mat karo. Jab tum roti ho na, mujhe bohot bura lagta hai. Tumhara ye dost tumhe hamesha sirf aur sirf hassta hua dekhna chahta hai.\n\nMay this birthday bring you endless happiness, success, and all the love you deserve. Always stay the way you are. 🎂✨`;

    typewriterLetter.innerHTML = "";
    let charIndex = 0;

    const letterTimer = setInterval(() => {
        typewriterLetter.innerHTML += fullLetterText.charAt(charIndex);
        charIndex++;

        if (charIndex >= fullLetterText.length) {
            clearInterval(letterTimer);
            if (letterSignature) letterSignature.classList.remove("hidden");
            if (watchAgainBtn) watchAgainBtn.classList.remove("hidden");
        }
    }, 35);
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