// Default speed is slow for autoplay
const swiper = new Swiper(".providerSlider", {
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  speed: 1500, // Slow speed for autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

// Custom speed for buttons
document.getElementById("provider-next").addEventListener("click", () => {
  swiper.params.speed = 300; // Fast speed for manual nav
  swiper.slideNext();
  resetSpeed();
});

document.getElementById("provider-prev").addEventListener("click", () => {
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
