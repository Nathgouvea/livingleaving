document.addEventListener("DOMContentLoaded", function () {
  // Sticky Header Functionality
  const header = document.querySelector(".sticky-header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.querySelector(".mobile-menu");
  const nav = document.querySelector(".nav-links");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenuButton.classList.toggle("active");
    nav.classList.toggle("active");
  });
});
