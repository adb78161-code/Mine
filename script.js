const openBtn = document.getElementById("openBtn");
const loveBtn = document.getElementById("loveBtn");

const opening = document.getElementById("opening");
const surprise = document.getElementById("surprise");
const finalMessage = document.getElementById("finalMessage");
const hearts = document.getElementById("hearts");

openBtn.addEventListener("click", () => {

    opening.style.display = "none";
    surprise.classList.remove("hidden");

    // Start hearts
    createHearts();

});

loveBtn.addEventListener("click", () => {

    finalMessage.classList.remove("hidden");
    loveBtn.style.display = "none";

    // Extra hearts
    for (let i = 0; i < 25; i++) {
        setTimeout(createHeart, i * 100);
    }

});

function createHeart() {

    const heart = document.createElement("div");

    const emojis = ["❤️", "💕", "💗", "💖", "💘", "💝"];

    heart.innerHTML =
        emojis[Math.floor(Math.random() * emojis.length)];

    heart.classList.add("floating-heart");

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (4 + Math.random() * 5) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 25) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9000);
}

function createHearts() {

    // Keep creating hearts
    setInterval(() => {
        createHeart();
    }, 450);

}