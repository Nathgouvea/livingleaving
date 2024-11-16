const translations = {
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      aboutUs: "About Us",
      contact: "Contact",
    },
    hero: {
      title: "Living and Leaving:",
      subtitle: "Transforming Spaces",
      description:
        "Creating beautiful interiors that tell your story and stage homes that sell",
    },
    // Add other translations as needed
  },
  nl: {
    nav: {
      home: "Home",
      services: "Diensten",
      portfolio: "Portfolio",
      aboutUs: "Over Ons",
      contact: "Contact",
    },
    hero: {
      title: "Living and Leaving:",
      subtitle: "Ruimtes Transformeren",
      description:
        "Creëren van prachtige interieurs die uw verhaal vertellen en huizen die verkopen",
    },
    // Add other translations as needed
  },
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    const translation = key
      .split(".")
      .reduce((obj, i) => (obj ? obj[i] : null), translations[lang]);
    if (translation) {
      element.textContent = translation;
    }
  });
  localStorage.setItem("language", lang);
}

// Initialize language
document.addEventListener("DOMContentLoaded", () => {
  const currentLang = localStorage.getItem("language") || "nl";
  const languageSwitcher = document.getElementById("language-switcher");

  if (languageSwitcher) {
    languageSwitcher.value = currentLang;
    languageSwitcher.addEventListener("change", (e) => {
      setLanguage(e.target.value);
    });
  }

  setLanguage(currentLang);
});
