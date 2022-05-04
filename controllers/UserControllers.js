// Importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

// Importation du module de création de token
const jwt = require("jsonwebtoken");

// Importation du module fs de node.js pour accéder au fichier du serveur
const fs = require("fs");

// Importation model de la base de donnée user
const database = require("../models/indexModels");
const User = database.user;

require("dotenv").config();

// Signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = async (req, res, next) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  let userInfo = {
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    password: hash,
    isAdmin: req.body.isAdmin,
  };
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(409)
        .send({ error: "Vous êtes déjà inscrit, veuillez-vous connecter !" });
    } else {
      const user = await User.create(userInfo);
      res.status(201).json({
        userId: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        }),
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Login pour s'identifier
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          } else {
            res.status(200).json({
              userId: user.id,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                { userId: user.id, isAdmin: user.isAdmin },
                process.env.SECRET_TOKEN,
                {
                  expiresIn: "24h",
                }
              ),
            });
          }
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

// Déconnexion du profil
exports.logout = (req, res, next) => {
  res.status(200).send("L'utilisateur a été déconnecté !");
};

// Récupération des données du profil
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.auth.userId } })
    .then((user) =>
      res.status(200).json({
        lastName: `${user.lastName}`,
        firstName: `${user.firstName}`,
        email: `${user.email}`,
        isAdmin: `${user.isAdmin}`,
      })
    )
    .catch((error) => res.status(400).json(error));
};

// Modification des données du profil
exports.modifyUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.auth.userId } });

    user.lastName = req.body.lastName;
    user.firstName = req.body.firstName;
    user.email = req.body.email;

    try {
      user.save();
      return res.status(200).json({
        user: user,
        message: "Votre profil a bien été modifié !",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Suppression d'un profil
exports.deleteUser = (req, res, next) => {
  User.destroy({ where: { id: req.auth.userId } })
    .then(() =>
      res.status(200).json({ message: "L'utilisateur a été supprimé !" })
    )
    .catch((error) => res.status(500).json(error));
};
