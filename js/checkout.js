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

function makePayment() {
    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
        tx_ref: "titanic-48981487343MDI0NzMx",
        amount: 54600,
        currency: "NGN",
        payment_options: "card, banktransfer, ussd",
        redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
        meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
            email: "rose@unsinkableship.com",
            phone_number: "08102909304",
            name: "Rose DeWitt Bukater",
        },
        customizations: {
            title: "The Titanic Store",
            description: "Payment for an awesome cruise",
            logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
        },
    });
}