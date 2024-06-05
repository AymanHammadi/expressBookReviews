const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password must be provided" });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add new user
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  // Convert the books object to a JSON string and send it as the response
  public_users.get('/', async function (req, res) {
    try {
      const booksList = await new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 1000);
      });
      return res.status(200).json(JSON.stringify(booksList));
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const bookDetails = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      }, 1000);
    });
    return res.status(200).json(bookDetails);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const booksByAuthor = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = Object.values(books).filter(book => book.author === author);
        if (result.length > 0) {
          resolve(result);
        } else {
          reject("Books by this author not found");
        }
      }, 1000);
    });
    return res.status(200).json(booksByAuthor);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    // Simulating an async operation
    const booksByTitle = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const result = Object.values(books).filter(book => book.title === title);
        if (result.length > 0) {
          resolve(result);
        } else {
          reject("Books with this title not found");
        }
      }, 1000);
    });
    return res.status(200).json(booksByTitle);
  } catch (err) {
    return res.status(404).json({ message: err });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;  // Retrieve ISBN from request parameters
  const book = books[isbn];  // Get the book details using the ISBN

  if (book && book.reviews) {
    res.json(book.reviews);  // Send the book reviews as a JSON response
  } else {
    res.status(404).json({ message: "Book not found or no reviews available" });  // Send a 404 response if book or reviews are not found
  }
});

module.exports.general = public_users;
