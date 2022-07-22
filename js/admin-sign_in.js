let createform = document.querySelector(".createAccount");
let loginform = document.querySelector(".login");
let openeye = document.querySelector(".open");
let closeeye = document.querySelector(".close");
let passwordInput = document.getElementById("admin-password");
let passwordInput1 = document.getElementById("admin_sign_in_password");
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

const adminName = document.querySelector(`#admin-name`);
const adminKey = document.querySelector(`#admin-key`);
const adminEmail = document.querySelector(`#admin-email`);
const adminPassword = document.querySelector(`#admin-password`);
const adminLoginEmail = document.querySelector(`#login-email`);
adminLoginEmail.addEventListener(`input`, () => {
  console.log(adminLoginEmail.value);
});
console.log(adminLoginEmail.value);
const adminLoginPassword = document.querySelector(`.login-password`);

const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

// REGISTERING A NEW USER
const registerAdmin = async (e) => {
  try {
    e.preventDefault();
    const response = await fetch(baseUrl + "admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailFromAdmin: adminEmail.value,
        passwordFromAdmin: adminPassword.value,
        keyFromAdmin: adminKey.value,
        nameFromAdmin: adminName.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    const setAdminToken = localStorage.setItem(
      `adminToken`,
      data.details.tokenDB
    );
    const adminObject = localStorage.setItem(
      `adminDetails`,
      JSON.stringify(data.details)
    );
    console.log(response.status);
    if (response.status == 201) {
      location.assign(`../pages/admin.html`);
    } else if (response.status == 409) {
      wrongDetails.textContent = `${data.message}`;
    }
  } catch (error) {
    console.log(error);
  }
};
createform.addEventListener(`submit`, registerAdmin);

// VARIABLES NEEDED ON THE LOGIN PAGE
const wrongDetails = document.querySelector(`.wrong-details`);

// LOG IN AN ALREADY EXISTING USER
const loginAdmin = async (e) => {
  e.preventDefault();
  const response = await fetch(baseUrl + "admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailFromAdmin: adminLoginEmail.value,
      passwordFromAdmin: adminLoginPassword.value,
    }),
  });
  const data = await response.json();
  console.log(data);
  console.log(response.status);
  if (response.status == 201) {
    const setAdminToken = localStorage.setItem(
      `adminToken`,
      data.details.tokenDB
    );
    const adminObject = localStorage.setItem(
      `adminDetails`,
      JSON.stringify(data)
    );
    location.assign(`../pages/admin.html`);
  } else {
    wrongDetails.textContent = `${data.message}`;
  }
};
loginform.addEventListener(`submit`, loginAdmin);
