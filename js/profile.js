let Account=document.querySelector(".account")
let Saved=document.querySelector(".saved")
let savedItems=document.querySelector(".savedItems")
let myAccount=document.querySelector(".myAccount")
let userIcon=document.querySelector(".userIcon")
let savedIcon=document.querySelector(".savedIcon")

function account(){
    Account.classList.remove("hide");
    Saved.classList.remove("show");
    myAccount.classList.add("active");
    savedItems.classList.remove('active');
    userIcon.classList.add("active");
    savedIcon.classList.remove("active")
}

function saved(){
    Account.classList.add("hide");
    Saved.classList.add("show");
    savedItems.classList.add("active");
    myAccount.classList.remove("active");
    userIcon.classList.remove("active");
    savedIcon.classList.add("active")
}