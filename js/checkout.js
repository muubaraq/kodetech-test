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
let price = 6000;
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