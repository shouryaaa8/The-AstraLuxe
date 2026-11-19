async function loadComponent(placeholderId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        document.getElementById(placeholderId).innerHTML = html;
    } catch (error) {
        console.error("Error loading component:", error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    // 1. Save the hash from the URL immediately (e.g., "#contact-form")
    const targetHash = window.location.hash;

    // 2. Wait for the header and footer to finish downloading and inserting
    await loadComponent("header-placeholder", "sections/header.html");
    await loadComponent("footer-placeholder", "sections/footer.html");
    await loadComponent("whatsapp-placeholder", "sections/whatsapp.html");

    // 3. Now that the layout is stable, scroll to the target section if a hash exists
    if (targetHash) {
        setTimeout(() => {
            const targetElement = document.querySelector(targetHash);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start" 
                });
            }
        }, 150); // 150ms delay gives the browser time to paint the final layout
    }

    
        /* =========================================================
        REGISTRATION DROPDOWN
        Works with dynamically loaded header.html
        ========================================================= */

        document.addEventListener("click", function (event) {
        // Detect clicks on the trigger, including clicks on the icon or text.
        const trigger = event.target.closest(".al-nav-dropdown__trigger");

        if (trigger) {
            event.preventDefault();

            const dropdown = trigger.closest(".al-nav-dropdown");
            if (!dropdown) return;

            const isAlreadyOpen = dropdown.classList.contains("is-open");

            // Close any other open dropdowns.
            document.querySelectorAll(".al-nav-dropdown.is-open").forEach((item) => {
            item.classList.remove("is-open");

            const itemTrigger = item.querySelector(".al-nav-dropdown__trigger");
            if (itemTrigger) {
                itemTrigger.setAttribute("aria-expanded", "false");
            }
            });

            // Toggle the clicked dropdown.
            if (!isAlreadyOpen) {
            dropdown.classList.add("is-open");
            trigger.setAttribute("aria-expanded", "true");
            }

            return;
        }

        // Close when clicking outside the dropdown.
        if (!event.target.closest(".al-nav-dropdown")) {
            document.querySelectorAll(".al-nav-dropdown.is-open").forEach((item) => {
            item.classList.remove("is-open");

            const itemTrigger = item.querySelector(".al-nav-dropdown__trigger");
            if (itemTrigger) {
                itemTrigger.setAttribute("aria-expanded", "false");
            }
            });
        }
        });

        // Close the dropdown with Escape.
        document.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        document.querySelectorAll(".al-nav-dropdown.is-open").forEach((item) => {
            item.classList.remove("is-open");

            const trigger = item.querySelector(".al-nav-dropdown__trigger");
            if (trigger) {
            trigger.setAttribute("aria-expanded", "false");
            trigger.focus();
            }
        });
        });

        
/* =======================================================
   ASTRALUXE — MOBILE MENU FUNCTIONALITY
   Works with dynamically loaded header.html
======================================================= */

document.addEventListener("click", function (event) {

  if (window.innerWidth > 1024) return;

  const nav = document.getElementById("al-primary-nav");
  const menuButton = document.getElementById("al-mobile-menu-btn");
  const backdrop = document.getElementById("al-menu-backdrop");

  if (!nav || !menuButton) return;

  // HAMBURGER CLICK
  if (event.target.closest("#al-mobile-menu-btn")) {

    const isOpen = !nav.classList.contains("is-open");

    nav.classList.toggle("is-open", isOpen);
    backdrop?.classList.toggle("is-visible", isOpen);
    menuButton.classList.toggle("is-active", isOpen);

    document.body.classList.toggle("al-menu-open", isOpen);

    menuButton.setAttribute("aria-expanded", String(isOpen));

    return;
  }

  // BACKDROP CLICK
  if (event.target.closest("#al-menu-backdrop")) {
    closeMobileMenu();
    return;
  }

  // NAVIGATION LINK CLICK
  if (nav.contains(event.target) && event.target.closest("a")) {
    closeMobileMenu();
    return;
  }

  // CLICK OUTSIDE THE MENU
  if (
    nav.classList.contains("is-open") &&
    !nav.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {
    closeMobileMenu();
  }

});


function closeMobileMenu() {

  const nav = document.getElementById("al-primary-nav");
  const menuButton = document.getElementById("al-mobile-menu-btn");
  const backdrop = document.getElementById("al-menu-backdrop");

  nav?.classList.remove("is-open");
  menuButton?.classList.remove("is-active");
  backdrop?.classList.remove("is-visible");

  document.body.classList.remove("al-menu-open");

  menuButton?.setAttribute("aria-expanded", "false");

  nav?.querySelectorAll(".al-nav-dropdown.is-open").forEach(dropdown => {
    dropdown.classList.remove("is-open");

    dropdown.querySelector(".al-nav-dropdown__trigger")
      ?.setAttribute("aria-expanded", "false");
  });

}


// CLOSE WITH ESCAPE
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeMobileMenu();
  }
});


// RESET ON DESKTOP
window.addEventListener("resize", function () {
  if (window.innerWidth > 1024) {
    closeMobileMenu();
  }
});


    document.addEventListener("DOMContentLoaded", () => {

        /* =====================================
        FAQ ACCORDION
        ===================================== */

        const faqItems = document.querySelectorAll(".al-hs-faq-item");

        faqItems.forEach((item) => {
            const button = item.querySelector(".al-hs-faq-question");
            const answer = item.querySelector(".al-hs-faq-answer");

            if (!button || !answer) return;

            button.addEventListener("click", () => {
                const isOpen = item.classList.contains("is-open");

                faqItems.forEach((faq) => {
                    faq.classList.remove("is-open");

                    const faqButton = faq.querySelector(".al-hs-faq-question");
                    const faqAnswer = faq.querySelector(".al-hs-faq-answer");

                    if (faqButton) {
                        faqButton.setAttribute("aria-expanded", "false");
                    }

                    if (faqAnswer) {
                        faqAnswer.style.maxHeight = null;
                    }
                });

                if (!isOpen) {
                    item.classList.add("is-open");
                    button.setAttribute("aria-expanded", "true");
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });

            if (item.classList.contains("is-open")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });


        /* =====================================
        GSAP ANIMATIONS
        ===================================== */

        if (typeof gsap === "undefined" ||
            typeof ScrollTrigger === "undefined") {

            document.querySelectorAll(".al-hs-reveal").forEach((element) => {
                element.style.opacity = "1";
                element.style.transform = "none";
                element.style.clipPath = "none";
            });

            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion) {
            gsap.set(".al-hs-reveal", {
                opacity: 1,
                y: 0,
                clipPath: "inset(0 0 0 0)"
            });

            return;
        }


        /* HERO ANIMATION */

        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        heroTimeline
            .from(".al-hs-hero__content .al-hs-eyebrow", {
                opacity: 0,
                y: 30,
                duration: 0.8
            })
            .from(".al-hs-hero h1", {
                opacity: 0,
                y: 65,
                duration: 1.1
            }, "-=0.45")
            .from(".al-hs-hero__description", {
                opacity: 0,
                y: 35,
                duration: 0.8
            }, "-=0.65")
            .from(".al-hs-hero__actions", {
                opacity: 0,
                y: 25,
                duration: 0.8
            }, "-=0.5")
            .from(".al-hs-hero__bottom", {
                opacity: 0,
                duration: 1
            }, "-=0.3");


        /* GENERAL SECTION REVEALS */

        gsap.utils.toArray(".al-hs-reveal").forEach((element) => {

            if (element.closest(".al-hs-hero")) return;

            gsap.fromTo(element,
                {
                    opacity: 0,
                    y: 55
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    }
                }
            );

        });


        /* AGREEMENT MODEL CARDS */

        gsap.from(".al-hs-model-card", {
            opacity: 0,
            y: 85,
            rotateX: 8,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".al-hs-models__grid",
                start: "top 82%",
                once: true
            }
        });


        /* SCOPE CARDS */

        gsap.from(".al-hs-scope-card", {
            opacity: 0,
            y: 70,
            scale: 0.96,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".al-hs-scope__grid",
                start: "top 82%",
                once: true
            }
        });


        /* TIMELINE */

        const timelineLine = document.querySelector(
            ".al-hs-timeline__line span"
        );

        const timelineSteps = gsap.utils.toArray(
            ".al-hs-timeline-step"
        );

        if (timelineLine) {
            gsap.fromTo(timelineLine,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    transformOrigin: "top",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".al-hs-timeline",
                        start: "top 75%",
                        end: "bottom 65%",
                        scrub: 1
                    }
                }
            );
        }

        timelineSteps.forEach((step, index) => {
            gsap.from(step, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                delay: index * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: step,
                    start: "top 90%",
                    once: true
                }
            });
        });


        /* DIFFERENCE LIST */

        gsap.from(".al-hs-difference-item", {
            opacity: 0,
            x: -45,
            duration: 0.75,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".al-hs-difference__list",
                start: "top 82%",
                once: true
            }
        });


        /* LEGAL NOTICE */

        gsap.from(".al-hs-legal__inner", {
            opacity: 0,
            y: 65,
            scale: 0.98,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".al-hs-legal",
                start: "top 82%",
                once: true
            }
        });


        /* CTA */

        gsap.from(".al-hs-cta__content > *", {
            opacity: 0,
            y: 45,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".al-hs-cta",
                start: "top 75%",
                once: true
            }
        });


        /* REFRESH SCROLL TRIGGER */

        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        });

    });



});