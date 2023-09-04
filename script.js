const addBookButton = document.querySelector(".add-book-button");
const popUp = document.querySelector(".pop-up");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector(".pop-up-header button");
const addBookForm = document.querySelector("form");
const addedBooks = document.querySelector(".added-books");

// Array with all stored books
const myLibrary = [];

function togglePopup() {
  popUp.classList.toggle("active");
  overlay.classList.toggle("active");
}
addBookButton.addEventListener("click", () => togglePopup());

closeButton.addEventListener("click", () => togglePopup());

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

function toggleReadStatus(e) {
  e.target.classList.toggle("have-read");
  e.target.classList.toggle("not-read");
  if (e.target.textContent === "Read") {
    e.target.textContent = "Not read";
  } else {
    e.target.textContent = "Read";
  }
}

function removeBook(e) {
  addedBooks.textContent = "";
  myLibrary.splice(e.target.id, 1);
  displayBook(myLibrary);
}

function displayBook(myLibrary) {
  addedBooks.textContent = "";
  numOfBook = 0;
  //iterate over book objects stored in myLibrary
  for (const book of myLibrary) {
    card = document.createElement("div");
    card.classList.add("book");
    ul = document.createElement("ul");

    //iterate over keys store in book object
    for (const info in book) {
      li = document.createElement("li");
      if (info === "haveRead") {
        button = document.createElement("button");

        button.addEventListener("click", toggleReadStatus);
        if (book[info] === true) {
          button.classList.add("have-read");
          button.textContent = "Read";
        } else {
          button.classList.add("not-read");
          button.textContent = "Not read";
        }
        li.append(button);
      } else {
        li.classList.add("info");
        li.textContent = book[info];
      }
      ul.append(li);
    }
    removeLi = document.createElement("li");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");
    removeButton.setAttribute("id", `${numOfBook}`);
    removeButton.addEventListener("click", removeBook);

    removeLi.append(removeButton);
    ul.append(removeLi);

    card.append(ul);

    addedBooks.append(card);
    numOfBook++;
  }
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  displayBook(myLibrary);
}

function getValues(e) {
  e.preventDefault();
  togglePopup();
  let title = document.querySelector("#title").value;

  let author = document.querySelector("#author").value;

  let pages = document.querySelector("#pages").value;

  let haveRead = document.querySelector("#have-read").checked;

  let newBook = new Book(title, author, pages, haveRead);

  addBookToLibrary(newBook);
}

addBookForm.addEventListener("submit", getValues);
