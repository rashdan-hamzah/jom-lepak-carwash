/* ======================================================
   MOBILE MENU
====================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const yearEl = document.getElementById("year");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ======================================================
   HERO PROMO SLIDER (EXISTING SYSTEM - DO NOT BREAK)
====================================================== */

const heroSlider = document.querySelector(".hero-slider");
const heroCards = document.querySelectorAll(".hero-card");
const heroDots = document.querySelectorAll(".hero-dot");

if (heroSlider && heroCards.length) {

  const today = new Date().getDay();

  let activePromo = 0;

  if (today === 1 || today === 2) {
    activePromo = 0;
  } else if (today === 3 || today === 4) {
    activePromo = 1;
  } else if (today === 5 || today === 6) {
    activePromo = 2;
  } else {
    activePromo = 3;
  }

  heroCards[activePromo].classList.add("hero-active");

  // SAFE: scroll instead of DOM mutation
  heroCards[activePromo].scrollIntoView({
    behavior: "smooth",
    inline: "center"
  });

  function updateHeroDots() {
    if (!heroDots.length) return;

    const cardWidth = heroSlider.querySelector(".hero-card").offsetWidth + 18;

    const index = Math.round(heroSlider.scrollLeft / cardWidth);

    heroDots.forEach(dot => dot.classList.remove("active"));

    if (heroDots[index]) {
      heroDots[index].classList.add("active");
    }
  }

  updateHeroDots();
  heroSlider.addEventListener("scroll", updateHeroDots);

  // drag scroll (desktop)
  let isDown = false;
  let startX;
  let scrollLeft;

  heroSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    heroSlider.classList.add("dragging");
    startX = e.pageX - heroSlider.offsetLeft;
    scrollLeft = heroSlider.scrollLeft;
  });

  heroSlider.addEventListener("mouseleave", () => {
    isDown = false;
    heroSlider.classList.remove("dragging");
  });

  heroSlider.addEventListener("mouseup", () => {
    isDown = false;
    heroSlider.classList.remove("dragging");
  });

  heroSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - heroSlider.offsetLeft;
    const walk = (x - startX) * 1.5;

    heroSlider.scrollLeft = scrollLeft - walk;
  });
}

/* ======================================================
   PROMO SLIDER (NEW SYSTEM - CLEAN & SAFE)
====================================================== */

const promoSlider = document.querySelector(".promo-slider");
const promoCards = document.querySelectorAll(".promo-card");
const promoDots = document.querySelectorAll(".promo-dot");

if (promoSlider && promoCards.length) {

  const today = new Date().getDay();

  let activeIndex = 0;

  // 1. highlight correct promo based on data-days
  promoCards.forEach((card, index) => {

    const days = card.dataset.days
      .split(",")
      .map(n => Number(n.trim()));

    if (days.includes(today)) {
      card.classList.add("active");
      activeIndex = index;
    }

  });

  // 2. auto scroll to today's promo (smooth UX)
  setTimeout(() => {
    promoCards[activeIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }, 300);

  // 3. set active dot
  if (promoDots[activeIndex]) {
    promoDots[activeIndex].classList.add("active");
  }

  // 4. sync dots with manual scrolling
  promoSlider.addEventListener("scroll", () => {

    const cardWidth = promoCards[0].offsetWidth + 18;

    const index = Math.round(promoSlider.scrollLeft / cardWidth);

    promoDots.forEach(dot => dot.classList.remove("active"));

    if (promoDots[index]) {
      promoDots[index].classList.add("active");
    }

  });

}

/* ======================================================
   OPTIONAL AUTOPLAY (DISABLED BY DEFAULT)
====================================================== */

/*
let currentHero = 0;

setInterval(() => {
  if (!heroSlider) return;

  const cardWidth = heroSlider.querySelector(".hero-card").offsetWidth + 18;

  currentHero++;

  if (currentHero >= heroSlider.children.length) {
    currentHero = 0;
  }

  heroSlider.scrollTo({
    left: currentHero * cardWidth,
    behavior: "smooth"
  });

}, 6000);
*/
