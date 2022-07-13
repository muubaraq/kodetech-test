let createform = document.querySelector(".createAccount");
let loginform = document.querySelector(".login");
let openeye = document.querySelector(".open");
let closeeye = document.querySelector(".close");
let passwordInput = document.getElementById("password");
let passwordInput1 = document.getElementById("password1");
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
const userLoginPassword = document.querySelector(`#login-password`);

const baseUrl = "https://kodetech.herokuapp.com/";

// REGISTERING A NEW USER
const registerUser = async (e) => {
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
};

createform.addEventListener(`submit`, registerUser);

// LOG IN AN ALREADY EXISTING USER
const loginUser = async (e) => {
  e.preventDefault();
  const response = await fetch(baseUrl + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdiIsInVzZXJJRCI6IjYyY2YyMWYyY2U5YTJmOGI1MTE2ZGUxYyIsImlhdCI6MTY1Nzc0MTgxMH0.mrsfnKKR8prUvE4k3jPDPxIFWLni7qAtD5QJ158bAB8",
    },
    body: JSON.stringify({
      emailFromUser: userLoginEmail,
      passwordFromUser: userLoginPassword,
    }),
  });
  const data = await response.json();
  console.log(data);
};
loginform.addEventListener(`submit`, loginUser);
