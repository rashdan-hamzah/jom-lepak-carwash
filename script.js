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
   PROMOTION SLIDER
====================================================== */

const slider = document.querySelector(".hero-slider");
const cards = document.querySelectorAll(".hero-card");
const dots = document.querySelectorAll(".hero-dot");

if (slider && cards.length) {

    // -------------------------------
    // Highlight today's promotion
    // -------------------------------

    const today = new Date().getDay();

    let activePromo = 0;

    if (today === 1 || today === 2) {

        activePromo = 0; // Monday & Tuesday

    } else if (today === 3 || today === 4) {

        activePromo = 1; // Wednesday & Thursday

    } else if (today === 5 || today === 6) {

        activePromo = 2; // Friday & Saturday

    } else {

        activePromo = 3; // Sunday

    }

    cards[activePromo].classList.add("hero-active");

    // ----------------------------------------
    // Move today's card to the beginning
    // ----------------------------------------

    slider.prepend(cards[activePromo]);

    // ----------------------------------------
    // Auto scroll to beginning
    // ----------------------------------------

    slider.scrollLeft = 0;

    // ----------------------------------------
    // Pagination dots
    // ----------------------------------------

    function updateDots() {

        if (!dots.length) return;

        const cardWidth = slider.querySelector(".hero-card").offsetWidth + 18;

        const index = Math.round(slider.scrollLeft / cardWidth);

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    updateDots();

    slider.addEventListener("scroll", updateDots);

    // ----------------------------------------
    // Drag scrolling (desktop)
    // ----------------------------------------

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {

        isDown = true;

        slider.classList.add("dragging");

        startX = e.pageX - slider.offsetLeft;

        scrollLeft = slider.scrollLeft;

    });

    slider.addEventListener("mouseleave", () => {

        isDown = false;

        slider.classList.remove("dragging");

    });

    slider.addEventListener("mouseup", () => {

        isDown = false;

        slider.classList.remove("dragging");

    });

    slider.addEventListener("mousemove", (e) => {

        if (!isDown) return;

        e.preventDefault();

        const x = e.pageX - slider.offsetLeft;

        const walk = (x - startX) * 1.5;

        slider.scrollLeft = scrollLeft - walk;

    });

}

/* ======================================================
   OPTIONAL AUTOPLAY
====================================================== */

// Uncomment this if you want the banners to
// automatically slide every 6 seconds.

/*

let current = 0;

setInterval(() => {

    if (!slider) return;

    const cardWidth = slider.querySelector(".hero-card").offsetWidth + 18;

    current++;

    if (current >= slider.children.length) {

        current = 0;

    }

    slider.scrollTo({

        left: current * cardWidth,

        behavior: "smooth"

    });

}, 6000);

*/
