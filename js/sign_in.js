let createform = document.querySelector(".createAccount");
let loginform = document.querySelector(".login");
let openeye = document.querySelector(".open");
let closeeye = document.querySelector(".close");
let passwordInput = document.getElementById("password");
let passwordInput1 = document.getElementById("password1");
let signin = document.querySelector(".signin");
let register = document.querySelector(".register");


function create(){
    loginform.classList.remove("show");
    createform.classList.remove("hide");
    register.classList.add("active");
    signin.classList.remove("active");
    register.classList.remove("inactive");
    signin.classList.add("inactive");
};

function login(){
    loginform.classList.add("show");
    createform.classList.add("hide");
    register.classList.remove("active");
    signin.classList.add("active");
    register.classList.add("inactive");
    signin.classList.remove("inactive");

};

function password(){
    if (passwordInput.type === "password"){
        passwordInput.type = "text"
        openeye.style.display = "block"
        closeeye.style.display = "none"
    }
    else{
        passwordInput.type = "password"
        openeye.style.display = "none"
        closeeye.style.display = "block"

    }

    if (passwordInput1.type === "password"){
        passwordInput1.type = "text"
        openeye.style.display = "block"
        closeeye.style.display = "none"
    }
    else{
        passwordInput1.type = "password"
        openeye.style.display = "none"
        closeeye.style.display = "block"

    }
};