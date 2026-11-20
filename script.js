const eyes = [
  {
    name: "SHARINGAN",
    clan: "CLAN UCHIHA",
    description: "Permite percibir movimiento, copiar técnicas y anticipar ataques. Evoluciona junto a las emociones intensas del usuario.",
    power: "A",
    vision: "PRECOG.",
    origin: "UCHIHA",
    color: "#d43b24",
    symbol: "輪"
  },
  {
    name: "BYAKUGAN",
    clan: "CLAN HYŪGA",
    description: "Otorga una visión de casi 360 grados y permite observar el flujo del chakra dentro del sistema interno de un objetivo.",
    power: "S",
    vision: "360°",
    origin: "HYŪGA",
    color: "#d7d1bd",
    symbol: "透"
  },
  {
    name: "RINNEGAN",
    clan: "ORIGEN DEL CHAKRA",
    description: "El Dōjutsu más poderoso. Permite controlar fuerzas naturales, invocar seres y dominar las seis vías del poder.",
    power: "S+",
    vision: "TOTAL",
    origin: "RIKUDŌ",
    color: "#7041bc",
    symbol: "輪"
  },
  {
    name: "MANGEKYŌ",
    clan: "CLAN UCHIHA",
    description: "Forma avanzada del Sharingan. Desbloquea técnicas únicas para cada usuario, a costa de daño progresivo a la visión.",
    power: "S",
    vision: "ÚNICA",
    origin: "UCHIHA",
    color: "#8d1717",
    symbol: "万"
  },
  {
    name: "JOUGAN",
    clan: "ORIGEN DE MOMOSHIKI",
    description: "Un Dōjutsu misterioso ligado a las dimensiones ocultas y a una gran sensibilidad frente a alteraciones de chakra.",
    power: "???",
    vision: "CHAKRA",
    origin: "KASHIN",
    color: "#397cbd",
    symbol: "净"
  }
];

let activeEye = 0;

const card = document.querySelector("#eyeCard");
const visual = document.querySelector("#cardVisual");
const eyeName = document.querySelector("#eyeName");
const eyeClan = document.querySelector("#eyeClan");
const eyeDescription = document.querySelector("#eyeDescription");
const eyePower = document.querySelector("#eyePower");
const eyeVision = document.querySelector("#eyeVision");
const eyeOrigin = document.querySelector("#eyeOrigin");
const eyeSymbol = document.querySelector("#eyeSymbol");
const activeNumber = document.querySelector("#activeNumber");

function createDots() {
  const dots = document.querySelector("#dots");
  eyes.forEach((eye, index) => {
    const dot = document.createElement("button");
    dot.className = `dot${index === 0 ? " active" : ""}`;
    dot.setAttribute("aria-label", `Ver ${eye.name}`);
    dot.addEventListener("click", () => setEye(index));
    dots.appendChild(dot);
  });
}

function setEye(index) {
  activeEye = (index + eyes.length) % eyes.length;
  const eye = eyes[activeEye];

  anime({
    targets: ".card-info > *, .card-eye",
    opacity: [1, 0],
    translateY: [0, 12],
    duration: 180,
    easing: "easeInQuad",
    complete: () => {
      eyeName.textContent = eye.name;
      eyeClan.textContent = eye.clan;
      eyeDescription.textContent = eye.description;
      eyePower.textContent = eye.power;
      eyeVision.textContent = eye.vision;
      eyeOrigin.textContent = eye.origin;
      eyeSymbol.textContent = eye.symbol;
      visual.style.background = eye.color;
      activeNumber.textContent = String(activeEye + 1).padStart(2, "0");

      document.querySelectorAll(".dot").forEach((dot, i) => dot.classList.toggle("active", i === activeEye));

      anime({
        targets: ".card-info > *, .card-eye",
        opacity: [0, 1],
        translateY: [18, 0],
        rotate: [eyeName === 0 ? 0 : "-4deg", "0deg"],
        delay: anime.stagger(55),
        duration: 650,
        easing: "easeOutExpo"
      });

      anime({
        targets: ".card-pupil",
        scale: [0.4, 1],
        rotate: [90, 0],
        duration: 800,
        easing: "easeOutElastic(1, .6)"
      });
    }
  });
}

createDots();

document.querySelector("#prevBtn").addEventListener("click", () => setEye(activeEye - 1));
document.querySelector("#nextBtn").addEventListener("click", () => setEye(activeEye + 1));

// Timeline de entrada coordinada para el hero.
anime.timeline({ easing: "easeOutExpo", duration: 900 })
  .add({ targets: ".topbar", translateY: [-30, 0], opacity: [0, 1] })
  .add({ targets: ".hero-copy > *", translateX: [-35, 0], opacity: [0, 1], delay: anime.stagger(100) }, "-=650")
  .add({ targets: ".hero-eye", scale: [0, 1], rotate: [45, 405], duration: 1200 }, "-=700")
  .add({ targets: ".orbit", scale: [0.2, 1], opacity: [0, 1], delay: anime.stagger(120), duration: 1000 }, "-=900")
  .add({ targets: ".kanji", opacity: [0, .35], scale: [0.5, 1], delay: anime.stagger(180) }, "-=600");

anime({
  targets: ".orbit-1",
  rotate: 360,
  duration: 18000,
  loop: true,
  easing: "linear"
});

anime({
  targets: ".orbit-2",
  rotate: -360,
  duration: 24000,
  loop: true,
  easing: "linear"
});

const heroVisual = document.querySelector("#heroVisual");
heroVisual.addEventListener("pointermove", (event) => {
  const rect = heroVisual.getBoundingClientRect();
  const x = (event.clientX - rect.left - rect.width / 2) / 18;
  const y = (event.clientY - rect.top - rect.height / 2) / 18;

  anime({
    targets: ".hero-eye",
    translateX: x,
    translateY: y,
    duration: 600,
    easing: "easeOutQuad"
  });
});

// Reveal del archivo al entrar en pantalla.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    anime({
      targets: entry.target === card ? ".eye-card" : ".about > *",
      opacity: [0, 1],
      translateY: [35, 0],
      delay: anime.stagger(100),
      duration: 900,
      easing: "easeOutExpo"
    });
  });
}, { threshold: 0.25 });

observer.observe(card);
observer.observe(document.querySelector("#about"));
