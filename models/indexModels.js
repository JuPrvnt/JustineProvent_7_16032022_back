// Importation des dépendances
const { Sequelize, DataTypes } = require("sequelize");
const UserModels = require("../models/UserModels");
const PostModels = require("../models/PostModels");
const CommentModels = require("../models/CommentModels");

require("dotenv").config();

// Connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: true,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./UserModels")(sequelize, Sequelize);
db.post = require("./PostModels")(sequelize, Sequelize);
db.comment = require("./CommentModels")(sequelize, Sequelize);

// Associations des models
const keyUser = { name: "userId", allowNull: false };

db.user.hasMany(db.post, { foreignKey: keyUser });
db.post.belongsTo(db.user, { foreignKey: keyUser });
db.comment.belongsTo(db.user, { foreignKey: keyUser });

module.exports = db;
