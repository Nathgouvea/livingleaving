document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.querySelector(".mobile-menu");
  const mobileMenuContainer = document.querySelector(".mobile-menu-container");

  // Function to close menu
  function closeMenu() {
    mobileMenuButton.classList.remove("active");
    mobileMenuContainer.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Toggle menu on button click
  mobileMenuButton.addEventListener("click", function () {
    if (mobileMenuContainer.classList.contains("active")) {
      closeMenu();
    } else {
      mobileMenuButton.classList.add("active");
      mobileMenuContainer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });

  // Close menu when clicking on a link
  const mobileMenuLinks = mobileMenuContainer.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenuButton.contains(event.target) &&
      !mobileMenuContainer.contains(event.target) &&
      mobileMenuContainer.classList.contains("active")
    ) {
      closeMenu();
    }
  });

  // Felt so Fair Section Toggle
  const feltToggle = document.querySelector(".felt-so-fair-toggle");
  const feltSection = document.querySelector(".felt-so-fair-section");

  if (feltToggle && feltSection) {
    // Only toggle when clicking the toggle button itself
    feltToggle.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent event from bubbling up
      feltSection.classList.toggle("expanded");
      feltToggle.classList.toggle("expanded");
    });

    // Allow links within the Felt so Fair section to work
    feltSection.addEventListener("click", (event) => {
      // If the clicked element is a link, let it propagate
      if (event.target.tagName === "A") {
        event.stopPropagation();
        return true;
      }
    });
  }
});
