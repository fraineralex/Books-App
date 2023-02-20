const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/CategoriesController');


router.get("/admin-categories", categoriesController.GetAdminCategories);
router.get("/register-category", categoriesController.GetRegisterCategory);
router.post("/register-category", categoriesController.PostRegisterCategory);
router.get("/edit-category/:categoryId", categoriesController.GetEditCategory);
router.post("/edit-category", categoriesController.PostEditCategory);
router.post("/delete-category", categoriesController.PostDeleteCategory);


module.exports = router;
