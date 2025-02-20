const svgHome =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
  "<title>home</title>" +
  '<path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />' +
  "</svg>";

const svgCategory =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
  "<title>view-dashboard</title>" +
  '<path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z"/>' +
  "</svg>";

const svgMyLib =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
  "<title>bookmark</title>" +
  '<path d="M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z" />' +
  "</svg>";

const svgDownload =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
  "<title>download-box</title>" +
  '<path d="M5 3H19C20.11 3 21 3.9 21 5V19C21 20.11 20.11 21 19 21H5C3.9 21 3 20.11 3 19V5C3 3.9 3.9 3 5 3M8 17H16V15H8V17M16 10H13.5V7H10.5V10H8L12 14L16 10Z"/>' +
  "</svg>";

const svgFavorite =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>heart</title><path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" /></svg>';

const svgArray = [svgHome, svgCategory, svgMyLib, svgDownload, svgFavorite];
const sidebarNavArray = [
  "Discover",
  "Category",
  "My Library",
  "Download",
  "Favorite",
];

let sidebarNav = "";
for (let i = 0; i < sidebarNavArray.length; i++) {
  sidebarNav +=
    ' <div id="navContainer"> ' +
    '<div id="iconContainer">' +
    svgArray[i] +
    "</div>" +
    '<div id="iconTitle"><h3>' +
    sidebarNavArray[i] +
    "</h3></div>" +
    "</div>";
}

document.querySelector("span").innerHTML = `${sidebarNav}`;

function Book(title, blurb, author, pages, read) {
  this.title = title;
  this.blurb = blurb;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleReadStatus = function () {
  return `${(this.read = !this.read)}`;
};

const Hobbit = new Book(
  "The Hobbit",
  "The Hobbit is the unforgettable story of Bilbo, a peace-loving hobbit, who embarks on a strange and magical adventure.",
  "J.R.R Tolkien",
  368,
  false
);

const myLibrary = [Hobbit];

let cards = "";

function createCard() {
  cards = "";
  myLibrary.forEach((book, index) => {
    cards += `<div id="card">
    <div id="title"><h1>${book.title}</h1></div>
    <br />
    <div id="blurb"><h3>Blurb:</h3> <p>${book.blurb}</p></div>
    <br />
    <div id="author"><h3>Author:</h3> <p>${book.author}</p></div>
    <br />
    <div id="pages"><h3>Pages:</h3> ${book.pages}</div>
    <br />
    <div id="status"><h3>Status:</h3> <p>${
      book.read ? "Read" : "Not Read"
    }</p> </div>
    <br />
    <div id="btnCardContainer">
    <button id="statusRead" onclick="toggleReadStatus(${index})">${
      !book.read ? "Read" : "Not Read"
    }</button>
    <button id="${index}" onclick="removeBook(event)">Remove</button>
    </div>
    </div>`;
    document.getElementById(
      "cardContainer"
    ).style.gridTemplateColumns = `repeat(${1 ? myLibrary.length : 4}, 300px)`;
  });

  document.getElementById("cardContainer").innerHTML = cards;
}

function creatInputField() {
  document.querySelector("#newBookContainer").innerHTML = `
            <form action="#">
            <span><h1>Add new Book</h1><h3 id="closeNewBook" onclick="clicked(event)">X</h3></span>
            <label>Titel</label>
            <input type="text" value="" />
            <label>Blurb</label>
            <textarea cols="10" name="Blurb" id="blurb"></textarea>
            <label>Author</label>
            <input type="text" value="" />
            <label>Pages</label>
            <input type="number" value="1" min="1" max="999" />
            <br />
            <div>
              <input type="checkbox" value="true" /> <label>Read </label>
              <input type="checkbox" value="false" /> <label>Not Read</label>
            </div>
            <br />
            <input type="submit" value="Submit" />
          </form>
  `;
}
creatInputField();

function addNewBook(event) {
  event.preventDefault();
  const title = document.querySelector("input[type='text']").value;
  const blurb = document.querySelector("textarea[name='Blurb']").value;
  const author = document.querySelector(
    "input[type='text']:nth-of-type(2)"
  ).value;
  const pages = parseInt(document.querySelector("input[type='number']").value);
  const read =
    document.querySelector("input[type='checkbox']:checked").value === "true";

  const addBookToMyLibrary = new Book(title, blurb, author, pages, read);
  myLibrary.push(addBookToMyLibrary);

  createCard();
  document.querySelector("form").reset();
  document.getElementById("newBookContainer").style.display = "none";
}

document
  .querySelector('input[type="submit"]')
  .addEventListener("click", addNewBook);

createCard();

function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  createCard();
}

function removeBook(event) {
  const idOfCard = event.target.id;
  myLibrary.splice(idOfCard, 1);

  createCard();
}

function clicked(event) {
  let id = event.target.id;

  if (id == "newBookInput") {
    document.getElementById("newBookContainer").style.display = "grid";
  } else if (id == "closeNewBook") {
    document.getElementById("newBookContainer").style.display = "none";
  }
}
