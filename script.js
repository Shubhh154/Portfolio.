// Cursor intraction
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
// const headings = document.querySelectorAll("h1");
const heading = document.querySelector("h1");

// Cursor Movemennt
window.addEventListener("mousemove", function (e) {
  const posX = e.clientX;
  const posY = e.clientY;

  // Update cursor-dot position
  // cursorDot.style.left = `${posX}px`;
  // cursorDot.style.top = `${posY}px`;

  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    { duration: 500, fill: "forwards" }
  );
});

if (heading) {
  heading.addEventListener("mouseenter", () => {
    const rect = heading.getBoundingClientRect();

    // Calculate a smaller diameter for the circular cursor
    const diameter = Math.sqrt(rect.width ** 1.5 + rect.height ** 1.5) * 0.9; // Scale down to 70%

    // Resize cursor-outline to be a smaller circle covering the h1
    cursorOutline.style.width = `${diameter}px`;
    cursorOutline.style.height = `${diameter}px`;
    // cursorOutline.style.transform = `translate(-50%, -50%) scale(1.2)`; // Slight zoom effect
  });

  heading.addEventListener("mouseleave", () => {
    // Reset cursor-outline size
    cursorOutline.style.width = "40px";
    cursorOutline.style.height = "40px";
    // cursorOutline.style.transform = `translate(-50%, -50%)`;
  });
}






// SCROLL TO TAP BUTTON
function scrollToSection(event, sectionId, linkElement) {
  // Prevent the default anchor link behavior
  event.preventDefault();

  // for target section
  const section = document.getElementById(sectionId);

  // scroll down smoothly
  section.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  // if (section) {
  //     section.scrollIntoView({ behavior: "smooth" });
  // }

  //remove active class
  const navLinks = document.querySelectorAll(".nav-btn");
  navLinks.forEach((link) => link.classList.remove("active"));

  //add active class
  linkElement.classList.add("active");
}






// HAMBURGER MENU
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navBar = document.querySelector(".navbar");
  const links = document.querySelectorAll(".navbar a");

  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (
      !hamburger.contains(event.target) && // Click is outside hamburger
      !navBar.contains(event.target) // Click is outside nav-links
    ) {
      hamburger.classList.remove("active");
      navBar.classList.remove("active");
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navBar.classList.remove("active");
    });
  });
});






// TYPEWRITER EFFECT
var typed = new Typed(".multiple-text", {
  strings: ["Web Developer", "Data Analyst", "MERN Stack Developer", "Gamer"],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 800,
  loop: true,
});

function showContent(tabId) {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  contents.forEach((content) => {
    content.classList.remove("active");
  });

  document
    .querySelector(`.tab[onclick="showContent('${tabId}')"]`)
    .classList.add("active");
  document.getElementById(tabId).classList.add("active");
}






// CARD SLIDER
let scrollContainer = document.querySelector(".all-projects");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
  scrollContainer.style.scrollBehavior = "auto";
});
nextBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft += 369;
});
backBtn.addEventListener("click", () => {
  scrollContainer.style.scrollBehavior = "smooth";
  scrollContainer.scrollLeft -= 369;
});





// CONTACT FORM VALIDATION
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const errorMessages = document.querySelectorAll(".err-txt");
  const submitForm = document.getElementsByClassName(".main-inp");

  form.addEventListener("submit", (e) => {
    let isValid = true;

    // Clear all previous error messages
    errorMessages.forEach((error) => (error.style.display = "none"));

    // Validate Full Name
    if (nameInput.value.trim() === "") {
      showError(nameInput, "Full Name can't be blank");
      isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
      showError(emailInput, "Email can't be blank");
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    }

    // Validate Phone
    if (phoneInput.value.trim() === "") {
      showError(phoneInput, "Phone number can't be blank");
      isValid = false;
    } else if (!validatePhone(phoneInput.value)) {
      showError(phoneInput, "Please enter a valid phone number (digits only)");
      isValid = false;
    }

    // Validate Subject
    if (subjectInput.value.trim() === "") {
      showError(subjectInput, "Subject can't be blank");
      isValid = false;
    }

    // Validate Message
    if (messageInput.value.trim() === "") {
      showError(messageInput, "Message can't be blank");
      isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      e.preventDefault();
      submitForm.style.display = "block";
    }
  });

  // Display error messages
  function showError(input, message) {
    const errorText = input.nextElementSibling;
    input.classList.add("error-border");
    errorText.textContent = message;
    errorText.style.display = "block";
  }
  // Clear Error messages
  function clearError(input) {
    const errorText = input.nextElementSibling;
    input.classList.remove("error-border");
    errorText.style.display = "none";
  }
  // Event listeners to clear errors when user types
  document.querySelectorAll("input, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      clearError(input);
    });
  });

  // Email validation regex
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Phone validation regex (Digits only)
  function validatePhone(phone) {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone);
  }
});