/* eslint-disable import/no-extraneous-dependencies */
const { nanoid } = require("nanoid");
const books = require("./books");

const addBook = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  // Debugging start from here
  // validasi nama books
  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // validasi readPage
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((b) => b.id === id).length > 0;

  //   Memeriksa apakah books berhasil ditambahkan
  if (isSuccess) {
    // validasi berhasil
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};
// Ending here

const getAllBooks = () => ({
  status: "success",
  data: {
    books: books.map((b) => ({
      id: b.id,
      name: b.name,
      publisher: b.publisher,
    })),
  },
});

const getSpecifiedBook = (request, h) => {
  const { id } = request.params;

  const bookId = books.filter((b) => b.id === id)[0];

  // validasi keberadaan buku
  if (bookId !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        bookId,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};
module.exports = { addBook, getAllBooks, getSpecifiedBook };
