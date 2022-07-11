// LIKE BUTTONS
const hearts = document.querySelectorAll(`.bi-heart-fill`);

hearts.forEach(function (heart) {
  heart.addEventListener(`click`, function (e) {
    const liked = e.currentTarget;
    if (liked.classList.contains(`text-danger`)) {
      liked.classList.remove(`text-danger`);
    } else {
      liked.classList.add(`text-danger`);
    }
  });
});

// PRICE RANGE
const priceRange = document.querySelector(`.range-value`);
const range = document.querySelector(`.range`);

range.addEventListener(`input`, function () {
  const number = range.value.toLocaleString();
  priceRange.textContent = number;
});

// FILTER SCREEN ON MOBILE
const filterBtn = document.querySelector(`.filter-btn`);
const applyFilters = document.querySelector(`.apply-fliters`);
const filters = document.querySelector(`.filters`);
const phones = document.querySelector(`.phones`);
const footer = document.querySelector(`.mobile-footer`);

filterBtn.addEventListener(`click`, () => {
  filters.classList.toggle(`show-filters`);
  phones.classList.toggle(`hide`);
  footer.classList.toggle(`hide`);
});

applyFilters.addEventListener(`click`, () => {
  filters.classList.remove(`show-filters`);
  phones.classList.remove(`hide`);
  footer.classList.remove(`hide`);
});
