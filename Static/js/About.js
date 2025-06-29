let isOpenMenuBar = false;
const handleToggleMenu = (menuBarId, menuIconId) => {
  const menuBar = document.getElementById(menuBarId);
  const menuIcon = document.getElementById(menuIconId);
  const icon = menuIcon.querySelector("i");

  icon.classList.toggle("bx-menu-wide");
  icon.classList.toggle("bx-x");

  if (!isOpenMenuBar) {
    gsap.to(menuBar, {
      x: "0%",
      duration: 1,
      ease: "power4",
    });

    isOpenMenuBar = true;
  } else {
    gsap.to(menuBar, {
      x: "-100%",
      duration: 1,
      ease: "power4",
    });
    menuIcon.appendChild(icon);
    isOpenMenuBar = false;
  }
};

// Review Slider

// FAQs

// Proper mobile detection
// Store state per FAQ container using an object
const faqStates = {};

const openFAQ = (containerFAQId) => {
  const containerFAQ = document.getElementById(containerFAQId);

  // Error handling
  if (!containerFAQ) {
    console.error(`FAQ container with ID "${containerFAQId}" not found`);
    return;
  }

  const faqButton = containerFAQ.querySelector("#faqButton");
  const buttonIcon = faqButton.querySelector("i");

  const FAQShow = containerFAQ.querySelector("#FAQShow");
  if (!FAQShow) {
    console.error("FAQShow element not found inside container");
    return;
  }

  // Initialize state if it doesn't exist
  if (faqStates[containerFAQId] === undefined) {
    faqStates[containerFAQId] = {
      isOpen: false,
      originalHeight: FAQShow.scrollHeight, // Get natural height
    };

    // Set initial closed state
    gsap.set(FAQShow, {
      minHeight: "0px",
      duration: 0.3,
    });
  }

  // Toggle state
  const currentState = faqStates[containerFAQId];
  currentState.isOpen = !currentState.isOpen;

  buttonIcon.classList.toggle("bx-plus");
  buttonIcon.classList.toggle("bx-minus");
  // Smooth animation with better easing
  gsap.to(FAQShow, {
    minHeight: currentState.isOpen ? `${currentState.originalHeight}px` : "0px",
    duration: 0.3,
    ease: currentState.isOpen ? "power2.out" : "power2.in",
  });
};
