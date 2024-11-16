// Scroll to top functionality
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
