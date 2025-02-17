document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu");
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenuButton.classList.toggle("active");
    mobileMenuContainer.classList.toggle("active");
    // Prevent scrolling when menu is open
    document.body.style.overflow = mobileMenuContainer.classList.contains(
      "active"
    )
      ? "hidden"
      : "";
  });

  // Close menu when clicking on a link
  const mobileMenuLinks = mobileMenuContainer.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenuButton.classList.remove("active");
      mobileMenuContainer.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});
