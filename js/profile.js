let Account = document.querySelector(".accountpage");
let Saved = document.querySelector(".savedpage");
let mainPage = document.querySelectorAll(".mainpage");
/* buttons to switch pages*/
let savedItems = document.querySelector(".savedItems");
let myAccount = document.querySelector(".myAccount");
let links = document.querySelectorAll(".tabs");

function account() {
  Account.classList.remove("hide");
  Saved.classList.remove("show");
  myAccount.classList.add("active");
  savedItems.classList.remove("active");
  userIcon.classList.add("active");
  savedIcon.classList.remove("active");
}

function saved() {
  Account.classList.add("hide");
  Saved.classList.add("show");
  savedItems.classList.add("active");
  myAccount.classList.remove("active");
  userIcon.classList.remove("active");
  savedIcon.classList.add("active");
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
    localStorage.removeItem(`Token`);
    localStorage.removeItem(`UserDetails`);
    location.assign(`../index.html`);
  }
});
