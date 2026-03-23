document.addEventListener("DOMContentLoaded", () => {
  // 1. Hamburger Menu Logic
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !hamburger.contains(e.target) &&
        !navMenu.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  // 2. K-Pop Slider Logic (reserveringen.html)
  const kpopView = document.getElementById("kpop-view");
  const kpopPrev = document.getElementById("kpop-prev");
  const kpopNext = document.getElementById("kpop-next");
  const kpopDots = document.getElementById("kpop-dots");

  if (kpopView && kpopPrev && kpopNext && kpopDots) {
    const IMAGES = [
      "images/kpop-haar.jpg",
      "images/rumi-met-meisje.jpg",
      "images/kpop-pompoen.jpg",
    ];

    // Preload images
    IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let currentIndex = 0;
    const dots = IMAGES.map((_, idx) => {
      const dot = document.createElement("span");
      dot.className = "kdot" + (idx === 0 ? " active" : "");
      dot.addEventListener("click", () => goToSlide(idx));
      kpopDots.appendChild(dot);
      return dot;
    });

    function renderSlide() {
      kpopView.src = IMAGES[currentIndex];
      dots.forEach((dot, idx) =>
        dot.classList.toggle("active", idx === currentIndex)
      );
    }

    function goToSlide(n) {
      currentIndex = (n + IMAGES.length) % IMAGES.length;
      renderSlide();
    }

    kpopPrev.addEventListener("click", () => goToSlide(currentIndex - 1));
    kpopNext.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // 3. Aimy Booking & Modal Logic (Global)
  const voorwaardenOverlay = document.getElementById("voorwaarden-overlay");
  const voorwaardenContent = document.getElementById("voorwaarden-content");
  const voorwaardenAnnuleer = document.getElementById("voorwaarden-annuleer");
  const voorwaardenAkkoord = document.getElementById("voorwaarden-akkoord");
  const voorwaardenCheckbox = document.getElementById("voorwaarden-checkbox");

  const aimyContainer = document.getElementById("aimy-container");
  const reserveerIntro = document.getElementById("reserveer-intro");

  // Select any button globally that should open the reservation modal
  const reserveerTriggers = document.querySelectorAll(
    ".reserveer-trigger, #open-voorwaarden-btn"
  );

  if (voorwaardenOverlay && reserveerTriggers.length > 0) {
    reserveerTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        voorwaardenOverlay.classList.remove("hidden");
        if (voorwaardenContent) voorwaardenContent.scrollTop = 0;
        if (voorwaardenCheckbox) voorwaardenCheckbox.checked = false;
        if (voorwaardenAkkoord) voorwaardenAkkoord.disabled = true;
        document.body.classList.add("no-scroll");
      });
    });

    if (voorwaardenCheckbox && voorwaardenAkkoord) {
      voorwaardenCheckbox.addEventListener("change", (e) => {
        voorwaardenAkkoord.disabled = !e.target.checked;
      });
    }

    if (voorwaardenAnnuleer) {
      voorwaardenAnnuleer.addEventListener("click", () => {
        voorwaardenOverlay.classList.add("hidden");
        document.body.classList.remove("no-scroll");
      });
    }

    if (voorwaardenAkkoord) {
      voorwaardenAkkoord.addEventListener("click", () => {
        voorwaardenOverlay.classList.add("hidden");
        document.body.classList.remove("no-scroll");

        // If the Aimy container actually exists on this page, show it.
        if (aimyContainer) {
          if (reserveerIntro) reserveerIntro.style.display = "none";
          // Hide all trigger buttons on the page so they don't clutter the view
          reserveerTriggers.forEach((t) => (t.style.display = "none"));

          aimyContainer.classList.remove("hidden");
          aimyContainer.scrollIntoView({ behavior: "smooth" });
        } else {
          // Failsafe: If clicked on a page without the iframe, send them to the reservation page
          window.location.href = "reserveringen.html";
        }
      });
    }
  }
});
