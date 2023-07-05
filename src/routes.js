const { addBook, getAllBooks, getSpecifiedBook } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
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
];

module.exports = routes;
