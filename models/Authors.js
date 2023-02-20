const Sequelize = require("sequelize");

const sequelize = require("../util/database");


const Authors = sequelize.define("author",{
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
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    }
})


module.exports = Authors;