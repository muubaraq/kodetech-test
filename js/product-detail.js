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

// CHANGING CONTENT DYNAMICALLY
const productObject = JSON.parse(localStorage.getItem(`productObject`));
console.log(productObject);

const productName = document.querySelectorAll(`.product-name`);
productName.forEach((product) => {
  product.innerHTML = `${productObject.nameDB}`;
});

const productPrice = document.querySelectorAll(`.productPrice`);
productPrice.forEach((product) => {
  product.innerHTML = `₦${productObject.priceDB.toLocaleString(`en-US`)}`;
});

const productDesc = document.querySelectorAll(`.productDesc`);
productDesc.forEach((desc) => {
  desc.innerHTML = `${productObject.descriptionDB.slice(0, 305)}`;
});

const bigProductDesc = (document.querySelector(
  `.productDescBig`
).innerHTML = `${productObject.descriptionDB}`);

const productImage = document.querySelectorAll(`.main-image`);
productImage.forEach((image) => {
  image.src = `${productObject.imageDB}`;
});

const productBrand = document.querySelectorAll(`.productBrand`);
productBrand.forEach((brand) => {
  brand.innerHTML = `${productObject.brandDB}`;
});

// .innerHTML = `${productObject.descriptionDB.slice(0, 305)}`
