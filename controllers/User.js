// Importation model de la base de donnée user
const database = require("../models");
const User = database.user;

// Signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
  User.then(() =>
    res.status(201).json({ message: "Utilisateur créé !" })
  ).catch((error) => res.status(500).json({ error }));
};

exports.coucou = (req, res, next) => {
  const userToCreate = {
    firstName: "truc",
    lastName: "truc",
    email: "truc",
    birthday: new Date(),
    isAdmin: true,
  };
  User.create(userToCreate);
  res.status(201).json({ message: "Coucou" });
};
