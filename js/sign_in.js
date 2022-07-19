let createform = document.querySelector(".createAccount");
let loginform = document.querySelector(".login");
let openeye = document.querySelector(".open");
let closeeye = document.querySelector(".close");
let passwordInput = document.getElementById("create-password");
let passwordInput1 = document.getElementById("log_in_password");
let passwordInput2 = document.getElementById("confirm_password");
let signin = document.querySelector(".signin");
let register = document.querySelector(".register");
let showLoading = document.querySelector(".loading");
const wrongRegDetails = document.querySelector(`.paragraph`);

// SWITCHING BETWEEN FORMS
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
  console.log(passwordInput1);
}

// SHOW AND HIDE PASSWORDS
const showPassword = document.querySelectorAll(`.show-password`);
showPassword.forEach((showPassword) => {
  showPassword.addEventListener(`click`, () => {
    if (passwordInput.type === `password`) {
      passwordInput.type = `text`;
    } else {
      passwordInput.type = `password`;
    }
    if (passwordInput2.type === `password`) {
      passwordInput2.type = `text`;
    } else {
      passwordInput2.type = `password`;
    }
    if (passwordInput1.type === `password`) {
      passwordInput1.type = `text`;
    } else {
      passwordInput1.type = `password`;
    }
  });
});

// PASSWORD VALIDATION
const createBtn = document.querySelector(`.create-acc-btn`);
passwordInput.addEventListener(`input`, () => {
  if (passwordInput.value.length < 8) {
    wrongRegDetails.innerHTML = `Passwords should contain at least eight characters`;
    wrongRegDetails.style.color = "red";
    createBtn.setAttribute(`disabled`, ``);
    createBtn.style.background = `grey`;
  } else {
    wrongRegDetails.textContent = ``;
    createBtn.removeAttribute(`disabled`, ``);
    createBtn.style.background = `#3f51b5`;
  }
});
passwordInput2.addEventListener(`input`, () => {
  if (passwordInput.value != passwordInput2.value) {
    wrongRegDetails.textContent = `Passwords do not match!`;
    wrongRegDetails.style.color = "red";
    createBtn.setAttribute(`disabled`, ``);
    createBtn.style.background = `grey`;
  } else {
    wrongRegDetails.textContent = ``;
    wrongRegDetails.style.color = "black";
    createBtn.removeAttribute(`disabled`, ``);
    createBtn.style.background = `#3f51b5`;
  }
});

// GETTING THE INPUT VALUES
const userName = document.querySelector(`#admin-name`);
const userPhoneNumber = document.querySelector(`#tel`);
const userEmail = document.querySelector(`#admin-email`);
const userPassword = document.querySelector(`#create-password`);
const userLoginEmail = document.querySelector(`#login-email`);
const userLoginPassword = document.querySelector(`#log_in_password`);

const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";
// REGISTERING A NEW USER
const registerUser = async (e) => {
  try {
    e.preventDefault();

    showLoading.classList.add("show-loading");

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
      wrongRegDetails.style.color = "red";
      showLoading.classList.remove("show-loading");
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
  showLoading.classList.add("show-loading");
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
    const userId = localStorage.setItem(`UserId`, data.userDetails._id);
    console.log(userId);
    console.log(localStorage);
    location.assign(`../index.html`);
  } else {
    wrongDetails.textContent = `${data.message}`;
    wrongRegDetails.style.color = "red";
    showLoading.classList.remove("show-loading");
  }
};
loginform.addEventListener(`submit`, loginUser);
