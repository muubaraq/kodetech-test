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
    console.log(e.currentTarget.classList);
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

const labels = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7'
];

const data = {
  labels: labels,
  datasets: [{
    label: 'Monthly sales',
    backgroundColor: 'blue',
    borderColor: 'blue',
    data: [250, 700, 1600, 550, 120, 300, 680],
  }]
};

const config = {
  type: 'line',
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
                  bottom: 30
              }
          }
      }
  }
};


const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

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

const addItem = async (e) => {
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
