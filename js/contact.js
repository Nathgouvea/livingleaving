document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  const errorMessages = {
    name: {
      required: "Vul alstublieft uw naam in",
      minlength: "Naam moet minimaal 2 karakters bevatten",
    },
    email: {
      required: "Vul alstublieft uw email in",
      invalid: "Vul alstublieft een geldig emailadres in",
    },
    phone: {
      invalid: "Vul alstublieft een geldig telefoonnummer in",
    },
    message: {
      required: "Vul alstublieft uw bericht in",
      minlength: "Bericht moet minimaal 10 karakters bevatten",
    },
  };

  function showError(input, message) {
    const errorElement = input.parentElement.querySelector(".error-message");
    input.classList.add("error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("visible");
    }
  }

  function clearError(input) {
    const errorElement = input.parentElement.querySelector(".error-message");
    input.classList.remove("error");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("visible");
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    if (!phone) return true; // Phone is optional
    return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone);
  }

  function validateForm() {
    let isValid = true;
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      clearError(input);

      if (input.required && !input.value.trim()) {
        showError(input, errorMessages[input.name].required);
        isValid = false;
      } else if (input.name === "email" && !validateEmail(input.value)) {
        showError(input, errorMessages.email.invalid);
        isValid = false;
      } else if (input.name === "phone" && !validatePhone(input.value)) {
        showError(input, errorMessages.phone.invalid);
        isValid = false;
      } else if (input.minLength && input.value.length < input.minLength) {
        showError(input, errorMessages[input.name].minlength);
        isValid = false;
      }
    });

    return isValid;
  }

  if (form) {
    // Add input event listeners for real-time validation
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => {
        clearError(input);
      });

      input.addEventListener("blur", () => {
        if (input.value.trim()) {
          if (input.name === "email" && !validateEmail(input.value)) {
            showError(input, errorMessages.email.invalid);
          } else if (input.name === "phone" && !validatePhone(input.value)) {
            showError(input, errorMessages.phone.invalid);
          } else if (input.minLength && input.value.length < input.minLength) {
            showError(input, errorMessages[input.name].minlength);
          }
        }
      });
    });

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Hide the form
          form.style.display = "none";
          // Show success message
          successMessage.style.display = "flex";
          // Clear the form
          form.reset();

          // After 5 seconds, hide success message and show form again
          setTimeout(() => {
            successMessage.style.display = "none";
            form.style.display = "block";
          }, 5000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(
          "Er is een fout opgetreden bij het versturen van het formulier. Probeer het later opnieuw."
        );
      }
    });
  }
});
