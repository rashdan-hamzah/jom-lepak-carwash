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

  const stopAutoSlide = () => {
    clearInterval(timer);
  };

  nextBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startAutoSlide();
    });
  });

  promoWrapper.addEventListener("mouseenter", stopAutoSlide);
  promoWrapper.addEventListener("mouseleave", startAutoSlide);

  showSlide(currentIndex);
  startAutoSlide();
})();
