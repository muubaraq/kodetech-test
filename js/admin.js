// DARK MODE
const docBody = document.querySelector(`.doc-body`);
const topNav = document.querySelector(`.top-nav`);
const sideNav = document.querySelector(`.side-nav`);
const darkLogo = document.querySelector(`.dark-logo`);
const lightLogo = document.querySelector(`.light-logo`);
const metricCards = document.querySelectorAll(`.metric`);
const searchInput = document.querySelector(`.search-input`);
const searchField = document.querySelector(`.search-field`);
const adminDropdown = document.querySelector(`.admin-list`);
const mostPurchased = document.querySelectorAll(`.productDescription`);
const mostPurchasedTexts = document.querySelectorAll(
  `.productType, .productBrand, .description, .colortype, .price `
);
const rocket = document.querySelector(`.rocket`);
const chart = document.querySelector(`.chart-section`);
const reportCards = document.querySelectorAll(`.report-card`);
const settingsCards = document.querySelectorAll(`.settings-card`);
const orderDetails = document.querySelectorAll(`.order-details`);
const orderCategories = document.querySelectorAll(`.order-category`);
const orderRows = document.querySelectorAll(`.order-row`);
const months = document.querySelector(`.months`);

const toggleDarkMode = document.querySelector(`.darkmode-switch`);
toggleDarkMode.addEventListener(`click`, () => {
  docBody.classList.toggle(`bodyBlack`);
  topNav.classList.toggle(`lightBlack`);
  sideNav.classList.toggle(`darkestBlack`);
  searchInput.classList.toggle(`darkestBlack`);
  searchField.classList.toggle(`darkestBlack`);
  adminDropdown.classList.toggle(`lightBlack`);
  rocket.classList.toggle(`lightBlack`);
  chart.classList.toggle(`darkestBlack`);
  months.classList.toggle(`darkestBlack`);
  darkLogo.classList.toggle(`darkmode-logo`);
  lightLogo.classList.toggle(`light-mode-logo`);

  metricCards.forEach((metric) => {
    metric.classList.toggle(`darkestBlack`);
  });
  reportCards.forEach((reportCard) => {
    reportCard.classList.toggle(`darkestBlack`);
  });
  settingsCards.forEach((settings) => {
    settings.classList.toggle(`bodyBlack`);
  });
  mostPurchased.forEach((product) => {
    product.classList.toggle(`darkestBlack`);
  });
  mostPurchasedTexts.forEach((text) => {
    text.classList.toggle(`text-light`);
  });
  orderCategories.forEach((category) => {
    category.classList.toggle(`lightBlack`);
  });
  orderRows.forEach((orderRow) => {
    orderRow.classList.toggle(`lightBlack`);
  });
});

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
setInterval(formatDate, 1000);
formatDate();
let totalVisits = document.querySelector(".totalVisits");
let totalUsers = document.querySelector(".totalUsers");
let totalActiveUsers = document.querySelector(".totalActiveUsers");
fetch("https://kodecamp-ecommerce.herokuapp.com/users/all")
  .then((res) => res.json())
  .then((data) => {
    totalVisits.innerHTML = `Total Visits<br> ${data.attemptedRegistration}`;
    totalUsers.innerHTML = `Total Users<br> ${data.verifiedUsers}`;
    totalActiveUsers.innerHTML = `Active Users<br>${data.usersOnline}`;
  });

fetch("https://kodecamp-ecommerce.herokuapp.com/users/all")
  .then((res) => res.json())
  .then((data) => outputAdmin(data.totalUsersInfo))
  .catch((err) => console.log(err));

function outputAdmin(data) {
  let div = "";
  data.forEach((dat) => {
    div += `
             <div class="row admin admin-row py-4 mb-1 border-rounded" >
                <div class="col-3">
              <span class="image">${dat.name.slice(0, 1).toUpperCase()}</span>
                <span class="name">${dat.name}</span>
                </div>
                <div class="col-3">
                    <span class="gmail"> ${dat.email}</span>
                </div>
<div class="col-3 text-center role">${dat.role}</div>
                <div class="col-2">
                    <span class="status">
              <div class="row">
                <div class="col-lg-1 col-md-2 mt-2">
                    <div class=${
                      dat.loggedIn ? "circle-bg-green" : " circle-bg-red"
                    } "></div> </div>
                  <div class="col-lg-9 col-md-10">
                      <span class="statusPara">${
                        dat.loggedIn ? "Logged In" : "Logged Out"
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
    const adminRows = document.querySelectorAll(`.admin-row`);
    toggleDarkMode.addEventListener(`click`, () => {
      adminRows.forEach((adminRow) => {
        adminRow.classList.toggle(`lightBlack`);
      });
    });
  });
}
// END OF USERS

// LOGOS FOR THE SIDEBAR
const microsoft = document.querySelector(`.bi-microsoft`);
const products = document.querySelector(`.bi-bag-dash-fill`);
const reports = document.querySelector(`.bi-bar-chart-fill`);
const users = document.querySelector(`.bi-people-fill`);

// CALLBACK FUNCTION THAT WILL BE USED IN ALL THE IF STATEMENTS
function removeActivePage() {
  links.forEach((link) => {
    {
      link.classList.remove(`active`);
      microsoft.classList.remove(`text-light`);
      products.classList.remove(`text-light`);
      reports.classList.remove(`text-light`);
      users.classList.remove(`text-light`);
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
        microsoft.classList.add(`text-light`);
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
        products.classList.add(`text-light`);
      });
    } else if (selectedOption.contains(`usersTab`)) {
      mainContent.forEach((cont) => {
        removeActivePage();
        cont.classList.remove(`show`);
        userPage.classList.add(`show`);
        User.classList.add(`active`);
        users.classList.add(`text-light`);
      });
    } else if (selectedOption.contains(`reportsTab`)) {
      mainContent.forEach((cont) => {
        removeActivePage();
        cont.classList.remove(`show`);
        reportPage.classList.add(`show`);
        Report.classList.add(`active`);
        reports.classList.add(`text-light`);
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

const labels = ["1", "2", "3", "4", "5", "6", "7"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Monthly sales",
      backgroundColor: "blue",
      borderColor: "blue",
      data: [250, 700, 1600, 550, 120, 300, 680],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: "Total number of sales",
        align: "start",
        padding: {
          top: 10,
          left: 0,
          bottom: 30,
        },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);

// UPDATING PAGE CONTENT DYNAMICALLY

const adminDetails = JSON.parse(localStorage.getItem(`adminDetails`));
const adminToken = localStorage.getItem(`adminToken`);

//CHANGE NAME DYNAMICALLY
const dynamicName = document.querySelector(`.adminName`);
dynamicName.innerHTML = `${adminDetails.details.nameDB.toLowerCase()}`;
const greetingName = document.querySelector(`.adminName-greet`);
greetingName.innerHTML = `Hello ${adminDetails.details.nameDB
  .split(` `)[0]
  .toLowerCase()}`;
const circularName = document.querySelector(`.circular-name`);
circularName.innerHTML = `${adminDetails.details.nameDB.slice(0, 1)}`;

// base url
const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

// ADDING PRODUCTS TO THE SERVER
const form = document.querySelector(`.addProduct`);
const productName = document.querySelector(`#product-name`);
productName.addEventListener(`input`, () => {
  console.log(productName.value);
});
const productDesc = document.querySelector(`#product-desc`);
console.log(productDesc);
const productImage = document.querySelector(`#product-img`);
const productCat = document.querySelector(`#product-cat`);
const productBrand = document.querySelector(`#product-brand`);
const productPrice = document.querySelector(`#product-price`);
const productQty = document.querySelector(`#product-qty`);

const addItem = async (e) => {
  console.log(productName.value);
  console.log(productImage.value);
  console.log(productBrand.value);
  console.log(productQty.value);
  console.log(productCat.value);
  console.log(productDesc.value);
  // e.preventDefault();
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
      categoryOfItem: productCat.value,
      brandOfItem: productBrand.value,
      priceOfItem: productPrice.value,
      quantityOfItem: productQty.value,
    }),
  });
  const data = await response.json();
  console.log(data);
};
addItem();
// form.addEventListener(`submit`, addItem);
