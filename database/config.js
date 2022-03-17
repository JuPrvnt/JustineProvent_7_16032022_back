// Importation des dépendances
const Sequelize = require("sequelize");

require("dotenv").config();

// Connexion à la base de données
const database = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

database
  .authenticate()
  .then(() => console.log("Connexion établie avec la base de données !"))
  .catch((error) =>
    console.error("Impossible de se connecter à la base de données !", error)
  );

// Synchronisation de la base de données
const synchronisation = () => {
  return User.sync({ force: true })
    .then(() => console.log("La base de données est synchronisée."))
    .catch((error) => res.status(503).json({ error }));
};

databaseReady = {};
databaseReady.Sequelize = Sequelize;
databaseReady.sequelize = database;

module.exports = databaseReady;
