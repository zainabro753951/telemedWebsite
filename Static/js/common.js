let currentOpenSelect = null;
let isFilterSelectOpen = false;
// Toggle Menu Bar Header
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

const handleSelectOpen = (options) => {
  const select = document.querySelector(options);

  if (currentOpenSelect && currentOpenSelect !== select) {
    currentOpenSelect.classList.remove("block");
    currentOpenSelect.classList.add("hidden");
    isFilterSelectOpen = false;
  }

  select.classList.toggle("block");
  select.classList.toggle("hidden");
  isFilterSelectOpen = select.classList.contains("block");
  currentOpenSelect = isFilterSelectOpen ? select : null;
};

const handleSelect = (show, value) => {
  const filterShow = document.querySelector(show);
  filterShow.innerHTML = value;
  currentOpenSelect.classList.remove("block");
  currentOpenSelect.classList.add("hidden");
  isFilterSelectOpen = false;
};

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

const handleSelectSeviceBox = (serviceBoxId) => {
  const serviceBox = document.getElementById(serviceBoxId);

  // Try to find an existing checkbox inside this box
  let checkBox = serviceBox.querySelector("input[type='checkbox']");

  if (!checkBox) {
    // Not selected yet, so select and add checkbox
    const newCheckBox = document.createElement("input");
    newCheckBox.type = "checkbox";
    newCheckBox.checked = true;
    newCheckBox.classList.add("ml-2"); // optional styling
    serviceBox.classList.add("ring-3", "ring-blue-200", "border-theme-blue");
    serviceBox.appendChild(newCheckBox);
  } else {
    // Already selected, so deselect and remove checkbox
    serviceBox.classList.remove("ring-3", "ring-blue-200", "border-theme-blue");
    serviceBox.removeChild(checkBox);
  }
};



// Default speed is slow for autoplay
const Reviewswiper = new Swiper(".reviewSlider", {
  slidesPerView: 2,
  spaceBetween: 10,
  speed: 1500,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

// Select navigation buttons
const prevBtn = document.getElementById("review-next");
const nextBtn = document.getElementById("review-prev");

// Update navigation button visibility
function updateNavButtons() {
  if (Reviewswiper.isBeginning) {
    prevBtn.classList.add("hide");
  } else {
    prevBtn.classList.remove("hide");
  }

  if (Reviewswiper.isEnd) {
    nextBtn.classList.add("hide");
  } else {
    nextBtn.classList.remove("hide");
  }
}

// Initial check
Reviewswiper.on("init", updateNavButtons);
Reviewswiper.on("slideChange", updateNavButtons);
Reviewswiper.init();

// Custom button click events
prevBtn.addEventListener("click", () => {
  Reviewswiper.slidePrev();
});

nextBtn.addEventListener("click", () => {
  Reviewswiper.slideNext();
});

// Default speed is slow for autoplay
const availSlider = new Swiper(".availSlider", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  speed: 1500, // Slow speed for autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    300: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
  },
});

// Custom speed for buttons
document.getElementById("avail-next").addEventListener("click", () => {
  swiper.params.speed = 300; // Fast speed for manual nav
  swiper.slideNext();
  resetSpeed();
});

document.getElementById("avail-prev").addEventListener("click", () => {
  swiper.params.speed = 300;
  swiper.slidePrev();
  resetSpeed();
});

// Function to reset speed to slow after manual action
function resetSpeed() {
  setTimeout(() => {
    swiper.params.speed = 1500;
  }, 400); // Wait for the fast transition to complete
}
