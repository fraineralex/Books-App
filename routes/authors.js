const express = require("express");

const authorController =require("../controllers/AuthorsController");

const router = express.Router();

router.get("/admin-authors", authorController.GetAdminAuthors);

router.get("/register-author", authorController.GetRegisterAuthor);
router.post("/register-author", authorController.PostRegisterAuthor);

router.get("/edit-author/:AuthorId", authorController.GetEditAuthors);
router.post("/edit-author", authorController.PostEditAuthor);

router.post("/delete-author", authorController.PostDeleteAuthor);

module.exports = router;