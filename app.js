// Importation des plugins
const express = require("express");
const mongoose = require("mongoose");

// Importation des routes
const userRoutes = require("./routes/UserRoutes");

// Création de l'application express
const app = express();

app.use(express.json());

// Pour gérer les problèmes de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Intercepte toutes les requêtes qui contiennent du JSON
// pour le mettre à disposition sur l'objet requête dans req.body
// remplace body parser
app.use(express.json());

const db = require("./models/indexModels");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// La route d'authentification
app.use("/", userRoutes);

// Exportation de app.js pour pouvoir y accéder depuis un autre fichier
module.exports = app;
