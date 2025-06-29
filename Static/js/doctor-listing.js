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
