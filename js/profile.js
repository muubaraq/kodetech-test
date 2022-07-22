let Account = document.querySelector(".accountpage");
let Saved = document.querySelector(".savedpage");
let Order = document.querySelector(".orderpage");
let savedItems = document.querySelector(".savedItems");
let myAccount = document.querySelector(".myAccount");
let myOrder = document.querySelector(".myOrder");
let userIcon = document.querySelector(".userIcon");
let savedIcon = document.querySelector(".savedIcon");
let saved_nav = document.querySelector(".saved_nav");
let account_nav = document.querySelector(".account_nav");
let order_nav = document.querySelector(".order_nav");

function account() {
  Account.classList.remove("hide");
  Account.classList.add("show");
  Saved.classList.remove("show");
  Order.classList.remove("show");
  myAccount.classList.add("active");
  savedItems.classList.remove("active");
  myOrder.classList.remove("active");
  userIcon.classList.add("active");
  savedIcon.classList.remove("active");
  account_nav.classList.remove("hide");
  account_nav.classList.add("show");
  saved_nav.classList.remove("show");
  order_nav.classList.remove("show");
}

function saved() {
  Account.classList.add("hide");
  Saved.classList.add("show");
  Order.classList.add("hide");
  Order.classList.remove("show");
  savedItems.classList.add("active");
  myAccount.classList.remove("active");
  myOrder.classList.remove("active");
  userIcon.classList.remove("active");
  savedIcon.classList.add("active");
  account_nav.classList.add("hide");
  saved_nav.classList.add("show");
  saved_nav.classList.remove("hide");
  order_nav.classList.add("hide");
}

function orders() {
  Account.classList.add("hide");
  Saved.classList.remove("show");
  Order.classList.add("show");
  Order.classList.remove("hide");
  savedItems.classList.remove("active");
  myAccount.classList.remove("active");
  myOrder.classList.add("active");
  userIcon.classList.remove("active");
  savedIcon.classList.add("active");
  account_nav.classList.add("hide");
  saved_nav.classList.add("hide");
  order_nav.classList.remove("hide");
  order_nav.classList.add("show");
}

let newObject = window.localStorage.getItem("UserDetails");
const userDetails = JSON.parse(newObject);
console.log(userDetails.usernameDB);

// CHANGE PROFILE DETAILS DYNAMICALLY
const userName = document.querySelector(`.profile-name`);
userName.textContent = `${userDetails.usernameDB}`;

const userEmail = document.querySelector(`.profile-email`);
userEmail.textContent = `${userDetails.emailDB}`;

// LOGOUT USER
const logoutBtn = document.querySelector(`.logout`);
console.log(logoutBtn);
const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

const getUserToken = localStorage.getItem(`Token`);

logoutBtn.addEventListener(`click`, async () => {
  const response = await fetch(`${baseUrl}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getUserToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.status == 201) {
    localStorage.clear();
    location.assign(`../index.html`);
  }
});
