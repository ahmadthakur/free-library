const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "free-library",
  password: "mynewpassword",
  port: 5432,
});

//export the functions to be used in the routes

//display the index.ejs view
module.exports.getBook = function (req, res, next) {
  pool.query("SELECT * FROM books", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result.rows);
  });
};

// GET a single book by id
module.exports.getBookById = function (req, res, next) {
  const id = req.params.id;
  pool.query(
    "SELECT books.id, books.title, books.description, books.download_link, authors.name AS author, genres.name AS genre FROM books INNER JOIN authors ON books.author_id = authors.id INNER JOIN genres ON books.genre_id = genres.id WHERE books.id = $1",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result.rows);
    }
  );
};

/* Add a book to the database with fields
  (title, description, download_link, author_id, genre_id).
  The request will be a json object with the fields. */
module.exports.create = function (req, res, next) {
  //send the bookForm.ejs view
  res.render("bookForm", { title: "Add a book" });
};

//   const { title, description, download_link, author_id, genre_id } = req.body;
//   pool.query(
//     "INSERT INTO books (title, description, download_link, author_id, genre_id) VALUES ($1, $2, $3, $4, $5)",
//     [title, description, download_link, author_id, genre_id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//       res.send("Book added");
//     }
//   );
// };

/* Update a book by id. The request will be a json object with the available fields. */
module.exports.update = function (req, res, next) {
  const id = req.params.id;
  const { title, description, download_link, author_id, genre_id } = req.body;
  pool.query(
    "UPDATE books SET title = $1, description = $2, download_link = $3, author_id = $4, genre_id = $5 WHERE id = $6",
    [title, description, download_link, author_id, genre_id, id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send("Book updated");
    }
  );
};

module.exports.delete = function (req, res, next) {
  const id = req.params.id;
  pool.query("DELETE FROM books WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send("Book deleted");
  });
};
