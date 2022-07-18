const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
let totalPrice = document.getElementById("total-price");
let subTotalPrice = document.getElementById("subtotal-price");
const userID = localStorage.getItem(`UserId`);
console.log(userID);
const userToken = localStorage.getItem(`Token`);
console.log(userToken);

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
  const cartItemContainer = document.querySelector(`.itms`);

  if (response.status == 200) {
    for (i = 0; i < data.details.items.length; i++) {
      console.log(data.details.items[i]);
      cartItemContainer.innerHTML += `<div data-id="${i}" class="row product">
          <p class="ms-4" style="color: var(--secondaryShade1);">You have selected two item(s)</p>
          <div class="col-md-5 d-flex align-items-center px-2 pb-4">
            <div>
              <input type="checkbox">
            </div>
            <div class="image px-md-3">
              <img src="${data.details.items[i].image}">
            </div>
            <div class="label-text pt-md-4 d-block">
              <p class="FW-600 mb-1">${data.details.items[i].name}</p>
              <p class="mb-1">${data.details.items[i].brand}</p>
              <ul class="list-unstyled">
                <li style="color: #8F8F8F;">Color: Black</li>
              </ul>
            </div>
          </div>
          <div class="col-md-2 d-flex justify-content-center align-items-center ms-3">
            <p class="item-cost">₦${data.details.items[i].total.toLocaleString(
              `en-US`
            )}</p>
          </div>
          <div class="col-md-2 d-flex justify-content-center align-items-center justify-content-evenly ms-lg-5">
            <i data-id="${i}" class="bi bi-dash-circle-fill mb-2 count-down" style="color: #8F8F8F;"
            ></i>
            <p data-id="${i}" class="quantity">0</p>
            <i data-id="${i}" class="bi bi-plus-circle-fill mb-2 count-up" style="color: #8F8F8F;"></i>
          </div>
          <div class="col-md-2 d-flex justify-content-center align-items-center ms-3">
            <p class="item-total ps-5">₦${data.details.items[
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
  }
  totalPrice.innerHTML = `₦${data.details.bill.toLocaleString(`en-US`)}`;
  subTotalPrice.innerHTML = `₦${data.details.bill.toLocaleString(`en-US`)}`;
};
getCartData();

// ADDING CART ITEMS DYNAMICALLY
//SETTING STATIC PRICE TO LOCAL STORAGE
