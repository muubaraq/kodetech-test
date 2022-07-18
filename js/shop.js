// PRICE RANGE
const priceRange = document.querySelector(`.range-value`);
const range = document.querySelector(`.range`);

range.addEventListener(`input`, function () {
  const number = range.value;
  const price = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  priceRange.innerHTML = `&#8358; ${price}`;
});

// FILTER SCREEN ON MOBILE
const filterBtn = document.querySelector(`.filter-btn`);
const applyFilters = document.querySelector(`.apply-fliters`);
const filters = document.querySelector(`.filters`);
const phones = document.querySelector(`.main-phones`);
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

// base url
const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

// HTML containers
const shopProductsMobile = document.querySelector(`.mobile-row`);
const shopProductsDesktop = document.querySelector(`.desktop-row`);

// UPDATING PRODUCTS DYNAMICALLY
const shopProducts = async () => {
  const response = await fetch(baseUrl + "items", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    for (i = 0; i < 8; i++) {
      shopProductsMobile.innerHTML += `<div class="col-6 col-md-6 col-lg-3 my-2">
      <div class="card border-0">
              <div class="img-div">
                <a href="#"><img src="${data.allItems[i].imageDB}"
                    class="card-img-top phone" alt="wireless gmaepad" id="${
                      data.allItems[i]._id
                    }"></a>
              </div>
              <div class="card-body">
                <p class="card-text FW-600 mobile-text body-text ">${
                  data.allItems[i].nameDB
                }</p>
                <p class="card-text cat-color FW-600 body-text">₦${data.allItems[
                  i
                ].priceDB.toLocaleString(`en-US`)}</p>
                <div class="reviews d-flex justify-content-between">
                  <div class="sub-review d-flex align-items-center justify-content-between">
                    <div class="rate-me d-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path class="rating mt-3"
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <p class="FW-600 px-1 footer-text-1 footer-text">3.0</p>
                    </div>


                    <p class="text-muted FW-600 footer-text-1"> (15 Reviews)</p>
                  </div>

                  <div class="like-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                      class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path class="icon" fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                  </div>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto mt-3">
                  <button class="btn btn-add-to-cart FW-600" type="button">Add to cart</button>
                </div>
              </div>
            </div>
          </div>`;
      shopProductsDesktop.innerHTML += `<div class="col-6">
            <div class="phone-card body-text FW-600">
              <a href="#">
                <img src="${
                  data.allItems[i].imageDB
                }" alt="" class="phone" id="${data.allItems[i]._id}">
              </a>
              <p>${data.allItems[i].nameDB}</p>
              <p>₦${data.allItems[i].priceDB.toLocaleString(`en-US`)}</p>
              <div class="ratings-like d-flex justify-content-between align-items-center">
                <div class="ratings d-flex">
                  <img src="../images/shop-images/star.png" alt="">
                  <p>4.3 <span class="footer-text FW-400">(30 Reviews)</span> </p>
                </div>
                <i class="bi bi-heart-fill fs-4"></i>
              </div>
              <button id="${data.allItems[i]._id}">Add to cart</button>
              <button class="delete-cart-item" >Remove Item</button>
            </div>
          </div>`;

      const photo = document.querySelectorAll(`.phone`);
      photo.forEach((image) => {
        image.addEventListener(`click`, async (e) => {
          const uniqueID = e.currentTarget.id;
          console.log(uniqueID);
          const response = await fetch(baseUrl + `item/${uniqueID}`);
          const data = await response.json();
          console.log(data);
          localStorage.setItem(`productObject`, JSON.stringify(data.item));
          location.assign(`../pages/product-detail.html`);
        });
      });

      //Getting user token and userid from local storage
      const userToken = localStorage.getItem("Token");

      const userId = localStorage.getItem("UserId");

      const addToCartBtn = document.querySelectorAll(`button`);
      addToCartBtn.forEach((btn) => {
        btn.addEventListener(`click`, (e) => {
          const itemId = e.currentTarget.id;
          console.log(itemId);
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
          };
          addToCart();
        });
      });

      // LIKE BUTTONS
      const hearts = document.querySelectorAll(`.bi-heart-fill`);

      hearts.forEach(function (heart) {
        heart.addEventListener(`click`, function (e) {
          const liked = e.currentTarget;
          liked.classList.toggle(`text-danger`);
        });
      });
    }
  }
};
window.addEventListener(`DOMContentLoaded`, shopProducts);

// FILTERING PRODUCTS ACCORDING TO CATEGORIES
const laptopCat = document.querySelector(`.laptops`);
const filterCat = document.querySelectorAll(`.filter-cat`);

function removeSelectedCat() {
  filterCat.forEach((link) => {
    {
      link.classList.remove(`selected`);
    }
  });
}

// LAPTOP FILTER
const filterLaptops = async () => {
  const response = await fetch(baseUrl + "items/category/Laptop");
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    removeSelectedCat();
    laptopCat.classList.add(`selected`);
    shopProductsDesktop.innerHTML = "";
    for (i = 0; i < 8; i++) {
      console.log(data.category[i].nameDB);
      shopProductsDesktop.innerHTML += `<div class="col-6">
            <div class="phone-card body-text FW-600">
              <img src="${data.category[i].imageDB}" alt="" class="phone">
              <p>${data.category[i].nameDB}</p>
              <p>₦${data.category[i].priceDB.toLocaleString(`en-US`)}</p>
              <div class="ratings-like d-flex justify-content-between align-items-center">
                <div class="ratings d-flex">
                  <img src="../images/shop-images/star.png" alt="">
                  <p>4.3 <span class="footer-text FW-400">(30 Reviews)</span> </p>
                </div>
                <i class="bi bi-heart-fill fs-4"></i>
              </div>
              <button>Add to cart</button>
            </div>
          </div>`;
    }
  }
};
laptopCat.addEventListener(`click`, filterLaptops);

const accessoryCat = document.querySelector(
  `.categories-selector .accessories`
);

// ACCESSORIES FILTER
const filterAccessories = async () => {
  const response = await fetch(baseUrl + "items/category/Accessories");
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    removeSelectedCat();
    accessoryCat.classList.add(`selected`);
    shopProductsDesktop.innerHTML = "";
    for (i = 0; i < 8; i++) {
      shopProductsDesktop.innerHTML += `<div class="col-6">
            <div class="phone-card body-text FW-600">
              <img src="${data.category[i].imageDB}" alt="" class="phone">
              <p>${data.category[i].nameDB}</p>
              <p>₦${data.category[i].priceDB.toLocaleString(`en-US`)}</p>
              <div class="ratings-like d-flex justify-content-between align-items-center">
                <div class="ratings d-flex">
                  <img src="../images/shop-images/star.png" alt="">
                  <p>4.3 <span class="footer-text FW-400">(30 Reviews)</span> </p>
                </div>
                <i class="bi bi-heart-fill fs-4"></i>
              </div>
              <button>Add to cart</button>
            </div>
          </div>`;
    }
  }
};
accessoryCat.addEventListener(`click`, filterAccessories);

const phonesCat = document.querySelector(`.categories-selector .phones`);
// PHONES FILTER
const filterPhones = async () => {
  const response = await fetch(baseUrl + "items/category/Phones");
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    removeSelectedCat();
    phonesCat.classList.add(`selected`);
    shopProductsDesktop.innerHTML = "";
    for (i = 0; i < 8; i++) {
      shopProductsDesktop.innerHTML += `<div class="col-6">
            <div class="phone-card body-text FW-600">
              <img src="${data.category[i].imageDB}" alt="" class="phone">
              <p>${data.category[i].nameDB}</p>
              <p>₦${data.category[i].priceDB.toLocaleString(`en-US`)}</p>
              <div class="ratings-like d-flex justify-content-between align-items-center">
                <div class="ratings d-flex">
                  <img src="../images/shop-images/star.png" alt="">
                  <p>4.3 <span class="footer-text FW-400">(30 Reviews)</span> </p>
                </div>
                <i class="bi bi-heart-fill fs-4"></i>
              </div>
              <button>Add to cart</button>
            </div>
          </div>`;
    }
  }
};
// filterPhones();
phonesCat.addEventListener(`click`, filterPhones);

// TABLETS FILTER
// insert code here

// PHONE FILTER

// Mobile filter
const filterPhonesMobile = async () => {
  const response = await fetch(baseUrl + "items/category/Phones");
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    removeSelectedCat();
    phonesCat.classList.add(`selected`);
    shopProductsDesktop.innerHTML = "";
    for (i = 0; i < 8; i++) {
      shopProductsMobile.innerHTML += `<div class="col-6 col-md-6 col-lg-3 my-2">
      <div class="card border-0">
              <div class="img-div">
                <a href="#"><img src="${data.category[i].imageDB}"
                    class="card-img-top phone" alt="wireless gmaepad" id="${
                      data.category[i]._id
                    }"></a>
              </div>
              <div class="card-body">
                <p class="card-text FW-600 mobile-text body-text ">${
                  data.category[i].nameDB
                }</p>
                <p class="card-text cat-color FW-600 body-text">₦${data.category[
                  i
                ].priceDB.toLocaleString(`en-US`)}</p>
                <div class="reviews d-flex justify-content-between">
                  <div class="sub-review d-flex align-items-center justify-content-between">
                    <div class="rate-me d-flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-star-fill" viewBox="0 0 16 16">
                        <path class="rating mt-3"
                          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                      <p class="FW-600 px-1 footer-text-1 footer-text">3.0</p>
                    </div>


                    <p class="text-muted FW-600 footer-text-1"> (15 Reviews)</p>
                  </div>

                  <div class="like-icon-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                      class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path class="icon" fill-rule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                    </svg>
                  </div>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto mt-3">
                  <button class="btn btn-add-to-cart FW-600" type="button">Add to cart</button>
                </div>
              </div>
            </div>
          </div>`;
    }
  }
};

var select = document.getElementById("mob-categories");
console.log(select);

select.addEventListener(`change`, (e) => {
  console.log(e.currentTarget.value);
  const selectedOption = e.currentTarget.value;
  if (selectedOption == `Phones`) {
    console.log(`yes`);
    filterPhonesMobile();
  }
});
