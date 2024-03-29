let checkPage = document.querySelector(".checkPage");
let confirm3 = document.querySelector(".confirm3");

let confirm2 = document.querySelector(".confirm2");
let sec1 = document.querySelector(".sec1");
let sec2 = document.querySelector(".sec2");
let sec3 = document.querySelector(".sec3");
let sBtn = document.getElementById("sBtn");
let motherS = document.querySelector(".mother-s");
let pBtn = document.querySelector(".p-btn");
let motherB = document.querySelector(".mother-b");
let motherP = document.querySelector(".mother-p");
let bBtn = document.querySelector(".b-btn");
let btn1 = document.querySelector("#start-payment-button");
btn1.addEventListener("click", (e) => {
  e.preventDefault();
});

sBtn.addEventListener("click", (e) => {
  motherS.style.display = "none";
  motherB.style.display = "block";
});
bBtn.addEventListener("click", () => {
  motherB.style.display = "none";
  motherP.style.display = "block";
  btn1.style.display = "block";
});
checkPage.addEventListener("click", (e) => {
  if (
    e.currentTarget.classList.contains(".mother-p") ||
    e.target.parentElement.classList.contains("p") ||
    e.target.parentElement.parentElement.classList.contains("p")
  ) {
    sec3.classList.add("active-sec");
    sec1.classList.remove("active-sec");
    sec2.classList.remove("active-sec");
  } else if (
    e.currentTarget.classList.contains(".mother-b") ||
    e.target.parentElement.classList.contains("b") ||
    e.target.parentElement.parentElement.classList.contains("b")
  ) {
    sec2.classList.add("active-sec");
    sec1.classList.remove("active-sec");
    sec3.classList.remove("active-sec");
  } else if (
    e.currentTarget.classList.contains(".mother-s") ||
    e.target.parentElement.classList.contains("s") ||
    e.target.parentElement.parentElement.classList.contains("s")
  ) {
    sec1.classList.add("active-sec");
    sec2.classList.remove("active-sec");
    sec3.classList.remove("active-sec");
  }
});

const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
const userID = localStorage.getItem(`UserId`);

const userToken = localStorage.getItem(`Token`);

const getCartData = async () => {
  const response = await fetch(baseUrl + `${userID}/cart`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${userToken}`,
    },
  });
  const data = await response.json();
  console.log(data.details.bill);
  const cartItemContainer = document.querySelector(`.itms`);
  localStorage.setItem(`checkoutPrice`, data.details.bill);

  if (response.status == 200) {
    console.log(data.details.items);
    let itemInCart = data.details.items;
    let itemCart = "";
    itemInCart.forEach((item) => {
      itemCart += `
            <div class="mt-3 row">
                      <div class="col-8">
                        <p>${item.name}</p>
                      </div>
                      <div class="col-4">
                        <p>${item.quantity} X ${item.total}</p>
                      </div>
                    </div>
            `;
    });
    document.querySelector(".boughtItem").innerHTML = itemCart;
    const sum = itemInCart.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0);
    let sumToFix = sum.toLocaleString("en-us");
    document.querySelector(".totalPrice").innerHTML = `₦${sumToFix}.`;
  }
};
getCartData();
const price = localStorage.getItem(`checkoutPrice`);
console.log(price);
let btn = document
  .getElementById("start-payment-button")
  .addEventListener("click", (e) => {
    e.preventDefault();

    let handler = PaystackPop.setup({
      key: "pk_test_b76ad5b6fb6c5e5eb2542439c62606b8bc99f359",
      email: document.getElementById("email-address").value,
      amount: price * 100,
      ref: "" + Math.floor(Math.random() * 1000000000 + 12345777),
      onClose: function () {
        alert("Window closed.");
      },
      callback: function (response) {
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });
    handler.openIframe();
  });
