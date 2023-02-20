const express = require("express");

const editorialController =require("../controllers/EditorialsController");

const router = express.Router();

router.get("/admin-editorials", editorialController.GetAdminEditorials);

router.get("/register-editorial", editorialController.GetRegisterEditorial);
router.post("/register-editorial", editorialController.PostRegisterEditorial);

router.get("/edit-editorial/:EditorialId", editorialController.GetEditEditorial);
router.post("/edit-editorial", editorialController.PostEditEditorial);

router.post("/delete-editorial", editorialController.PostDeleteEditorial);

module.exports = router;