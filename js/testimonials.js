document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".testimonials-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevButton = document.querySelector(".nav-button.prev");
  const nextButton = document.querySelector(".nav-button.next");
  const dotsContainer = document.querySelector(".testimonials-dots");

  let currentIndex = 0;
  let cardWidth;
  let numVisible;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSliderDimensions() {
    cardWidth =
      cards[0].offsetWidth +
      parseInt(window.getComputedStyle(cards[0]).marginRight);
    if (window.innerWidth > 1024) {
      numVisible = 3;
    } else if (window.innerWidth > 768) {
      numVisible = 2;
    } else {
      numVisible = 1;
    }
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

    // Update button states
    prevButton.style.opacity = currentIndex === 0 ? "0.5" : "1";
    nextButton.style.opacity =
      currentIndex >= cards.length - numVisible ? "0.5" : "1";
  }

  function goToSlide(index) {
    currentIndex = Math.min(Math.max(index, 0), cards.length - numVisible);
    updateSlider();
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < cards.length - numVisible) {
      currentIndex++;
      updateSlider();
    }
  });

  // Initialize slider
  updateSliderDimensions();
  updateSlider();

  // Update on window resize
  window.addEventListener("resize", () => {
    updateSliderDimensions();
    currentIndex = Math.min(currentIndex, cards.length - numVisible);
    updateSlider();
  });
});
