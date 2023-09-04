const addBookButton = document.querySelector(".add-book-button");
const popUp = document.querySelector(".pop-up");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector(".pop-up-header button");

addBookButton.addEventListener("click", () => {
  popUp.classList.toggle("active");
  overlay.classList.toggle("active");
});

closeButton.addEventListener("click", () => {
  popUp.classList.toggle("active");
  overlay.classList.toggle("active");
});
