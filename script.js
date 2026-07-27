"use strict";

/* ===========================================================
                    ELEMENTS
=========================================================== */

const loader = document.getElementById("loader");

const home = document.getElementById("home");
const question = document.getElementById("question");
const pandaPage = document.getElementById("pandaPage");
const messagePage = document.getElementById("messagePage");
const galleryPage = document.getElementById("galleryPage");
const letterPage = document.getElementById("letterPage");

const startBtn = document.getElementById("startBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const messageBtn = document.getElementById("messageBtn");
const galleryBtn = document.getElementById("galleryBtn");
const letterBtn = document.getElementById("letterBtn");
const restartBtn = document.getElementById("restartBtn");

const bgMusic = document.getElementById("bgMusic");

const loadingFill =
document.querySelector(".loading-fill");

const loadingText =
document.querySelector(".loader-content p");

const typewriter =
document.getElementById("typewriter");

/* ===========================================================
                INITIAL SETTINGS
=========================================================== */

document.body.style.overflow = "hidden";

home.classList.remove("hidden");

question.classList.add("hidden");
pandaPage.classList.add("hidden");
messagePage.classList.add("hidden");
galleryPage.classList.add("hidden");
letterPage.classList.add("hidden");

/* ===========================================================
                    LOADER
=========================================================== */

let percent = 0;

const loaderTimer = setInterval(() => {

    percent++;

    loadingFill.style.width = percent + "%";

    loadingText.textContent =
        "Loading " + percent + "%";

    if (percent >= 100) {

        clearInterval(loaderTimer);

        setTimeout(() => {

            loader.style.transition =
                "all .8s ease";

            loader.style.opacity = "0";

            loader.style.transform =
                "scale(1.1)";

            setTimeout(() => {

                loader.style.display = "none";

                document.body.style.overflow = "auto";

            },800);

        },500);

    }

},30);

/* ===========================================================
                    MUSIC
=========================================================== */

let musicStarted = false;

bgMusic.volume = 0;

function startMusic(){

    if(musicStarted) return;

    musicStarted = true;

    bgMusic.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.02;

        if(volume >= 1){

            volume = 1;

            clearInterval(fade);

        }

        bgMusic.volume = volume;

    },120);

}

/* ===========================================================
                PAGE HELPERS
=========================================================== */

function hideAllPages(){

    home.classList.add("hidden");

    question.classList.add("hidden");

    pandaPage.classList.add("hidden");

    messagePage.classList.add("hidden");

    galleryPage.classList.add("hidden");

    letterPage.classList.add("hidden");

}

function showPage(page){

    hideAllPages();

    page.classList.remove("hidden");

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ===========================================================
                START BUTTON
=========================================================== */

startBtn.addEventListener("click",()=>{

    startMusic();

    showPage(question);

});

/* ===========================================================
                SMALL UTIL
=========================================================== */

function random(min,max){

    return Math.random()*(max-min)+min;

}

console.log("✅ Script Part 1 Loaded");

/* ===========================================================
                PART 2
        QUESTION PAGE CONTROLS
=========================================================== */

const buttonArea =
document.querySelector(".button-area");

/* ===========================================================
                YES BUTTON
=========================================================== */

yesBtn.addEventListener("click",()=>{

    question.style.opacity="0";

    question.style.transform="scale(.95)";

    setTimeout(()=>{

        question.style.opacity="1";
        question.style.transform="scale(1)";

        showPage(pandaPage);

    },450);

});

/* ===========================================================
                NO BUTTON
=========================================================== */

let noCount=0;

function moveNoButton(){

    const area=
    buttonArea.getBoundingClientRect();

    const btnWidth=
    noBtn.offsetWidth;

    const btnHeight=
    noBtn.offsetHeight;

    const maxX=
    area.width-btnWidth;

    const maxY=
    area.height-btnHeight;

    const x=Math.random()*maxX;

    const y=Math.random()*maxY;

    noBtn.style.position="absolute";

    noBtn.style.left=x+"px";

    noBtn.style.top=y+"px";

    noBtn.style.transform=

    `rotate(${random(-18,18)}deg)`;

    noCount++;

    if(noCount==5){

        noBtn.innerHTML="Really? 😂";

    }

    if(noCount==10){

        noBtn.innerHTML="Catch Me 😜";

    }

    if(noCount==15){

        noBtn.innerHTML="Never 😆";

    }

}

/* Desktop */

noBtn.addEventListener(

"mouseenter",

moveNoButton

);

/* Mobile */

noBtn.addEventListener(

"touchstart",

(e)=>{

e.preventDefault();

moveNoButton();

}

);

/* Safety */

noBtn.addEventListener(

"click",

(e)=>{

e.preventDefault();

moveNoButton();

}

);

/* ===========================================================
            BUTTON SHAKE
=========================================================== */

setInterval(()=>{

    if(question.classList.contains("hidden"))

    return;

    noBtn.animate([

        {

            transform:"translateX(0)"

        },

        {

            transform:"translateX(-3px)"

        },

        {

            transform:"translateX(3px)"

        },

        {

            transform:"translateX(0)"

        }

    ],{

        duration:350

    });

},2200);

/* ===========================================================
            PAGE FADE
=========================================================== */

function pageFade(current,next){

    current.animate([

        {

            opacity:1,

            transform:"scale(1)"

        },

        {

            opacity:0,

            transform:"scale(.95)"

        }

    ],{

        duration:450,

        fill:"forwards"

    });

    setTimeout(()=>{

        showPage(next);

    },430);

}

console.log("✅ Script Part 2 Loaded");

/* ===========================================================
                    PART 3
            PANDA + GIFT ANIMATION
=========================================================== */

const boyPanda =
document.querySelector(".boyPanda");

const girlPanda =
document.querySelector(".girlPanda");

const gift =
document.querySelector(".gift");

/* ===========================================================
                MESSAGE BUTTON
=========================================================== */

messageBtn.addEventListener("click",()=>{

    messageBtn.disabled=true;

    /* Boy Panda */

    boyPanda.style.transition="2s";

    boyPanda.style.transform=

    "translateX(120px)";

    /* Girl Panda */

    girlPanda.style.transition="2s";

    girlPanda.style.transform=

    "translateX(-120px)";

    /* Gift */

    gift.style.transition=".8s";

    gift.style.transform=

    "scale(1.35) rotate(15deg)";

    gift.innerHTML="🎉";

    /* Effects */

    createHeartBurst();

    createFlowerBurst();

    setTimeout(()=>{

        pageFade(

            pandaPage,

            messagePage

        );

        startTypewriter();

    },2300);

});

/* ===========================================================
                HEART BURST
=========================================================== */

function createHeartBurst(){

    for(let i=0;i<25;i++){

        const heart=

        document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.left=

        random(35,65)+"vw";

        heart.style.top=

        random(35,60)+"vh";

        heart.style.fontSize=

        random(18,34)+"px";

        heart.style.animationDuration=

        random(2,4)+"s";

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },4000);

    }

}

/* ===========================================================
                FLOWER BURST
=========================================================== */

const flowerEmoji=[

"🌸",

"🌺",

"🌼",

"🌷",

"💮"

];

function createFlowerBurst(){

    for(let i=0;i<30;i++){

        const flower=

        document.createElement("div");

        flower.className="flower";

        flower.innerHTML=

        flowerEmoji[

        Math.floor(

        Math.random()*flowerEmoji.length

        )];

        flower.style.left=

        random(35,65)+"vw";

        flower.style.top=

        random(25,50)+"vh";

        flower.style.fontSize=

        random(18,30)+"px";

        flower.style.animationDuration=

        random(3,5)+"s";

        document.body.appendChild(flower);

        setTimeout(()=>{

            flower.remove();

        },5000);

    }

}

/* ===========================================================
            RESET PANDA
=========================================================== */

function resetPandas(){

    boyPanda.style.transform="translateX(0)";

    girlPanda.style.transform="translateX(0)";

    gift.style.transform="scale(1)";

    gift.innerHTML="🎁";

}

console.log("✅ Script Part 3 Loaded");

/* ===========================================================
                    PART 4
        TYPEWRITER + MESSAGE PAGE
=========================================================== */

const birthdayText = `Happy Birthday Dipti ❤️

Today is all about you...

I don't know if words are enough to tell
you how special you are.

Thank you for every smile.

Thank you for every conversation.

Thank you for every beautiful memory.

May this birthday bring you happiness,
success, good health and endless smiles.

Always keep shining...

Always stay happy...

And never stop being the amazing person
you are.

Once Again...

🎂 Happy Birthday Dipti ❤️`;

/* ===========================================================
                TYPEWRITER
=========================================================== */

let typingIndex = 0;
let typingTimer = null;

function startTypewriter(){

    typewriter.innerHTML = "";

    typingIndex = 0;

    clearInterval(typingTimer);

    typingTimer = setInterval(()=>{

        typewriter.innerHTML += birthdayText.charAt(typingIndex);

        typingIndex++;

        typewriter.scrollTop = typewriter.scrollHeight;

        if(typingIndex >= birthdayText.length){

            clearInterval(typingTimer);

            galleryBtn.style.opacity = "1";

            galleryBtn.style.pointerEvents = "auto";

            galleryBtn.animate([

                {

                    transform:"scale(.8)",

                    opacity:0

                },

                {

                    transform:"scale(1.08)",

                    opacity:1

                },

                {

                    transform:"scale(1)",

                    opacity:1

                }

            ],{

                duration:700

            });

        }

    },35);

}

/* ===========================================================
            INITIAL GALLERY BUTTON
=========================================================== */

galleryBtn.style.opacity = "0";

galleryBtn.style.pointerEvents = "none";

/* ===========================================================
            OPEN GALLERY
=========================================================== */

galleryBtn.addEventListener("click",()=>{

    pageFade(

        messagePage,

        galleryPage

    );

    animateGallery();

});

/* ===========================================================
            TYPEWRITER CURSOR
=========================================================== */

setInterval(()=>{

    if(messagePage.classList.contains("hidden"))

        return;

    typewriter.classList.toggle("cursor");

},500);

console.log("✅ Script Part 4 Loaded");

/* ===========================================================
                    PART 5
            PREMIUM GALLERY
=========================================================== */

const photoCards =
document.querySelectorAll(".photo-card");

const galleryImages =
document.querySelectorAll(".photo-card img");

/* ===========================================================
                GALLERY DROP
=========================================================== */

function animateGallery(){

    photoCards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform=

        "translateY(-220px) rotate(-18deg) scale(.7)";

        setTimeout(()=>{

            card.style.transition=

            "1s cubic-bezier(.18,.89,.32,1.28)";

            card.style.opacity="1";

            card.style.transform=

            "translateY(0) rotate(0deg) scale(1)";

        },index*180);

    });

}

/* ===========================================================
                IMAGE HOVER
=========================================================== */

photoCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.animate([

            {

                transform:"scale(1)"

            },

            {

                transform:"scale(1.05) rotate(2deg)"

            }

        ],{

            duration:250,

            fill:"forwards"

        });

    });

    card.addEventListener("mouseleave",()=>{

        card.animate([

            {

                transform:"scale(1.05)"

            },

            {

                transform:"scale(1)"

            }

        ],{

            duration:250,

            fill:"forwards"

        });

    });

});

/* ===========================================================
                HEART EFFECT
=========================================================== */

function imageHeartBurst(x,y){

    for(let i=0;i<18;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML="❤️";

        heart.style.position="fixed";

        heart.style.left=x+"px";

        heart.style.top=y+"px";

        heart.style.fontSize=

        random(16,32)+"px";

        heart.style.pointerEvents="none";

        heart.style.zIndex="9999";

        heart.animate([

            {

                transform:

                "translate(0,0) scale(.5)",

                opacity:1

            },

            {

                transform:

                `translate(${random(-140,140)}px,

                ${random(-160,60)}px)

                scale(1.5)`,

                opacity:0

            }

        ],{

            duration:1600,

            easing:"ease-out"

        });

        document.body.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },1600);

    }

}

/* ===========================================================
                IMAGE CLICK
=========================================================== */

galleryImages.forEach(img=>{

    img.addEventListener("click",(e)=>{

        imageHeartBurst(

            e.clientX,

            e.clientY

        );

    });

});

/* ===========================================================
                MEMORY CAPTIONS
=========================================================== */

const memoryTitles=[

"Beautiful Smile ❤️",

"Coffee Time ☕",

"Best Memories 🌸",

"Campus Days 📚",

"Endless Laugh 😊",

"Special Day ✨",

"Golden Moments 💖",

"Friendship Forever 🤍",

"One More Memory 📸",

"More Memories ❤️"

];

photoCards.forEach((card,index)=>{

    const caption=

    card.querySelector("span");

    if(caption){

        caption.textContent=

        memoryTitles[index];

    }

});

console.log("✅ Script Part 5 Loaded");

/* ===========================================================
                    PART 6
                PREMIUM LIGHTBOX
=========================================================== */

const lightbox =
document.getElementById("lightbox");

const lightboxImg =
document.getElementById("lightboxImg");

const lightboxTitle =
document.getElementById("lightboxTitle");

const lightboxCaption =
document.getElementById("lightboxCaption");

const closeLightbox =
document.getElementById("closeLightbox");

/* ===========================================================
                IMAGE DATA
=========================================================== */

const photoTitles=[

"Beautiful Smile ❤️",

"Coffee Time ☕",

"Best Memories 🌸",

"Campus Days 📚",

"Golden Moments ✨",

"Forever Friends 💙",

"Special Day 🎉",

"Happy Memories 😊",

"Always Smiling ❤️",

"More Memories To Come 💖"

];

const photoDescriptions=[

"A smile that makes the day brighter.",

"One beautiful coffee memory together.",

"A picture worth remembering forever.",

"One of the happiest moments.",

"A day full of happiness.",

"Friendship is the best gift.",

"Every picture tells a story.",

"Memories never fade away.",

"Keep smiling forever.",

"The journey has just begun."

];

let currentImage = 0;

/* ===========================================================
                OPEN IMAGE
=========================================================== */

galleryImages.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        currentImage=index;

        openLightbox();

    });

});

function openLightbox(){

    lightbox.classList.remove("hidden");

    lightboxImg.src=

    galleryImages[currentImage].src;

    lightboxTitle.textContent=

    photoTitles[currentImage];

    lightboxCaption.textContent=

    photoDescriptions[currentImage];

    lightbox.animate([

        {

            opacity:0

        },

        {

            opacity:1

        }

    ],{

        duration:350,

        fill:"forwards"

    });

}

/* ===========================================================
                CLOSE
=========================================================== */

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.add("hidden");

});

/* Click Outside */

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.add("hidden");

    }

});

/* ===========================================================
                BUTTONS
=========================================================== */

const nextBtn=document.createElement("button");

const prevBtn=document.createElement("button");

nextBtn.className="gallery-next";

prevBtn.className="gallery-prev";

nextBtn.innerHTML="➡️";

prevBtn.innerHTML="⬅️";

lightbox.appendChild(nextBtn);

lightbox.appendChild(prevBtn);

nextBtn.addEventListener("click",()=>{

    currentImage++;

    if(currentImage>=galleryImages.length){

        currentImage=0;

    }

    openLightbox();

});

prevBtn.addEventListener("click",()=>{

    currentImage--;

    if(currentImage<0){

        currentImage=

        galleryImages.length-1;

    }

    openLightbox();

});

/* ===========================================================
            KEYBOARD SUPPORT
=========================================================== */

document.addEventListener("keydown",(e)=>{

    if(lightbox.classList.contains("hidden"))

    return;

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

    if(e.key==="Escape"){

        closeLightbox.click();

    }

});

/* ===========================================================
            IMAGE ZOOM
=========================================================== */

lightboxImg.addEventListener("click",()=>{

    lightboxImg.classList.toggle("zoomed");

});

console.log("✅ Script Part 6 Loaded");

/* ===========================================================
                PART 7
        FINAL EFFECTS & RESTART
=========================================================== */

/* Remove duplicate image click */

galleryImages.forEach((img,index)=>{

    img.onclick=(e)=>{

        currentImage=index;

        imageHeartBurst(

            e.clientX,

            e.clientY

        );

        openLightbox();

    };

});

/* ===========================================================
                LETTER
=========================================================== */

letterBtn.addEventListener("click",()=>{

    pageFade(

        galleryPage,

        letterPage

    );

    startCelebration();

});

/* ===========================================================
                RESTART
=========================================================== */

restartBtn.addEventListener("click",()=>{

    location.reload();

});

/* ===========================================================
                FIREWORK
=========================================================== */

function createFirework(){

    const firework=

    document.createElement("div");

    firework.className="firework";

    firework.style.left=

    random(5,95)+"vw";

    firework.style.top=

    random(10,55)+"vh";

    document.body.appendChild(firework);

    setTimeout(()=>{

        firework.remove();

    },1200);

}

/* ===========================================================
                CONFETTI
=========================================================== */

function createConfetti(){

    const confetti=

    document.createElement("div");

    confetti.className="confetti";

    confetti.style.left=

    random(0,100)+"vw";

    confetti.style.background=

    `hsl(${random(0,360)},100%,60%)`;

    confetti.style.animationDuration=

    random(3,6)+"s";

    document.body.appendChild(confetti);

    setTimeout(()=>{

        confetti.remove();

    },6000);

}

/* ===========================================================
                HEARTS
=========================================================== */

function floatingHeart(){

    const heart=

    document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=

    random(0,100)+"vw";

    heart.style.fontSize=

    random(18,35)+"px";

    heart.style.animationDuration=

    random(5,8)+"s";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },8000);

}

/* ===========================================================
                FLOWERS
=========================================================== */

const flowerList=[

"🌸",

"🌺",

"🌼",

"🌷",

"💮"

];

function floatingFlower(){

    const flower=

    document.createElement("div");

    flower.className="flower";

    flower.innerHTML=

    flowerList[

    Math.floor(

    Math.random()*flowerList.length

    )];

    flower.style.left=

    random(0,100)+"vw";

    flower.style.fontSize=

    random(18,32)+"px";

    flower.style.animationDuration=

    random(5,8)+"s";

    document.body.appendChild(flower);

    setTimeout(()=>{

        flower.remove();

    },8000);

}

/* ===========================================================
                BALLOON
=========================================================== */

function floatingBalloon(){

    const balloon=

    document.createElement("div");

    balloon.className="balloon";

    balloon.style.left=

    random(0,100)+"vw";

    balloon.style.background=

    `hsl(${random(0,360)},80%,65%)`;

    balloon.style.animationDuration=

    random(10,16)+"s";

    document.body.appendChild(balloon);

    setTimeout(()=>{

        balloon.remove();

    },16000);

}

/* ===========================================================
                CELEBRATION
=========================================================== */

function startCelebration(){

    for(let i=0;i<25;i++){

        setTimeout(createFirework,i*350);

    }

    setInterval(createConfetti,180);

    setInterval(floatingHeart,600);

    setInterval(floatingFlower,700);

    setInterval(floatingBalloon,2200);

}

console.log("✅ Birthday Website Ready ❤️");

/* ===========================================================
                    PART 8
            LUXURY VISUAL EFFECTS
=========================================================== */

/* ==========================================
        FLOATING QUOTES
========================================== */

const quotes = [

"Happy Birthday ❤️",

"Keep Smiling 😊",

"You Are Amazing ✨",

"Stay Blessed 🌸",

"Shine Forever 💖",

"Dream Big ⭐",

"Enjoy Your Day 🎂",

"You Deserve Happiness ❤️"

];

function createQuote(){

    const quote=document.createElement("div");

    quote.className="quote";

    quote.innerHTML=

    quotes[

    Math.floor(

    Math.random()*quotes.length

    )];

    quote.style.left=

    random(5,90)+"vw";

    quote.style.top="100vh";

    quote.style.animationDuration=

    random(8,12)+"s";

    document.body.appendChild(quote);

    setTimeout(()=>{

        quote.remove();

    },12000);

}

/* ==========================================
        RANDOM SPARKLES
========================================== */

function createSparkle(){

    const sparkle=

    document.createElement("div");

    sparkle.className="sparkle";

    sparkle.style.left=

    random(0,100)+"vw";

    sparkle.style.top=

    random(0,100)+"vh";

    sparkle.style.width=

    random(4,8)+"px";

    sparkle.style.height=

    sparkle.style.width;

    document.body.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },2200);

}

/* ==========================================
        AUTO SPARKLES
========================================== */

setInterval(createSparkle,250);

/* ==========================================
        AUTO QUOTES
========================================== */

setInterval(createQuote,5000);

/* ==========================================
        MUSIC VISUALIZER
========================================== */

bgMusic.addEventListener("play",()=>{

    document.body.classList.add("music-playing");

});

bgMusic.addEventListener("pause",()=>{

    document.body.classList.remove("music-playing");

});

/* ==========================================
        AUTO SCROLL TO TOP
========================================== */

function goTop(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/* ==========================================
        PAGE OPEN ANIMATION
========================================== */

window.addEventListener("pageshow",()=>{

    document.body.animate([

        {

            opacity:0

        },

        {

            opacity:1

        }

    ],{

        duration:800

    });

});

console.log("✨ Luxury Effects Loaded");


/* ===========================================================
                    PART 9
            PREMIUM ENDING EFFECTS
=========================================================== */

/* ==========================================
        HAPPY BIRTHDAY TYPING TITLE
========================================== */

const titleAnimation = [

"Happy Birthday ❤️",

"Happy Birthday Dipti ❤️",

"Have The Best Birthday 🎂",

"Keep Smiling Forever 😊"

];

let titleIndex = 0;

setInterval(() => {

    document.title = titleAnimation[titleIndex];

    titleIndex++;

    if(titleIndex >= titleAnimation.length){

        titleIndex = 0;

    }

},2500);

/* ==========================================
        RANDOM STAR
========================================== */

function createStar(){

    const star=document.createElement("div");

    star.innerHTML="⭐";

    star.style.position="fixed";

    star.style.left=random(0,100)+"vw";

    star.style.top=random(0,100)+"vh";

    star.style.fontSize=random(12,26)+"px";

    star.style.pointerEvents="none";

    star.style.opacity=".8";

    star.style.animation="sparkleAnim 2s linear";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2000);

}

setInterval(createStar,1200);

/* ==========================================
        BUTTON RIPPLE
========================================== */

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("click",(e)=>{

        const ripple=document.createElement("span");

        ripple.style.position="absolute";

        ripple.style.left=e.offsetX+"px";

        ripple.style.top=e.offsetY+"px";

        ripple.style.width="10px";

        ripple.style.height="10px";

        ripple.style.borderRadius="50%";

        ripple.style.background="rgba(255,255,255,.7)";

        ripple.style.transform="translate(-50%,-50%)";

        ripple.style.pointerEvents="none";

        ripple.animate([

            {

                width:"10px",

                height:"10px",

                opacity:1

            },

            {

                width:"300px",

                height:"300px",

                opacity:0

            }

        ],{

            duration:600

        });

        btn.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});

/* ==========================================
        MESSAGE AFTER 10 SEC
========================================== */

setTimeout(()=>{

    console.log(

        "❤️ Thank You For Making This Day Special ❤️"

    );

},10000);

/* ==========================================
        END
========================================== */

console.log("🎉 Part 9 Loaded Successfully");

/* ===========================================================
                    PART 10
                GRAND FINALE
=========================================================== */

/* ==========================================
        FINAL CELEBRATION
========================================== */

function grandFinale(){

    // Fireworks

    for(let i=0;i<35;i++){

        setTimeout(()=>{

            createFirework();

        },i*220);

    }

    // Hearts

    for(let i=0;i<60;i++){

        setTimeout(()=>{

            floatingHeart();

        },i*120);

    }

    // Flowers

    for(let i=0;i<40;i++){

        setTimeout(()=>{

            floatingFlower();

        },i*180);

    }

    // Confetti

    for(let i=0;i<120;i++){

        setTimeout(()=>{

            createConfetti();

        },i*70);

    }

}

/* ==========================================
        LETTER OPEN
========================================== */

const letterPaper =
document.querySelector(".letter-paper");

if(letterPaper){

    letterPaper.animate([

        {

            transform:"translateY(60px)",

            opacity:0

        },

        {

            transform:"translateY(0)",

            opacity:1

        }

    ],{

        duration:1200,

        fill:"forwards"

    });

}

/* ==========================================
        RANDOM WISHES
========================================== */

const wishes=[

"Happy Birthday ❤️",

"God Bless You 🌸",

"Keep Smiling 😊",

"Stay Happy ✨",

"Have A Wonderful Life 💖",

"Dream Big ⭐",

"Always Shine 🌈",

"You Are Special ❤️"

];

function randomWish(){

    const wish=document.createElement("div");

    wish.className="quote";

    wish.innerHTML=

    wishes[

    Math.floor(

    Math.random()*wishes.length

    )];

    wish.style.left=

    random(5,90)+"vw";

    wish.style.top=

    random(15,85)+"vh";

    wish.style.position="fixed";

    wish.style.pointerEvents="none";

    wish.style.fontSize="22px";

    document.body.appendChild(wish);

    setTimeout(()=>{

        wish.remove();

    },5000);

}

setInterval(randomWish,4500);

/* ==========================================
        AUTO CELEBRATION
========================================== */

if(letterBtn){

letterBtn.addEventListener("click",()=>{

setTimeout(()=>{

grandFinale();

},1000);

});

}

/* ==========================================
        END MESSAGE
========================================== */

console.log("🎂");
console.log("❤️ Happy Birthday Dipti ❤️");
console.log("✨ Made with Love by Ashish ✨");
console.log("🎉 Project Finished Successfully 🎉");