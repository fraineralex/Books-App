const Categories = require("../models/Categories");
const Books = require("../models/Books");

exports.GetAdminCategories = (req, res, next) => {
  Categories.findAll({include: [{ model: Books }]})
  .then((result) => {
      const categories = result.map((result) => result.dataValues);

      res.render("admin/categories/admin-categories", {
        pageTitle: "Categorias",
        categoriesActive: true,
        categories: categories,
        hasCategories: categories.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetRegisterCategory = (req, res, next) => {
  res.render("admin/categories/save-category", {
    pageTitle: "Registrar Categoria",
    categoriesActive: true,
  });
};

exports.PostRegisterCategory = (req, res, next) => {
  const name = req.body.Name;
  const description = req.body.Description;

  Categories.create({ name: name, description: description })
    .then((result) => {
      res.redirect("/admin-categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditCategory = (req, res, next) => {
  const edit = req.query.edit;
  const categoryId = req.params.categoryId;

  if (!edit) {
    return res.redirect("/admin-categories");
  }

  Categories.findOne({ where: { id: categoryId } })
    .then((result) => {
      const category = result.dataValues;

      if (!category) {
        return res.redirect("/admin-categories");
      }
      res.render("admin/categories/save-category", {
        pageTitle: "Actualizar Categoria",
        categoriesActive: true,
        editMode: edit,
        category: category,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditCategory = (req, res, next) => {
  const name = req.body.Name;
  const description = req.body.Description;
  const categoryId = req.body.CategoryId;

  Categories.update({ name: name, description: description }, { where: { id: categoryId } })
    .then((result) => {
      return res.redirect("/admin-categories");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostDeleteCategory = (req, res, next) => {
  const categoryId = req.body.CategoryId;

  Categories.destroy({ where: { id: categoryId } })
    .then((result) => {
      return res.redirect("/admin-categories");
    })
    .catch((err) => {
      console.log(err);
    });
};
