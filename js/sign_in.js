let createform = document.querySelector(".createAccount");
let loginform = document.querySelector(".login");
let openeye = document.querySelector(".open");
let closeeye = document.querySelector(".close");
let passwordInput = document.getElementById("create_password");
let passwordInput1 = document.getElementById("sign_in_password");
let signin = document.querySelector(".signin");
let register = document.querySelector(".register");

function create() {
  loginform.classList.remove("show");
  createform.classList.remove("hide");
  register.classList.add("active");
  signin.classList.remove("active");
  register.classList.remove("inactive");
  signin.classList.add("inactive");
}

function login() {
  loginform.classList.add("show");
  createform.classList.add("hide");
  register.classList.remove("active");
  signin.classList.add("active");
  register.classList.add("inactive");
  signin.classList.remove("inactive");
}

function password() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    openeye.style.display = "block";
    closeeye.style.display = "none";
  } else {
    passwordInput.type = "password";
    openeye.style.display = "none";
    closeeye.style.display = "block";
  }

  if (passwordInput1.type === "password") {
    passwordInput1.type = "text";
    openeye.style.display = "block";
    closeeye.style.display = "none";
  } else {
    passwordInput1.type = "password";
    openeye.style.display = "none";
    closeeye.style.display = "block";
  }
}

// GETTING THE INPUT VALUES

const userName = document.querySelector(`#name`);
const userPhoneNumber = document.querySelector(`#tel`);
const userEmail = document.querySelector(`#email`);
const userPassword = document.querySelector(`#password`);
const userLoginEmail = document.querySelector(`#login-email`);
const userLoginPassword = document.querySelector(`.login-password`);

const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
const wrongRegDetails = document.querySelector(`.paragraph`);
console.log(wrongRegDetails);
// REGISTERING A NEW USER
const registerUser = async (e) => {
  try {
    e.preventDefault();
    const response = await fetch(baseUrl + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailFromUser: userEmail.value,
        passwordFromUser: userPassword.value,
        phoneNumberFromUser: userPhoneNumber.value,
        usernameFromUser: userName.value,
        userRole: `user`,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (response.status == 201) {
      const setUserToken = localStorage.setItem(`Token`, data.details.tokenDB);
      const userObject = localStorage.setItem(
        `UserDetails`,
        JSON.stringify(data.userDetails)
      );
      console.log(setUserToken);
      console.log(response.status);
      location.assign(`../pages/email-C.html`);
    } else {
      wrongRegDetails.textContent = `${data.message}`;
    }
  } catch (error) {
    console.log(error);
  }
};
createform.addEventListener(`submit`, registerUser);

// VARIABLES NEEDED ON THE LOGIN PAGE
const wrongDetails = document.querySelector(`.wrong-details`);

// LOG IN AN ALREADY EXISTING USER
const loginUser = async (e) => {
  e.preventDefault();
  const response = await fetch(baseUrl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailFromUser: userLoginEmail.value,
      passwordFromUser: userLoginPassword.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  console.log(response.status);
  if (response.status == 201) {
    const setUserToken = localStorage.setItem(
      `Token`,
      data.userDetails.tokenDB
    );
    const userObject = localStorage.setItem(
      `UserDetails`,
      JSON.stringify(data.userDetails)
    );
    const userId = localStorage.setItem(
      `UserId`,
      data.userDetails._id
    )
    console.log(userId)
    console.log(localStorage);
    location.assign(`../index.html`);
  } else {
    wrongDetails.textContent = `${data.message}`;
  }
};
loginform.addEventListener(`submit`, loginUser);
