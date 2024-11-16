// Cookie consent
document.addEventListener("DOMContentLoaded", function () {
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");

  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieBanner.classList.add("visible");
    }, 2000);
  }

  cookieAccept.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("visible");
  });
});
