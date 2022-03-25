// Importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

// Importation du module de création de token
const jwt = require("jsonwebtoken");

// Importation model de la base de donnée user
const database = require("../models/indexModels");
const User = database.user;

// Signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
  const userToCreate = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: req.body.password,
  };
  User.create(userToCreate);
  res
    .status(201)
    .json({ message: "Utilisateur créé !" })
    .catch((error) => res.status(500).json({ error }));
};
