const addBookButton = document.querySelector(".add-book-button");
const popUp = document.querySelector(".pop-up");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector(".pop-up-header button");
const addBookForm = document.querySelector("form");
const addedBooks = document.querySelector(".added-books");

const titleInput = document.querySelector("#title");
const titleError = document.querySelector("#title + .error");
const authorInput = document.querySelector("#author");
const authorError = document.querySelector("#author + .error");
const pagesInput = document.querySelector("#pages");
const pagesError = document.querySelector("#pages + .error");

// Array with all stored books
const myLibrary = [];

function togglePopup() {
  popUp.classList.toggle("active");
  overlay.classList.toggle("active");
}
addBookButton.addEventListener("click", () => togglePopup());

closeButton.addEventListener("click", () => togglePopup());

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
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
  if (!titleInput.validity.valid) {
    showTitleError();
  } else if (!authorInput.validity.valid) {
    showAuthorError();
  } else {
    togglePopup();
    let title = document.querySelector("#title").value;
    document.querySelector("#title").value = "";
    let author = document.querySelector("#author").value;
    document.querySelector("#author").value = "";
    let pages = document.querySelector("#pages").value;
    document.querySelector("#pages").value = "";
    let haveRead = document.querySelector("#have-read").checked;
    document.querySelector("#have-read").checked = false;
    let newBook = new Book(title, author, pages, haveRead);

    addBookToLibrary(newBook);
  }
}

addBookForm.addEventListener("submit", getValues);

// Form Validation
titleInput.addEventListener("input", (e) => {
  if (titleInput.validity.valid) {
    titleError.textContent = "";
    titleError.classList = "error";
    titleInput.classList.remove("invalid");
  } else {
    showTitleError();
  }
});

function showTitleError() {
  if (titleInput.validity.valueMissing) {
    titleError.textContent = "You need to enter a title.";
  } else if (titleInput.validity.tooShort) {
    titleError.textContent = `Title should be at least ${titleInput.minLength} characters`;
  }
  titleError.className = "error active";
  titleInput.classList.add("invalid");
}

authorInput.addEventListener("input", (e) => {
  if (authorInput.validity.valid) {
    authorError.textContent = "";
    authorError.classList = "error";
    authorInput.classList.remove("invalid");
  } else {
    showAuthorError();
  }
});

function showAuthorError() {
  if (authorInput.validity.valueMissing) {
    authorError.textContent = "You need to enter an author.";
  } else if (authorInput.validity.tooShort) {
    authorError.textContent = `Name should be at least ${authorInput.minLength} characters`;
  }
  authorError.className = "error active";
  authorInput.classList.add("invalid");
}

pagesInput.addEventListener("input", (e) => {
  if (pagesInput.validity.valid) {
    pagesError.textContent = "";
    pagesError.classList = "error";
    pagesInput.classList.remove("invalid");
  } else {
    showpagesError();
  }
});

function showpagesError() {
  if (pagesInput.validity.rangeUnderflow) {
    pagesError.textContent = `Book should have at least ${pagesInput.min} pages`;
  } else if (pagesInput.validity.rangeOverflow) {
    pagesError.textContent = `Book shouldn't have more than ${pagesInput.max} pages`;
  }

  pagesInput.classList.add("invalid");
}
