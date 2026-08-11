
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
   HERO PROMO SLIDER (UNCHANGED - SAFE)
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

  heroSlider.addEventListener("scroll", updateHeroDots);
  updateHeroDots();

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
   PROMO SLIDER (NEW STRUCTURE - FIXED)
====================================================== */

const promoSlider = document.querySelector(".promo-slider");
const promoItems = document.querySelectorAll(".promo-item");
const promoDots = document.querySelectorAll(".promo-dot");

if (promoSlider && promoItems.length) {

  const today = new Date().getDay();

  let activeIndex = 0;

  // 1. highlight correct promo based on data-days
  promoItems.forEach((item, index) => {

    const days = item.dataset.days
      .split(",")
      .map(n => Number(n.trim()));

    if (days.includes(today)) {
      item.classList.add("active");
      activeIndex = index;
    }

  });

  // 2. auto scroll to today's promo (safe delay for layout render)
  setTimeout(() => {
    promoItems[activeIndex].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }, 250);

  // 3. set active dot
  if (promoDots[activeIndex]) {
    promoDots[activeIndex].classList.add("active");
  }

  // 4. sync dots with manual scroll (robust version)
  promoSlider.addEventListener("scroll", () => {

    const cardWidth = promoItems[0].offsetWidth + 18;

    const index = Math.round(promoSlider.scrollLeft / cardWidth);

    promoDots.forEach(dot => dot.classList.remove("active"));

    if (promoDots[index]) {
      promoDots[index].classList.add("active");
    }

  });

}

/* ======================================================
   HERO PROMO CAROUSEL
====================================================== */

(() => {
  const promoWrapper = document.querySelector(".hero-promo-wrapper");
  if (!promoWrapper) return;

  const posters = promoWrapper.querySelectorAll(".promo-poster");
  const dots = promoWrapper.querySelectorAll(".promo-dot");
  const prevBtn = promoWrapper.querySelector(".promo-nav.prev");
  const nextBtn = promoWrapper.querySelector(".promo-nav.next");

  if (!posters.length || !dots.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  let timer;

  const showSlide = (index) => {
    currentIndex = (index + posters.length) % posters.length;
    posters.forEach((poster, i) => poster.classList.toggle("active", i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  const startAutoSlide = () => {
    clearInterval(timer);
    timer = setInterval(nextSlide, 4000);
  };

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });

  showSlide(currentIndex);
  startAutoSlide();
})();


/* ======================================================
   OPTIONAL AUTOPLAY (DISABLED)
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
