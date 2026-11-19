/* =====================================================
   THE ASTRALUXE ADVISORY
   SHARED HOSPITALITY SERVICE PAGE ANIMATIONS

   GSAP + ScrollTrigger
===================================================== */

(() => {

  const root = document.querySelector(".al-hospitality-page");

  // Stop if this is not a hospitality service page.
  if (!root) return;


  /* =====================================================
     01. ACCESSIBILITY CHECK
  ===================================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const hasGSAP = typeof gsap !== "undefined";


  /* =====================================================
     02. FAQ ACCORDION
     Keep only one FAQ open at a time.
  ===================================================== */

  const faqItems = [
    ...document.querySelectorAll(".al-hs-accordion details")
  ];

  faqItems.forEach((item) => {

    item.addEventListener("toggle", () => {

      if (!item.open) return;

      faqItems.forEach((otherItem) => {

        if (otherItem !== item) {
          otherItem.open = false;
        }

      });

    });

  });


  /* =====================================================
     03. FALLBACK WHEN GSAP IS UNAVAILABLE
  ===================================================== */

  if (reducedMotion || !hasGSAP) {

    document
      .querySelectorAll(".al-hs-reveal")
      .forEach((element) => {

        element.style.opacity = "1";
        element.style.clipPath = "none";
        element.style.transform = "none";

      });

    return;
  }


  /* =====================================================
     04. REGISTER SCROLLTRIGGER
  ===================================================== */

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }


  /* =====================================================
     05. HERO IMAGE ANIMATION
     Slow cinematic image reveal.
  ===================================================== */

  const heroImage = document.querySelector(
    ".al-hs-hero__image"
  );

  if (heroImage) {

    gsap.to(heroImage, {

      scale: 1,

      duration: 2,

      ease: "power2.out"

    });

  }


  /* =====================================================
     06. HERO CONTENT ANIMATION
     Staggered heading and text entrance.
  ===================================================== */

  const heroContent = document.querySelector(
    ".al-hs-hero__content"
  );

  if (heroContent) {

    gsap.from(heroContent.children, {

      y: 32,

      opacity: 0,

      duration: 1,

      stagger: 0.14,

      ease: "power3.out",

      delay: 0.15

    });

  }


  /* =====================================================
     07. GENERAL SCROLL REVEALS
  ===================================================== */

  document.querySelectorAll(
    [
      ".al-hs-kicker",
      ".al-hs-copy h2",
      ".al-hs-copy p",
      ".al-hs-underlink",
      ".al-hs-section-head",
      ".al-hs-faq-grid > div:first-child"
    ].join(",")
  ).forEach((element) => {

    gsap.from(element, {

      y: 26,

      opacity: 0,

      duration: 0.85,

      ease: "power3.out",

      scrollTrigger: {

        trigger: element,

        start: "top 88%",

        once: true

      }

    });

  });


  /* =====================================================
     08. IMAGE CLIP-PATH REVEAL
  ===================================================== */

  document
    .querySelectorAll(".al-hs-reveal")
    .forEach((element) => {

      gsap.to(element, {

        clipPath: "inset(0 0 0% 0)",

        duration: 1.15,

        ease: "power3.inOut",

        scrollTrigger: {

          trigger: element,

          start: "top 82%",

          once: true

        }

      });

    });


  /* =====================================================
     09. SCOPE OF SERVICES CARD ANIMATION
     Six cards enter with a staggered reveal.
  ===================================================== */

  const scopeCards = gsap.utils.toArray(
    ".al-hs-scope-grid article"
  );

  if (scopeCards.length) {

    gsap.from(scopeCards, {

      y: 36,

      opacity: 0,

      duration: 0.8,

      stagger: 0.1,

      ease: "power3.out",

      scrollTrigger: {

        trigger: ".al-hs-scope-grid",

        start: "top 82%",

        once: true

      }

    });

  }


  /* =====================================================
     10. APPROACH TIMELINE ANIMATION
     Progress line fills as the user scrolls.
  ===================================================== */

  const timelineSteps = gsap.utils.toArray(
    ".al-hs-steps article"
  );

  const progressLine = document.querySelector(
    ".al-hs-progress span"
  );


  if (progressLine && timelineSteps.length) {

    // Animate vertical progress line.
    gsap.to(progressLine, {

      height: "100%",

      ease: "none",

      scrollTrigger: {

        trigger: ".al-hs-steps",

        start: "top 72%",

        end: "bottom 65%",

        scrub: 0.5

      }

    });


    // Highlight the active timeline stage.
    timelineSteps.forEach((step) => {

      ScrollTrigger.create({

        trigger: step,

        start: "top 72%",

        end: "bottom 55%",

        onEnter: () => {
          step.classList.add("active");
        },

        onEnterBack: () => {
          step.classList.add("active");
        },

        onLeave: () => {
          step.classList.remove("active");
        },

        onLeaveBack: () => {
          step.classList.remove("active");
        }

      });

    });

  }


  /* =====================================================
     11. WHY ASTRALUXE SECTION
     Staggered horizontal reveal.
  ===================================================== */

  const differencePoints = gsap.utils.toArray(
    ".al-hs-difference-list article"
  );

  if (differencePoints.length) {

    gsap.from(differencePoints, {

      x: 30,

      opacity: 0,

      duration: 0.75,

      stagger: 0.12,

      ease: "power3.out",

      scrollTrigger: {

        trigger: ".al-hs-difference-list",

        start: "top 82%",

        once: true

      }

    });

  }


  /* =====================================================
     12. FINAL CTA ANIMATION
  ===================================================== */

  const ctaContent = document.querySelector(
    ".al-hs-cta-content"
  );

  if (ctaContent) {

    gsap.from(ctaContent.children, {

      y: 28,

      opacity: 0,

      duration: 0.9,

      stagger: 0.12,

      ease: "power3.out",

      scrollTrigger: {

        trigger: ctaContent,

        start: "top 82%",

        once: true

      }

    });

  }


})();