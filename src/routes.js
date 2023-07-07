const {
  addBook,
  getAllBooks,
  getSpecifiedBook,
  editBookById,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getSpecifiedBook,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookById,
  },
];

module.exports = routes;
