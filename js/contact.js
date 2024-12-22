document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    form.classList.add("submitted");

    // Here you would typically handle the form submission
    // For now, we're just adding the submitted class for validation styles
  });
});
