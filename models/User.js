// Connexion à la base de données
const { Sequelize, DataTypes } = require("sequelize");
const { databaseReady } = require("../database/config");

const User = databaseReady.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

console.log(User === databaseReady.models.User);
