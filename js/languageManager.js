class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem("language") || "nl";
    this.translations = null;
    this.init();
  }

  async init() {
    try {
      // Import translations
      const module = await import("./translations.js");
      this.translations = module.default;

      // Initial translation
      this.translate();

      // Set up language switcher
      this.setupLanguageSwitcher();

      // Log successful initialization
      console.log("Language Manager initialized successfully");
    } catch (error) {
      console.error("Error initializing Language Manager:", error);
    }
  }

  setupLanguageSwitcher() {
    const languageSwitcher = document.getElementById("language-switcher");
    if (languageSwitcher) {
      // Set initial value
      languageSwitcher.value = this.currentLang;

      // Add change event listener
      languageSwitcher.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
        console.log("Language changed to:", e.target.value);
      });
    } else {
      console.error("Language switcher element not found");
    }
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem("language", lang);
      this.translate();
      // Dispatch event for other components that might need to know about the language change
      window.dispatchEvent(
        new CustomEvent("languageChanged", { detail: { language: lang } })
      );
    } else {
      console.error("Translation not found for language:", lang);
    }
  }

  translate() {
    try {
      const elements = document.querySelectorAll("[data-i18n]");
      elements.forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const translation = this.getTranslation(key);

        if (translation) {
          if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
            element.placeholder = translation;
          } else {
            element.textContent = translation;
          }
        } else {
          console.warn(`Translation not found for key: ${key}`);
        }
      });
    } catch (error) {
      console.error("Error during translation:", error);
    }
  }

  getTranslation(key) {
    try {
      return key
        .split(".")
        .reduce(
          (obj, i) => (obj ? obj[i] : null),
          this.translations[this.currentLang]
        );
    } catch (error) {
      console.error("Error getting translation for key:", key, error);
      return null;
    }
  }
}

// Initialize language manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.langManager = new LanguageManager();
});

// Add this to handle dynamic content
document.addEventListener("contentLoaded", () => {
  if (window.langManager) {
    window.langManager.translate();
  }
});
