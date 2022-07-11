// OPEN SIDEBAR
const hambugger = document.querySelector(`.hambugger`);
const sideBar = document.querySelector(`.mobile-nav-items`);

hambugger.addEventListener(`click`, function () {
  sideBar.classList.add(`show-nav`);
});

// CLOSE SIDEBAR
const closeNav = document.querySelector(`.close-nav`);
closeNav.addEventListener(`click`, () => {
  sideBar.classList.remove(`show-nav`);
});
