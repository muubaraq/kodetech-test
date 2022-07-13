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

//  SEARCH BAR
const searchIcon = document.querySelector(`.bi-search`);
const closeSearchBar = document.querySelector(`.close-search`);
const navBarItems = document.querySelector(`.nav-items`);
const searchBar = document.querySelector(`.search-bar`);

searchIcon.addEventListener(`click`, () => {
  navBarItems.classList.add(`hide-nav-items`);
  searchBar.classList.add(`show-search-bar`);
});

closeSearchBar.addEventListener(`click`, () => {
  navBarItems.classList.remove(`hide-nav-items`);
  searchBar.classList.remove(`show-search-bar`);
});
