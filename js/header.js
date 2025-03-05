let lastScrollTop = 0;
const header = document.querySelector(".sticky-header");
const scrollThreshold = 100; // Minimum scroll amount before showing/hiding header

function handleScroll() {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class when page is scrolled
  if (currentScroll > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Throttle scroll event for better performance
let ticking = false;
document.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
});
