const emailConfirm = document.querySelector(`.email-confirm`);
console.log(emailConfirm);
emailConfirm.addEventListener(`click`, (e) => {
  e.preventDefault();
  window.open("https://mail.google.com/");
  location.assign(`../pages/sign-in.html`);
});
