const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Books = sequelize.define("book",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  title:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  yearPublished:{
      type: Sequelize.INTEGER,
      allowNull: false,
  },
  imageUrl:{
    type: Sequelize.STRING,
    allowNull: false,
},
})

module.exports = Books;
