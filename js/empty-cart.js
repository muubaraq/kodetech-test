const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
const userID = localStorage.getItem(`UserId`);
const userToken = localStorage.getItem(`Token`);

// FETCH REQUEST TO THE SERVER TO GET CART ITEMS SAVED FROM THE SHOP PAGE (**ADD TO CART)
const getCartData = async () => {
  const response = await fetch(baseUrl + `${userID}/cart`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
};
getCartData();

// GEETTING CART ITEMS FROM LOCAL STORAGE
let cartStuff = JSON.parse(localStorage.getItem(`cart-items`));
console.log(cartStuff.items);

// RENDERING PAGE CONTENT ACCORDING TO USER STATUS (WHEN USER IS NOT SIGNED IN; WHEN USER IS SIGNED IN BUT CART IS EMPTY; WHEN USER IS SIGNED IN AND CART IS NOT EMPTY)
const body = document.querySelector(`main`);
const cartPageContainer = document.querySelector(`.item-cart`);
let totalPrice = document.getElementById("total-price");
let subTotalPrice = document.getElementById("subtotal-price");

if (localStorage.getItem("Token") && localStorage.getItem(`cart-items`)) {
  console.log(`user signed in and cart full`);
  body.style.display = `none`;
  cartPageContainer.innerHTML = `
    <div class="body overflow-hidden">
    <div class="container-fluid">
      <div class="nav-section d-flex ps-lg-5 pt-4 pb-lg-4 body-text">
        <i class="bi bi-arrow-left pe-3" style="color: var(--secondaryShade1)"></i>
        <p class="mobile" style="color: #8f8f8f">Home</p>
        <p class="mobile">/</p>
        <p class="" style="color: var(--secondaryShade1)">Cart</p>
      </div>
    </div>
    <div class="container">
      <div class="item-titles body-text">
        <div class="row title">
          <div class="col-5 ms-4">
            <p>Products</p>
          </div>
          <div class="col d-flex justify-content-center">
            <p>Unit Price</p>
          </div>
          <div class="col d-flex justify-content-center">
            <p>QTY</p>
          </div>
          <div class="col d-flex justify-content-center">
            <p>Price</p>
          </div>
        </div>
      </div>
      <div class="itms">
      <h1>Stuff</h1>
      </div>
    </div>
    <div id="checkout">
      <div class="container">
        <div class="row">
          <div class="col-md-5 col-lg-7"></div>
          <div class="col-md-6 col-lg-4 ms-lg-5 mb-5 shadow checkout rounded-3">
            <div class="pb-4 mt-5 ps-2">
              <div class="label-text d-flex justify-content-between FW-600">
                <p>Subtotal</p>
                <p id="subtotal-price">₦${cartStuff.bill.toLocaleString(
                  `en-US`
                )}</p>
              </div>
              <div class="label-text d-flex justify-content-between FW-600">
                <p>Discount</p>
                <p class="body-text-mini ps-5">coupon code</p>
              </div>
              <div class="label-text d-flex justify-content-between" style="color: var(--secondaryShade1)">
                <h6 class="FW-700">TOTAL</h6>
                <h6 class="FW-700" id="total-price">₦${cartStuff.bill.toLocaleString(
                  `en-US`
                )}</h6>
              </div>
            </div>
            <div class="body-text-mini ps-4">
              <p>Shipping fee to be calculated at checkout</p>
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <a href="./checkout.html">
                <div class="btn cart-button text-white mb-5 ms-4 d-flex justify-content-center align-items-center">
                  Checkout
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  let cartItemContainer = document.querySelector(`.itms`);
  for (i = 0; i < cartStuff.items.length; i++) {
    cartItemContainer.innerHTML += `<div data-id="${i}" class="row product">
            <div class="col-md-5 d-flex align-items-center px-2 pb-4">
              <div>
                <input type="checkbox">
              </div>
              <div class="image px-md-3">
                <img src="${cartStuff.items[i].image}">
              </div>
              <div class="label-text pt-md-4 d-block">
                <p class="FW-600 mb-1">${cartStuff.items[i].name}</p>
                <p class="mb-1">${cartStuff.items[i].brand}</p>
                <ul class="list-unstyled">
                  <li style="color: #8F8F8F;">Color: Black</li>
                </ul>
              </div>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center ms-3">
              <p class="item-cost">₦${cartStuff.items[i].total.toLocaleString(
                `en-US`
              )}</p>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center justify-content-evenly ms-lg-5">
              <i data-id="${i}" class="bi bi-dash-circle-fill mb-2 count-down" style="color: #8F8F8F;"
              ></i>
              <p data-id="${i}" class="quantity">1</p>
              <i data-id="${i}" class="bi bi-plus-circle-fill mb-2 count-up" style="color: #8F8F8F;"></i>
            </div>
            <div class="col-md-2 d-flex justify-content-center align-items-center ms-3">
              <p class="item-total ps-5">₦${cartStuff.items[
                i
              ].price.toLocaleString(`en-US`)}</p>
              <i data-id="1" class="bi bi-trash-fill ms-4 mb-2 px-3 py-3 delete-item"
                style="color: #B71C1C; background:#FFE8E8"></i>
            </div>
          </div>`;

    const countUpBtn = document.querySelectorAll(".count-up");
    const countDownBtn = document.querySelectorAll(".count-down");
    let countNum = document.querySelectorAll(".quantity");
    let deleteItem = document.querySelectorAll(".delete-item");
    let items = [...document.querySelectorAll(".product")];
    let father = document.querySelector(".items");

    let defaultNum = 0;
    countUpBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        defaultNum++;
        console.log(defaultNum);
        countNum.forEach((num) => {
          // let numId = num.dataset.id;
          // if (numId === id) {
          //   num.innerText++;
          // }
          countNum.innerHTML = defaultNum;
        });
      });
    });

    countDownBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        countNum.forEach((num) => {
          let numId = num.dataset.id;
          if (numId === id) {
            num.innerText -= 1;
            if (num < 0) {
              id = 0;
            }
          }
        });
      });
    });

    deleteItem.forEach((del) => {
      del.addEventListener("click", (e) => {
        e.target.parentElement.parentElement.remove();
      });
    });
  }
} else if (
  localStorage.getItem(`Token`) &&
  !localStorage.getItem(`cart-items`)
) {
  console.log(`user is signed in but cart is empty`);
  body.style.display = `flex`;
  body.innerHTML = `
            <div class="cart d-flex flex-column align-items-center justify-content-center text-center">
            <img src="../images/empty-cart-images/shopping-cart.png" alt="">
            <h5 class="FW-600">Oops, you haven't added any item to cart yet</h5>
            <p class="body-text FW-400 w-75">Browse from our home page to see list of items that might catch your
                attention</p>
            <a href="./shop.html"><button class="label-text FW-600">Continue Shopping</button></a>
        </div>
    `;
} else {
  body.style.display = `flex`;
  body.innerHTML = `
            <div class="cart d-flex flex-column align-items-center justify-content-center text-center">
            <img src="../images/empty-cart-images/shopping-cart.png" alt="">
            <h5 class="FW-600">Oops, you haven't added any item to cart yet</h5>
            <p class="body-text FW-400 w-75">Browse from our home page to see list of items that might catch your
                attention</p>
            <a href="./shop.html"><button class="label-text FW-600">Continue Shopping</button></a>
        </div>
    `;
  console.log(`Please sign in`);
}
