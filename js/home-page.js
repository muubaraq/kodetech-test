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

// SHOW OTHER PAGES
const otherPage = document.querySelector(`.other-page`);
const otherPages = document.querySelector(`.other-pages`);

otherPage.addEventListener(`mouseenter`, () => {
  otherPages.classList.add(`show-other-pages`);
});
otherPages.addEventListener(`mouseleave`, () => {
  otherPages.classList.remove(`show-other-pages`);
});
