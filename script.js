const opening = document.getElementById("opening");
const openButton = document.getElementById("openButton");
const mainContent = document.getElementById("mainContent");
const messageButton = document.getElementById("messageButton");
const messageSection = document.getElementById("messageSection");
const bouquetWrap = document.getElementById("bouquetWrap");

const flowerCards = document.querySelectorAll(".flower-card");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const heartButton = document.getElementById("heartButton");
const loveOverlay = document.getElementById("loveOverlay");
const closeLove = document.getElementById("closeLove");

let toastTimer;

// Opening
openButton.addEventListener("click", () => {
  opening.classList.add("hide");
  mainContent.classList.add("show");

  setTimeout(() => {
    createPetals(22);
    revealOnScroll();
  }, 350);
});

// Scroll to message
messageButton.addEventListener("click", () => {
  messageSection.scrollIntoView({ behavior: "smooth" });
});

// Bouquet interaction
bouquetWrap.addEventListener("click", () => {
  createPetals(28);
  bouquetWrap.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.045)" },
      { transform: "scale(1)" }
    ],
    { duration: 500, easing: "ease-out" }
  );
});

// Flower cards message
flowerCards.forEach((card) => {
  card.addEventListener("click", () => {
    toastText.textContent = card.dataset.message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);

    burstHearts(card);
  });
});

// Final overlay
heartButton.addEventListener("click", () => {
  loveOverlay.classList.add("show");
  document.body.classList.add("no-scroll");

  for (let i = 0; i < 34; i++) {
    setTimeout(createFloatingHeart, i * 75);
  }
});

closeLove.addEventListener("click", closeOverlay);

loveOverlay.addEventListener("click", (event) => {
  if (event.target === loveOverlay) closeOverlay();
});

function closeOverlay() {
  loveOverlay.classList.remove("show");
  document.body.classList.remove("no-scroll");
}

// Reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      element.classList.add("visible");
    }
  });
}

// Petals
function createPetals(amount = 20) {
  for (let i = 0; i < amount; i++) {
    setTimeout(() => {
      const petal = document.createElement("span");
      petal.className = "petal";

      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.setProperty("--drift", `${-140 + Math.random() * 280}px`);
      petal.style.setProperty("--rotate", `${360 + Math.random() * 720}deg`);

      const scale = 0.55 + Math.random() * 0.85;
      petal.style.transform = `scale(${scale})`;
      petal.style.animationDuration = `${4.8 + Math.random() * 3.5}s`;

      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 8500);
    }, i * 70);
  }
}

// Small heart burst on flower cards
function burstHearts(card) {
  const rect = card.getBoundingClientRect();
  const symbols = ["💗", "💕", "♡", "🌸"];

  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("span");
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.position = "fixed";
    heart.style.left = `${rect.left + rect.width / 2}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heart.style.zIndex = "999";
    heart.style.pointerEvents = "none";
    heart.style.fontSize = `${14 + Math.random() * 14}px`;

    document.body.appendChild(heart);

    const x = -90 + Math.random() * 180;
    const y = -70 - Math.random() * 120;

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(.6)", opacity: 0 },
        { opacity: 1, offset: 0.15 },
        { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.25)`, opacity: 0 }
      ],
      { duration: 900 + Math.random() * 450, easing: "cubic-bezier(.2,.8,.2,1)" }
    );

    setTimeout(() => heart.remove(), 1500);
  }
}

// Hearts in final screen
function createFloatingHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.35 ? "💗" : "♡";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.setProperty("--x", `${-80 + Math.random() * 160}px`);
  heart.style.setProperty("--r", `${-40 + Math.random() * 80}deg`);
  heart.style.animationDuration = `${4 + Math.random() * 3}s`;

  loveOverlay.appendChild(heart);
  setTimeout(() => heart.remove(), 7500);
}
