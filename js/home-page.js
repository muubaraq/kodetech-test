// LIKE BUTTONS
const hearts = document.querySelectorAll(`.bi-heart-fill`);

hearts.forEach(function (heart) {
  heart.addEventListener(`click`, function (e) {
    const liked = e.currentTarget;
    if (liked.classList.contains(`text-danger`)) {
      liked.classList.remove(`text-danger`);
    } else {
      liked.classList.add(`text-danger`);
    }
  });
});

// UPDATING CONTENT DYNAMICALLY

// base url
const baseUrl = "https://kodecamp-ecommerce.herokuapp.com/";

// HTML containers
const homeProductsMobile = document.querySelector(`.mobile-recommended-cat`);
const homeProducts = async () => {
  const response = await fetch(baseUrl + "items", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.status == 200) {
    for (i = 0; i < 8; i++) {
      homeProductsMobile.innerHTML += `<div class="col-6 col-md-6 col-lg-3 my-2">
          <div class="card">
            <div class="img-div">
              <a href="#"><img src="https://i.postimg.cc/C1kmR82Y/21.png" id="${
                data.allItems[i]._id
              }" class="card-img-top phone"
                  alt="wireless gmaepad"></a>
            </div>
            <div class="card-body">
              <p class="card-text FW-600 mobile-text price-text ">${
                data.allItems[i].nameDB
              }</p>
              <p class="card-text cat-color FW-600 price-text">₦${data.allItems[
                i
              ].priceDB.toLocaleString(`en-US`)}</p>
              <div class="reviews d-flex justify-content-between">
                <div class="sub-review d-flex align-items-center justify-content-between">
                  <div class="rate-me d-flex">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-star-fill" viewBox="0 0 16 16">
                      <path class="rating mt-3"
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <p class="FW-600 px-1 footer-text-1 footer-text">3.0</p>
                  </div>


                  <p class="text-muted FW-600 footer-text-1 footer-text"> (15 Reviews)</p>
                </div>

                <div class="like-icon-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                    class="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path class="icon" fill-rule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                </div>
              </div>
              <div class="d-grid gap-2 col-12 mx-auto mt-3">
                <button class="btn btn-add-to-cart FW-600" type="button">Add to cart</button>
              </div>
            </div>
          </div>
        </div>`;
      const photo = document.querySelectorAll(`.phone`);
      console.log(photo);
      photo.forEach((image) => {
        image.addEventListener(`click`, async (e) => {
          console.log(e.currentTarget);
          const uniqueID = e.currentTarget.id;
          console.log(uniqueID);
          const response = await fetch(baseUrl + `item/${uniqueID}`);
          const data = await response.json();
          console.log(data);
          localStorage.setItem(`productObject`, JSON.stringify(data.item));
          location.assign(`../pages/product-detail.html`);
        });
      });
    }
  }
};

window.addEventListener(`DOMContentLoaded`, homeProducts);
