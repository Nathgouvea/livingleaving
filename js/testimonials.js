document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".testimonials-track");
  const cards = Array.from(document.querySelectorAll(".testimonial-card"));
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const dotsContainer = document.querySelector(".testimonials-dots");

  let currentPage = 0;
  const cardsPerPage = 2;
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToPage(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update dots
  function updateDots() {
    const dots = Array.from(document.querySelectorAll(".dot"));
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  // Update buttons
  function updateButtons() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === totalPages - 1;

    // Instead of hiding, we'll just style them differently when disabled
    prevButton.style.opacity = currentPage === 0 ? "0.5" : "1";
    nextButton.style.opacity = currentPage === totalPages - 1 ? "0.5" : "1";

    // Always keep them visible
    prevButton.style.visibility = "visible";
    nextButton.style.visibility = "visible";
  }

  // Calculate slide offset
  function calculateOffset(page) {
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // Match the gap from CSS
    const trackMargin = 10; // Match the track margin from CSS
    return (
      -(page * (cardWidth + gap) * cardsPerPage) +
      (page === 0 ? trackMargin : 0)
    );
  }

  // Go to specific page
  function goToPage(page) {
    currentPage = page;
    const offset = calculateOffset(page);
    track.style.transform = `translateX(${offset}px)`;

    // Hide all cards first
    cards.forEach((card) => {
      card.classList.remove("visible");
    });

    // Show only the cards for the current page
    const startIndex = page * cardsPerPage;
    for (
      let i = startIndex;
      i < startIndex + cardsPerPage && i < cards.length;
      i++
    ) {
      cards[i].classList.add("visible");
    }

    updateDots();
    updateButtons();
  }

  // Previous slide
  prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  });

  // Next slide
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  });

  // Handle window resize
  function handleResize() {
    goToPage(currentPage);
  }

  // Initial setup
  createDots();
  updateButtons();
  goToPage(0); // Ensure proper initial state

  // Add resize listener with debounce
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 250);
  });
});
