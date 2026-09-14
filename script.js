/* =========================================
   LOVE SURPRISE - COMPLETE JAVASCRIPT
   Password: 01042005
========================================= */


/* =========================================
   PASSWORD SETTINGS
========================================= */

const correctPassword = "01042005";

const MAX_ATTEMPTS = 5;

let failedAttempts = 0;
let locked = false;


/* =========================================
   ELEMENTS
========================================= */

const loginScreen =
    document.getElementById("loginScreen");

const opening =
    document.getElementById("opening");

const surprise =
    document.getElementById("surprise");

const passwordInput =
    document.getElementById("password");

const unlockBtn =
    document.getElementById("unlockBtn");

const error =
    document.getElementById("error");

const attemptText =
    document.getElementById("attemptText");

const openBtn =
    document.getElementById("openBtn");

const finalBtn =
    document.getElementById("finalBtn");

const finalMessage =
    document.getElementById("finalMessage");

const typewriter =
    document.getElementById("typewriter");

const particles =
    document.getElementById("particles");

const music =
    document.getElementById("music");


/* =========================================
   PASSWORD CHECK
========================================= */

async function checkPassword() {

    if (locked) {
        return;
    }

    const enteredPassword =
        passwordInput.value.trim();


    /* Empty password */

    if (enteredPassword === "") {

        error.textContent =
            "Enter the secret first ❤️";

        return;
    }


    /* Correct password */

    if (enteredPassword === correctPassword) {

        error.textContent = "";

        attemptText.textContent = "";

        passwordInput.value = "";

        unlockBtn.textContent =
            "Unlocked ❤️";

        unlockBtn.disabled = true;


        /* Small delay for the unlock animation */

        setTimeout(() => {

            loginScreen.classList.add("hidden");

            opening.classList.remove("hidden");

            createSparkleBurst();

        }, 500);


        return;
    }


    /* Wrong password */

    failedAttempts++;

    passwordInput.value = "";

    passwordInput.focus();


    if (failedAttempts >= MAX_ATTEMPTS) {

        locked = true;

        error.textContent =
            "Too many attempts. Try again later ❤️";

        attemptText.textContent =
            "🔒 Locked";

        unlockBtn.disabled = true;

        passwordInput.disabled = true;

        return;
    }


    const remaining =
        MAX_ATTEMPTS - failedAttempts;

    error.textContent =
        "Hmm... that's not right ❤️";

    attemptText.textContent =
        remaining +
        " attempts remaining";

}


/* =========================================
   UNLOCK BUTTON
========================================= */

if (unlockBtn) {

    unlockBtn.addEventListener(
        "click",
        checkPassword
    );

}


/* =========================================
   ENTER KEY
========================================= */

if (passwordInput) {

    passwordInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                checkPassword();

            }

        }
    );

}


/* =========================================
   OPEN THE SURPRISE
========================================= */

if (openBtn) {

    openBtn.addEventListener(
        "click",
        function() {

            opening.classList.add("hidden");

            surprise.classList.remove("hidden");


            /* Start floating hearts */

            startParticles();


            /* Start love letter */

            typeLoveLetter();


            /* Try to start music */

            if (music) {

                music.volume = 0.45;

                music.play().catch(() => {

                    console.log(
                        "Music requires another tap."
                    );

                });

            }


            /* Initial heart explosion */

            setTimeout(() => {

                heartExplosion();

            }, 500);

        }
    );

}


/* =========================================
   LOVE LETTER
========================================= */

const loveLetter = `
There are probably a million things I could say...

But sometimes the simplest words are the most honest.

You make ordinary days feel special.

Your smile can change my entire mood.

And somehow, having you in my life makes everything feel a little more beautiful.

So I made this little surprise just to remind you...

You are loved.
You are special.
And you mean more to me than you know. ❤️
`;


function typeLoveLetter() {

    if (!typewriter) {
        return;
    }

    typewriter.textContent = "";

    let index = 0;


    function typeNextCharacter() {

        if (index >= loveLetter.length) {
            return;
        }


        typewriter.textContent +=
            loveLetter[index];

        index++;


        /* Slightly random typing speed */

        const speed =
            25 + Math.random() * 35;

        setTimeout(
            typeNextCharacter,
            speed
        );

    }


    typeNextCharacter();

}


/* =========================================
   FLOATING PARTICLES
========================================= */

const particleSymbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘",
    "💝",
    "✨",
    "💫",
    "🌸"
];


function createParticle() {

    if (!particles) {
        return;
    }


    const particle =
        document.createElement("div");

    particle.className =
        "particle";


    /* Random symbol */

    particle.textContent =
        particleSymbols[
            Math.floor(
                Math.random() *
                particleSymbols.length
            )
        ];


    /* Random position */

    particle.style.left =
        Math.random() * 100 + "%";


    /* Random size */

    particle.style.fontSize =
        14 +
        Math.random() * 25 +
        "px";


    /* Random animation speed */

    particle.style.animationDuration =
        5 +
        Math.random() * 6 +
        "s";


    /* Random delay */

    particle.style.animationDelay =
        Math.random() * 1.5 +
        "s";


    particles.appendChild(
        particle
    );


    /* Remove after animation */

    setTimeout(
        () => {

            particle.remove();

        },
        13000
    );

}


function startParticles() {

    /* Create some immediately */

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        setTimeout(
            createParticle,
            i * 150
        );

    }


    /* Continue creating them */

    setInterval(
        createParticle,
        450
    );

}


/* =========================================
   SPARKLE BURST
========================================= */

function createSparkleBurst() {

    const container =
        document.body;


    for (
        let i = 0;
        i < 30;
        i++
    ) {

        const sparkle =
            document.createElement("div");


        sparkle.textContent =
            Math.random() > 0.5
                ? "✨"
                : "💖";


        sparkle.style.position =
            "fixed";

        sparkle.style.left =
            "50%";

        sparkle.style.top =
            "50%";

        sparkle.style.fontSize =
            12 +
            Math.random() * 20 +
            "px";

        sparkle.style.pointerEvents =
            "none";

        sparkle.style.zIndex =
            "9999";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            80 +
            Math.random() * 250;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        sparkle.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(0)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1200 +
                    Math.random() * 700,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"
            }

        );


        container.appendChild(
            sparkle
        );


        setTimeout(
            () => sparkle.remove(),
            2200
        );

    }

}


/* =========================================
   HEART EXPLOSION
========================================= */

function heartExplosion() {

    const symbols = [
        "❤️",
        "💕",
        "💗",
        "💖"
    ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement("div");


        heart.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            "50%";

        heart.style.top =
            "50%";

        heart.style.fontSize =
            15 +
            Math.random() * 25 +
            "px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex =
            "9999";


        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            100 +
            Math.random() * 350;

        const x =
            Math.cos(angle) *
            distance;

        const y =
            Math.sin(angle) *
            distance;


        heart.animate(

            [
                {
                    transform:
                        "translate(-50%, -50%) scale(0)",

                    opacity: 0
                },

                {
                    transform:
                        "translate(-50%, -50%) scale(1)",

                    opacity: 1
                },

                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.3)`,

                    opacity: 0
                }
            ],

            {
                duration:
                    1500 +
                    Math.random() * 1200,

                easing:
                    "cubic-bezier(.2,.8,.3,1)"
            }

        );


        document.body.appendChild(
            heart
        );


        setTimeout(
            () => heart.remove(),
            3000
        );

    }

}


/* =========================================
   FINAL MESSAGE
========================================= */

if (finalBtn) {

    finalBtn.addEventListener(
        "click",
        function() {

            /* Hide button */

            finalBtn.style.display =
                "none";


            /* Show final message */

            finalMessage.classList.remove(
                "hidden"
            );


            /* Big heart explosion */

            heartExplosion();


            setTimeout(
                heartExplosion,
                800
            );


            setTimeout(
                heartExplosion,
                1600
            );


            /* Smooth scroll */

            setTimeout(() => {

                finalMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 300);

        }
    );

}


/* =========================================
   PHOTO ERROR HANDLER
========================================= */

const photo =
    document.querySelector(
        ".photo-frame img"
    );


if (photo) {

    photo.addEventListener(
        "error",
        function() {

            console.log(
                "Photo not found. Check her-photo.jpg"
            );

        }
    );

}


/* =========================================
   PREVENT ACCIDENTAL FORM SUBMISSION
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement === passwordInput
        ) {

            event.preventDefault();

        }

    }
);


/* =========================================
   FINISHED ❤️
========================================= */

console.log(
    "❤️ Love Surprise loaded successfully."
);
