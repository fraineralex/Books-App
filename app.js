require('dotenv').config()
const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");
const sequelize = require("./util/database");
const Books = require("./models/Books");
const Categories = require("./models/Categories");
const Authors = require("./models/Authors");
const Editorials = require("./models/Editorials");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const errorController = require("./controllers/ErrorController");

const app = express();

const compareHelpers = require("./util/helpers/hbs/compare");

app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
    helpers: {
      equalValue: compareHelpers.EqualValue,
      lengthValue: compareHelpers.LengthValue,
    },
  })
);

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

app.use(multer({ storage: imageStorage }).single("ImageFile"));

const booksRouter = require("./routes/books");
const categoriesRouter = require("./routes/categories");
const authorsRouter = require("./routes/authors");
const editorialsRouter = require("./routes/editorials");

app.use(booksRouter);
app.use(categoriesRouter);
app.use(authorsRouter);
app.use(editorialsRouter);

app.use(errorController.Get404);

Books.belongsTo(Categories, { constraint: true, onDelete: "CASCADE" });
Categories.hasMany(Books);

Books.belongsTo(Authors, { constraint: true, onDelete: "CASCADE" });
Authors.hasMany(Books);

Books.belongsTo(Editorials, { constraint: true, onDelete: "CASCADE" });
Editorials.hasMany(Books);

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    });
  })
  .catch((err) => {
    console.log(err);
  });
