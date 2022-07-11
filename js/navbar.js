// NAVBAR TOGGLE
const hambugger = document.querySelector(`.hambugger`);
const closeSidebar = document.querySelector(`.close`);
const sideBar = document.querySelector(`.sidebar`);

hambugger.addEventListener(`click`, function () {
  sideBar.classList.add(`show-sidebar`);
});
closeSidebar.addEventListener(`click`, function () {
  sideBar.classList.remove(`show-sidebar`);
});
