// THE CLICKABLE BUTTONS ON THE ASIDE CONTAINER (dashboard, orders, products, users, report and settings)
let links = document.querySelectorAll(".tabs");
let pages = document.querySelectorAll(".pages");
let Dashboard = document.querySelector(".dashboard");
let Orders = document.querySelector(".ordersTab");
let Product = document.querySelector(".productsTab");
let User = document.querySelector(".usersTab");
let Report = document.querySelector(".reportsTab");
let Settings = document.querySelector(`.settings`);

// THE SECTIONS THAT ARE TO BE DISPLAYED
let dashboardPage = document.querySelector(".dashboardPage");
let orderPage = document.querySelector(".orderPage");
let productPage = document.querySelector(".productPage");
let userPage = document.querySelector(".userPage");
let reportPage = document.querySelector(".reportPage");
let settingsPage = document.querySelector(`.settingsPage`);
let mainContent = document.querySelectorAll(`.main-content`);
// USERS TO DOM
function formatDate() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    document.querySelector(".time").innerHTML = strTime;
}
formatDate();
let totalVisits = document.querySelector(".totalVisits");
let totalUsers = document.querySelector(".totalUsers");
let totalActiveUsers = document.querySelector(".totalActiveUsers");
fetch("https://kodecamp-ecommerce.herokuapp.com/users/all")
    .then((res) => res.json())
    .then((data) => {
        totalVisits.innerHTML = data.attemptedRegistration;
        totalUsers.innerHTML = data.verifiedUsers;
        totalActiveUsers.innerHTML = data.usersOnline;
    });

fetch("https://kodecamp-ecommerce.herokuapp.com/users/all")
    .then((res) => res.json())
    .then((data) => outputAdmin(data.totalUsersInfo))
    .catch((err) => console.log(err));

function outputAdmin(data) {
    let div = "";
    data.forEach((dat) => {
        div += `
             <div class="row admin py-4 mb-1 border-rounded" >
                <div class="col-3">
              <span class="image">${dat.name.slice(0, 1).toUpperCase()}</span>
                <span class="name">${dat.name}</span>
                </div>
                <div class="col-3">
                    <span class="gmail"> ${dat.email}</span>
                </div>
<div class="col-3 text-center">${dat.role}</div>
                <div class="col-2">
                    <span class="status">
              <div class="row">
                <div class="col-lg-1 col-md-2 mt-2">
                    <div class=${
                      dat.loggedIn ? "circle-bg-green" : " circle-bg-red"
                    } "></div> </div>
                  <div class="col-lg-9 col-md-10">
                      <span class="statusPara">${
                        dat.loggedIn ? "Active" : "Inactive"
                      }</span>
                 
                </div>
              </div>
                </div>
                <div class="col-1">
                           <i class="bi bi-three-dots-vertical text-blue"></i>
                </div>
            </div>
           `;

        document.getElementById("eachAdmin").innerHTML = div;
    });
}
// EnND OF USERS
// CALLBACK FUNCTION THAT WILL BE USED IN ALL THE IF STATEMENTS
function removeActivePage() {
    links.forEach((link) => {
        {
            link.classList.remove(`active`);
        }
    });
}

// BUTTONS
links.forEach((button) => {
    button.addEventListener(`click`, (e) => {
        const selectedOption = e.currentTarget.classList;
        if (selectedOption.contains(`dashboard`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                dashboardPage.classList.add(`show`);
                Dashboard.classList.add(`active`);
            });
        } else if (selectedOption.contains(`ordersTab`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                orderPage.classList.add(`show`);
                Orders.classList.add(`active`);
            });
        } else if (selectedOption.contains(`productsTab`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                productPage.classList.add(`show`);
                Product.classList.add(`active`);
            });
        } else if (selectedOption.contains(`usersTab`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                userPage.classList.add(`show`);
                User.classList.add(`active`);
            });
        } else if (selectedOption.contains(`reportsTab`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                reportPage.classList.add(`show`);
                Report.classList.add(`active`);
            });
        } else if (selectedOption.contains(`settings`)) {
            mainContent.forEach((cont) => {
                removeActivePage();
                cont.classList.remove(`show`);
                settingsPage.classList.add(`show`);
                Settings.classList.add(`active`);
            });
        }
    });
});

// const lineChart = document.getElementById("myChart");
// const myChart = new chart(lineChart, {
//   type: "line",
//   data: {
//     labels: ["january", "february", "march", "april", "may"],
//     datasets: [
//       {
//         label: "Sales",
//         data: [100000, 132908, 54387, 380765, 123760],
//         backgroundColor: "blue",
//       },
//     ],
//   },
//   option: {},
// });

// UPDATING PAGE CONTENT DYNAMICALLY

const adminDetails = JSON.parse(localStorage.getItem(`adminDetails`));
console.log(adminDetails);
const adminToken = localStorage.getItem(`adminToken`);
console.log(adminToken);

//change name dynamically
const dynamicName = document.querySelectorAll(`.adminName`);
dynamicName.forEach((name) => {
    name.textContent = adminDetails.nameDB;
});

// base url
const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

// adding products to server
const form = document.querySelector(`.addProduct`);
const productName = document.querySelector(`#product-name`);
const productDesc = document.querySelector(`#product-desc`);
const productImage = document.querySelector(`#product-img`);
const productImage1 = document.querySelector(`#product-img1`);
const productImage2 = document.querySelector(`#product-img2`);
const productImage3 = document.querySelector(`#product-img3`);
const productCat = document.querySelector(`#product-cat`);
const productBrand = document.querySelector(`#product-brand`);
const productPrice = document.querySelector(`#product-price`);
const productQty = document.querySelector(`#product-qty`);

form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    console.log(productName.value);
    console.log(productDesc.value);
    console.log(productImage.value);
    console.log(productImage2.value);
    console.log(productImage3.value);
    console.log(productImage4.value);
    console.log(productImage5.value);
    console.log(productCat.value);
    console.log(productBrand.value);
    console.log(productPrice.value);
    console.log(productQty.value);
});

const addItem = async(e) => {
    e.preventDefault();
    const response = await fetch(baseUrl + "product/new/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
            ownerOfItem: "",
            nameOfItem: productName.value,
            descriptionOfItem: productDesc.value,
            imageOfItem: productImage.value,
            imageOfItem1: productImage1.value,
            imageOfItem2: productImage2.value,
            imageOfItem3: productImage3.value,
            categoryOfItem: productCat.value,
            brandOfItem: productBrand.value,
            priceOfItem: productPrice.value,
            quantityOfItem: productQty.value,
        }),
    });
    const data = await response.json();
    console.log(data);
};

form.addEventListener(`submit`, addItem);