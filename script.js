const addBookButton = document.querySelector(".add-book-button");
const popUp = document.querySelector(".pop-up");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector(".pop-up-header button");
const addBookForm = document.querySelector("form");

function togglePopup() {
  popUp.classList.toggle("active");
  overlay.classList.toggle("active");
}
addBookButton.addEventListener("click", () => togglePopup());

closeButton.addEventListener("click", () => togglePopup());

const myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function getValues(e) {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let haveRead = document.querySelector("#have-read").checked;
  let newBook = new Book(title, author, pages, haveRead);
  addBookToLibrary(newBook);
}
addBookForm.addEventListener("submit", getValues);

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  console.log(myLibrary);
}
