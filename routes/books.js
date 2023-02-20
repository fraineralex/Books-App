const express = require('express');

const router = express.Router();

const booksController = require('../controllers/BooksController');

router.get("/",booksController.GetBooksHome);
router.post("/search-book",booksController.PostSearchedBooks);
router.post("/filter-books",booksController.PostFilteredBooks);
router.post("/book-details", booksController.PostBookDetails);
router.get("/admin-books",booksController.GetAdminBooks);
router.get("/register-book", booksController.GetRegisterBook);
router.post("/register-book", booksController.PostRegisterBook);
router.get("/edit-book/:BookId", booksController.GetEditBook);
router.post("/edit-book", booksController.PostEditBook);
router.post("/delete-book", booksController.PostDeleteBook);


module.exports = router;
