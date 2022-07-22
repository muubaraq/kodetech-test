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

// CHANGING CONTENT DYNAMICALLY
const productObject = JSON.parse(localStorage.getItem(`productObject`));
console.log(productObject);

const productName = document.querySelectorAll(`.product-name`);
productName.forEach((product) => {
  product.innerHTML = `${productObject.nameDB.toUpperCase()}`;
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

// CHANGING THE PRODUCT DETAIL MINI-IMAGES

const productDetailMiniImages = document.querySelectorAll(`.mini-images`);
console.log(productDetailMiniImages);

productDetailMiniImages.forEach((miniImages) => {
  miniImages.src = `${productObject.imageDB}`;
});

// CHANGING ITEMS YOU MAY LIKE DYNAMICALLY

const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
const similarProducts = async () => {
  try {
    const response = await fetch(
      baseUrl + `items/category/${productObject.categoryDB}`
    );
    const data = await response.json();
    console.log(data);
    for (i = 0; i < 4; i++) {
      similarProductCont.innerHTML += `
        <div class="grid-item">
        <div class="image"><img src="${data.category[i].imageDB}" alt="${data.category[i].nameDB}"
            class="img-fluid">
        </div>
        <div class="details FW-600 px-2">
          <p class="label-text mt-2">${data.category[i].nameDB}</p>
          <div class="stats d-flex justify-content-between">
            <p class="">₦${data.category[i].priceDB}</p>
            <i class="bi bi-heart-fill fs-3"></i>
          </div>
          <div class="ratings d-inline">
            <img src="../images/product-detail-images/ratings-star.png" alt="A rating star" class="d-inline">
            <p class="footer-text d-inline ms-2">4.5 (10 Reviews)</p>
          </div>
          <button>Add to cart</button>
        </div>
      </div>
  `;

      // LIKE BUTTONS
      const hearts = document.querySelectorAll(`.bi-heart-fill`);

      hearts.forEach(function (heart) {
        heart.addEventListener(`click`, function (e) {
          const liked = e.currentTarget;
          liked.classList.toggle(`text-danger`);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
similarProducts();

const similarProductCont = document.querySelector(`.grid-container`);
console.log(similarProductCont);

// ADD TO CART

//Getting user token and userid from local storage
const userToken = localStorage.getItem("Token");
const userId = localStorage.getItem("UserId");
// ADDING ITEMS TO CART
const alertMessage = document.querySelector(`.alert-success`);
console.log(alertMessage);
function displayAlert() {
  setTimeout(() => {
    alertMessage.classList.remove(`show-success-alert`);
  }, 1000);
}
const addToCartBtn = document.querySelector(`button`);
addToCartBtn.addEventListener(`click`, (e) => {
  console.log(`yes`);
  displayAlert();
  const itemId = e.currentTarget.id;
  console.log(itemId);
  return;
  const addToCart = async () => {
    const response = await fetch(baseUrl + `${userId}/additem`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        productId: itemId,
        quantity: "1",
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status == 200) {
      alertMessage.classList.add(`show-success-alert`);
    }
    localStorage.setItem(`cart-items`, JSON.stringify(data.deatils));
  };

  addToCart();
});
