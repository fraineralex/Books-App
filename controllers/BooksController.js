const Books = require("../models/Books");
const Categories = require("../models/Categories");
const Authors = require("../models/Authors");
const Editorials = require("../models/Editorials");
const Nodemailer = require("nodemailer");

const transporter = Nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: "frainerdeveloper@gmail.com",
    pass: "tpetkliekyrmnbzj",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.GetBooksHome = (req, res, next) => {
  Books.findAll({
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);
      Categories.findAll().then((result) => {
        const categories = result.map((result) => result.dataValues);

        res.render("client/home", {
          pageTitle: "Home",
          homeActive: true,
          books: books,
          hasBooks: books.length > 0,
          search: true,
          categories: categories,
          default: true,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostSearchedBooks = (req, res, next) => {
  const title = req.body.SearchVar;
  Books.findAll({
    where: { title: title },
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);

      Categories.findAll().then((result) => {
        const categories = result.map((result) => result.dataValues);

        let bookTitle;
        if (books.length > 0) {
          bookTitle = books[0].title;
        }

        res.render("client/home", {
          pageTitle: "Home",
          homeActive: true,
          books: books,
          hasBooks: books.length > 0,
          categories: categories,
          searching: true,
          bookTitle: bookTitle,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostFilteredBooks = (req, res, next) => {
  const categoryId = req.body.Filter;
  id = categoryId.split(",");
  const { Op } = require("sequelize");
  Books.findAll({
    where: {
      categoryId: {
        [Op.or]: [id],
      },
    },
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);
      Categories.findAll().then((result) => {
        const categories = result.map((result) => result.dataValues);

        let categorySelected;
        if (books.length > 0) {
          categorySelected = books[0].category.name;
        }

        res.render("client/home", {
          pageTitle: "Home",
          homeActive: true,
          books: books,
          hasBooks: books.length > 0,
          search: true,
          categories: categories,
          filter: true,
          categorySelected: categorySelected,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostBookDetails = (req, res, next) => {
  const bookId = req.body.BookId;
  Books.findOne({
    where: {
      id: bookId,
    },
    include: [{ model: Categories }, { model: Authors }, { model: Editorials }],
  })
    .then((result) => {
      const book = result.dataValues;

      res.render("client/book-details", {
        pageTitle: "Detalles",
        detailsActive: true,
        book: book,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetAdminBooks = (req, res, next) => {
  Books.findAll({
    include: [{ model: Authors }, { model: Categories }, { model: Editorials }],
  })
    .then((result) => {
      const books = result.map((result) => result.dataValues);

      res.render("admin/books/admin-books", {
        pageTitle: "Libros",
        booksActive: true,
        books: books,
        admin: true,
        hasBooks: books.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetRegisterBook = (req, res, next) => {
  Categories.findAll()
    .then((result) => {
      const categories = result.map((result) => result.dataValues);

      Authors.findAll().then((result) => {
        const authors = result.map((result) => result.dataValues);

        Editorials.findAll().then((result) => {
          const editorials = result.map((result) => result.dataValues);

          res.render("admin/books/save-book", {
            pageTitle: "Registrar libro",
            booksActive: true,
            categories: categories,
            authors: authors,
            editorials: editorials,
            hasCategories: categories.length > 0,
            hasAuthors: authors.length > 0,
            hasEditorials: editorials.length > 0,
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostRegisterBook = (req, res, next) => {
  const title = req.body.Title;
  const yearPublished = req.body.YearPublished;
  const imageUrl = req.file;
  const categoryId = req.body.CategoryId;
  const authorId = req.body.AuthorId;
  const editorialId = req.body.EditorialId;

  Books.create({
    title: title,
    yearPublished: yearPublished,
    imageUrl: "/" + imageUrl.path,
    categoryId: categoryId,
    authorId: authorId,
    editorialId: editorialId,
  })
    .then((result) => {
      res.redirect("/admin-books");

      Books.findOne({
        where: { authorId: authorId },
        include: [{ model: Authors }],
      }).then((result) => {
        const book = result.dataValues;

        transporter
          .sendMail({
            from: "frainerdeveloper@gmail.com",
            to: book.author.email,
            subject: "Books Aplication",
            html: `
              <div>
              <p>¡Hola ${book.author.name}!</p>
              <p>se ha publicado el libro de su autoría "${title}" en nuestra cartelera.</p>
              </div>`,
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.GetEditBook = (req, res, next) => {
  const edit = req.query.edit;
  const id = req.params.BookId;

  if (!edit) {
    return res.redirect("/admin-books");
  }

  Books.findOne({ where: { id: id } })
    .then((result) => {
      const book = result.dataValues;

      if (!book) {
        return res.redirect("/admin-books");
      }

      Categories.findAll()
        .then((result) => {
          const categories = result.map((result) => result.dataValues);

          Authors.findAll().then((result) => {
            const authors = result.map((result) => result.dataValues);

            Editorials.findAll().then((result) => {
              const editorials = result.map((result) => result.dataValues);

              res.render("admin/books/save-book", {
                pageTitle: "Actualizar Libro",
                booksActive: true,
                editMode: edit,
                book: book,
                categories: categories,
                authors: authors,
                editorials: editorials,
                hasCategories: categories.length > 0,
                hasAuthors: authors.length > 0,
                hasEditorials: editorials.length > 0,
              });
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostEditBook = (req, res, next) => {
  const title = req.body.Title;
  const yearPublished = req.body.YearPublished;
  const imageUrl = req.file;
  const categoryId = req.body.CategoryId;
  const authorId = req.body.AuthorId;
  const editorialId = req.body.EditorialId;
  const bookId = req.body.BookId;

  Books.update(
    {
      title: title,
      yearPublished: yearPublished,
      imageUrl: "/" + imageUrl.path,
      categoryId: categoryId,
      authorId: authorId,
      editorialId: editorialId,
    },
    { where: { id: bookId } }
  )
    .then((result) => {
      return res.redirect("/admin-books");
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.PostDeleteBook = (req, res, next) => {
  const id = req.body.BookId;

  Books.destroy({ where: { id: id } })
    .then((result) => {
      return res.redirect("/admin-books");
    })
    .catch((err) => {
      console.log(err);
    });
};
