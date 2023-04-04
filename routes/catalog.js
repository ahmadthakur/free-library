var express = require("express");
var router = express.Router();

const bookController = require("../controllers/bookController");
const authorController = require("../controllers/authorController");
const genreController = require("../controllers/genreController");

const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "free-library",
  password: "mynewpassword",
  port: 5432,
});

// // GET all books and their authors and genres
router.get("/books", bookController.getBook);

/* Add a book to the database with fields
 (title, description, download_link, author_id, genre_id). 
 The request will be a json object with the fields. */
router.get("/books/create", bookController.createGet);

router.post("/books/create", bookController.createPost);

//get a book by id
router.get("/books/:id", bookController.getBookById);

/* Update a book by id. The request will be a json object with the available fields. */
router.put("/books/:id/update", bookController.update);

/* Delete a book by id */
router.delete("/books/:id/delete", bookController.delete);

//get all authors
router.get("/authors", authorController.index);

//get an author by id
router.get("/authors/:id", authorController.getAuthorById);

//create an author
router.post("/authors/create", authorController.create);

//update an author
router.put("/authors/:id/update", authorController.update);

//delete an author
router.delete("/authors/:id/delete", authorController.delete);

//get all genres
router.get("/genres", genreController.index);

//get a genre by id
router.get("/genres/:id", genreController.getGenreById);

//create a genre
router.post("/genres/create", genreController.create);

//update a genre
router.put("/genres/:id/update", genreController.update);

//delete a genre
router.delete("/genres/:id/delete", genreController.delete);

module.exports = router;