document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const observedSections = Array.from(document.querySelectorAll(".observed-section[id]"));
const currentYear = document.getElementById("current-year");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
function updateHeader() {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

function setNavigationState(isOpen, returnFocus = false) {
  if (!navToggle || !navPanel) return;

  navToggle.classList.toggle("is-open", isOpen);
  navPanel.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));

  const toggleLabel = navToggle.querySelector(".nav-toggle-word");
  if (toggleLabel) {
    toggleLabel.textContent = isOpen ? "Close" : "Menu";
  }

  document.body.classList.toggle("nav-open", isOpen);

  if (!isOpen && returnFocus) {
    navToggle.focus();
  }
}

if (navToggle && navPanel) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") !== "true";
    setNavigationState(isOpen);
  });

  navPanel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setNavigationState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      navToggle.getAttribute("aria-expanded") === "true" &&
      !navToggle.contains(event.target) &&
      !navPanel.contains(event.target)
    ) {
      setNavigationState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      setNavigationState(false, true);
    }
  });

  const desktopNavigation = window.matchMedia("(min-width: 1101px)");
  const resetNavigation = () => setNavigationState(false);

  if (typeof desktopNavigation.addEventListener === "function") {
    desktopNavigation.addEventListener("change", resetNavigation);
  } else {
    desktopNavigation.addListener(resetNavigation);
  }
}

function updateCurrentSection(sectionId) {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;
    if (isCurrent) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if (observedSections.length) {
  updateCurrentSection(observedSections[0].id);
}

if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => {
          const firstDistance = Math.abs(first.boundingClientRect.top);
          const secondDistance = Math.abs(second.boundingClientRect.top);
          return firstDistance - secondDistance;
        });

      if (visibleEntries[0]) {
        updateCurrentSection(visibleEntries[0].target.id);
      }
    },
    {
      rootMargin: "-22% 0px -64% 0px",
      threshold: [0, 0.12, 0.3]
    }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

const lightbox = document.querySelector("[data-lightbox]");
const lightboxItems = Array.from(document.querySelectorAll("[data-lightbox-item]"));

if (lightbox && lightboxItems.length && typeof lightbox.showModal === "function") {
  const lightboxImage = lightbox.querySelector("[data-lightbox-image]");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  const lightboxCount = lightbox.querySelector("[data-lightbox-count]");
  const previousButton = lightbox.querySelector("[data-lightbox-previous]");
  const nextButton = lightbox.querySelector("[data-lightbox-next]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");

  let currentIndex = 0;
  let openingLink = null;

  function renderLightboxItem() {
    const item = lightboxItems[currentIndex];
    const thumbnail = item.querySelector("img");

    lightboxImage.src = item.href;
    lightboxImage.alt = item.dataset.lightboxAlt || thumbnail?.alt || "";
    lightboxCaption.textContent = item.dataset.lightboxCaption || "";
    lightboxCount.textContent = `${currentIndex + 1} / ${lightboxItems.length}`;

    const hasMultipleItems = lightboxItems.length > 1;
    previousButton.disabled = !hasMultipleItems;
    nextButton.disabled = !hasMultipleItems;
  }

  function openLightbox(index, opener) {
    currentIndex = index;
    openingLink = opener;
    renderLightboxItem();
    document.body.classList.add("lightbox-open");
    lightbox.showModal();
    closeButton.focus();
  }

  function closeLightbox() {
    if (lightbox.open) {
      lightbox.close();
    }
  }

  function showRelativeItem(offset) {
    currentIndex = (currentIndex + offset + lightboxItems.length) % lightboxItems.length;
    renderLightboxItem();
  }

  lightboxItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      openLightbox(index, item);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", () => showRelativeItem(-1));
  nextButton.addEventListener("click", () => showRelativeItem(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showRelativeItem(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showRelativeItem(1);
    }
  });

  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    lightboxImage.removeAttribute("src");

    if (openingLink) {
      openingLink.focus();
    }
  });
}
