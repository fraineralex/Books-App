const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Editorials = sequelize.define("editorial",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  name:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  phone:{
      type: Sequelize.STRING,
      allowNull: false,
  },
  country:{
    type: Sequelize.STRING,
    allowNull: false,
}
})

module.exports = Editorials;
