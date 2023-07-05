const { addBook, getAllBooks } = require("./handler");

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
    handler: () => {},
  },
];

module.exports = routes;
