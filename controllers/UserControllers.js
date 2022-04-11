// Importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

// Importation du module de création de token
const jwt = require("jsonwebtoken");

// Importation du module fs de node.js pour accéder au fichier du serveur
const fs = require("fs");

// Importation model de la base de donnée user
const database = require("../models/indexModels");
const User = database.user;

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
        .status(403)
        .send({ error: "Vous êtes déjà inscrit, veuillez-vous connecter !" });
    } else {
      const user = await User.create(userInfo);
      res.status(200).json({
        _id: user.id,
        lastName: user.lastName,
        firstName: user.firstName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        }),
      });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
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
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id, isAdmin: user.isAdmin },
              process.env.SECRET_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  res.status(200).send("L'utilisateur a été déconnecté !");
};

// Récupération des données du profil
exports.getOneUser = (req, res, next) => {
  User.findOne({ _id: req.auth })
    .then((user) =>
      res.status(200).json({
        lastName: `${user.lastName}`,
        firstName: `${user.firstName}`,
        email: `${user.email}`,
        imageUrl: `${user.imageUrl}`,
        isAdmin: `${user.isAdmin}`,
      })
    )
    .catch((error) => res.status(404).json({ error }));
};

// Modification des données du profil
exports.modifyUser = (req, res, next) => {
  const user = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  User.update({ where: { _id: req.params.id } })
    .then(() =>
      res
        .status(200)
        .json({ message: "Les données utilisateurs ont été mises à jour" })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "Impossible de mettre à jour le profil" + error })
    );
};

/*
exports.modifyUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.body.id } });
    if (req.body.lastName) {
      user.lastName = req.body.lastName;
    }
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    try {
      user.save({});
      res.status(200).json({
        user: user,
        message: "Votre profil a bien été modifié !",
      });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Erreur lors de la mise à jour de votre profil !" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
*/
