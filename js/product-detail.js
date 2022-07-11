// QUANTITY SELECTOR
const minus = document.querySelector(`.minus`);
const plus = document.querySelector(`.plus`);
const number = document.querySelector(`.number`);
let defaultQuantity = 0;

minus.addEventListener(`click`, function () {
  defaultQuantity--;
  number.textContent = defaultQuantity;
  if (defaultQuantity < 1) {
    defaultQuantity = 0;
    number.innerHTML = 0;
  }
});
plus.addEventListener(`click`, function () {
  defaultQuantity++;
  number.textContent = defaultQuantity;
});

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
