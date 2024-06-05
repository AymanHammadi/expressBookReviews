const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Convert the books object to a JSON string and send it as the response
  res.send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;  // Retrieve ISBN from request parameters
  const book = books[isbn];  // Get the book details using the ISBN
  if (book) {
    res.json(book);  // Send the book details as a JSON response
  } else {
    res.status(404).json({ message: "Book not found" });  // Send a 404 response if book is not found
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;  // Retrieve author from request parameters
  const booksByAuthor = Object.values(books).filter(book => book.author === author);  // Filter books by author

  if (booksByAuthor.length > 0) {
    res.json(booksByAuthor);  // Send the books as a JSON response
  } else {
    res.status(404).json({ message: "No books found by this author" });  // Send a 404 response if no books are found
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;  // Retrieve title from request parameters
  const booksByTitle = Object.values(books).filter(book => book.title === title);  // Filter books by title

  if (booksByTitle.length > 0) {
    res.json(booksByTitle);  // Send the books as a JSON response
  } else {
    res.status(404).json({ message: "No books found with this title" });  // Send a 404 response if no books are found
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
