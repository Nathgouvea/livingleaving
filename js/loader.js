// Page loader
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".page-loader");

  window.addEventListener("load", () => {
    loader.classList.add("loaded");
  });
});
