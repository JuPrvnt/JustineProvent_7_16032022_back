// Importation model de la base de donnée user
const User = require("../models/User");

// Signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
  User.then(() =>
    res.status(201).json({ message: "Utilisateur créé !" })
  ).catch((error) => res.status(500).json({ error }));
};
