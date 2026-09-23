document.addEventListener("DOMContentLoaded", () => {

    /*
     * =========================
     * MOBILE MENU
     * =========================
     */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            const isOpen = document.body.classList.toggle("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }

    mobileMenuLinks.forEach(link => {

        link.addEventListener("click", () => {

            document.body.classList.remove("menu-open");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
            }

        });

    });


    /*
     * =========================
     * SMOOTH SCROLL
     * =========================
     */

    const samePageLinks = document.querySelectorAll(
        'a[href^="#"], a[href^="index.html#"]'
    );

    samePageLinks.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            let targetId = "";

            if (href.startsWith("#")) {
                targetId = href;
            } else {
                const hash = href.split("#")[1];

                if (!hash) return;

                targetId = `#${hash}`;
            }

            const target = document.querySelector(targetId);

            if (!target) return;

            /*
             * Só impede o comportamento padrão quando
             * estamos realmente na página correspondente.
             */

            const currentPage =
                window.location.pathname.split("/").pop() || "index.html";

            const linkPage =
                href.startsWith("index.html")
                    ? "index.html"
                    : currentPage;

            if (
                href.startsWith("#") ||
                currentPage === linkPage
            ) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /*
     * =========================
     * ACTIVE MENU
     * =========================
     */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navLinks = document.querySelectorAll(
        ".sidebar nav a, .mobile-menu nav a"
    );

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        if (!href) return;

        const cleanHref = href.split("#")[0] || "index.html";

        if (
            cleanHref === currentPage &&
            !href.includes("#")
        ) {
            link.classList.add("active");
        }

    });


    /*
     * =========================
     * HOME SECTION ACTIVE MENU
     * =========================
     */

    const sections = document.querySelectorAll("section[id]");

    if (sections.length > 0 && currentPage === "index.html") {

        const homeLinks = document.querySelectorAll(
            '.sidebar nav a[href^="index.html#"], .mobile-menu nav a[href^="index.html#"]'
        );

        const updateMenu = () => {

            let current = "";

            sections.forEach(section => {

                const top = section.offsetTop - 180;

                if (window.scrollY >= top) {
                    current = section.id;
                }

            });

            homeLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `index.html#${current}`
                ) {
                    link.classList.add("active");
                }

            });

            if (window.scrollY < 300) {

                document
                    .querySelectorAll('.sidebar nav a[href="index.html"]')
                    .forEach(link => link.classList.add("active"));

            }

        };

        window.addEventListener(
            "scroll",
            updateMenu,
            { passive: true }
        );

        updateMenu();

    }


    /*
     * =========================
     * REVEAL ANIMATIONS
     * =========================
     */

    const revealElements = document.querySelectorAll(
        ".intro-content, .contact-grid, .service-detail, .gallery-item, .project-description-grid"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold:0.12
            }
        );

        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /*
     * =========================
     * LIGHTBOX — PROJETOS
     * =========================
     */

    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = lightbox?.querySelector("img");
    const lightboxClose = lightbox?.querySelector(".lightbox-close");

    const galleryItems = document.querySelectorAll(
        "[data-lightbox]"
    );

    if (lightbox && lightboxImage && galleryItems.length > 0) {

        galleryItems.forEach(item => {

            item.addEventListener("click", event => {

                event.preventDefault();

                const imageUrl = item.getAttribute("href");

                lightboxImage.src = imageUrl;

                lightbox.classList.add("open");

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.classList.add("menu-open");

            });

        });


        const closeLightbox = () => {

            lightbox.classList.remove("open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            lightboxImage.src = "";

            document.body.classList.remove("menu-open");

        };


        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });


        document.addEventListener("keydown", event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains("open")
            ) {
                closeLightbox();
            }

        });

    }


    /*
     * =========================
     * IMAGE ERROR FALLBACK
     * =========================
     */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.style.background = "#111";

        });

    });

});