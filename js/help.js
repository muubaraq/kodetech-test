let arrowDown = document.querySelectorAll(".bi-chevron-down");
let arrowUp = document.querySelectorAll(".bi-chevron-up");
let input = document.querySelector(".form-control");
let headChilds = [...document.querySelectorAll(".head-childs")];
let headChildTag = [...document.querySelectorAll(".headChildTag")];
arrowDown.forEach((arr) => {
    arr.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        const newItem = headChilds.find((item) => item.dataset.id === id);
        newItem.classList.toggle("none");
        let newArrowUp = [...arrowUp];
        let arrUp = newArrowUp.find((arr) => arr.dataset.id === id);
        arrUp.classList.remove("none");
        e.target.classList.add("none");
    });
});

arrowUp.forEach((arr) => {
    arr.addEventListener("click", (e) => {
        let id = e.target.dataset.id;
        const newItem = headChilds.find((item) => item.dataset.id === id);
        newItem.classList.toggle("none");
        let newArrowDown = [...arrowDown];
        let arrDown = newArrowDown.find((arr) => arr.dataset.id === id);
        arrDown.classList.remove("none");
        e.target.classList.add("none");
    });
});
input.addEventListener("keyup", (e) => {
    let inputvalue = e.target.value;
    let filterDiv = document.getElementById("filteredhelpcenter");
    if (inputvalue.length) {
        let newchild = headChildTag.filter((child) =>
            child.innerText.toLowerCase().includes(inputvalue.toLowerCase())
        );
        let smalldiv = "";
        newchild.forEach((item) => {
            smalldiv += `<p><a href="#" class="col-12 headChildTag">${item.innerText}</a></p>`;
            filterDiv.innerHTML = smalldiv;
        });
    } else if (!inputvalue.length) {
        filterDiv.innerHTML = "";
    }
});