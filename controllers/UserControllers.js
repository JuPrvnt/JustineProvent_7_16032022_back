// Importation de bcrypt pour hasher le password
const bcrypt = require("bcrypt");

// Importation du module de création de token
const jwt = require("jsonwebtoken");

// Importation model de la base de donnée user
const database = require("../models/indexModels");
const User = database.user;

// Signup pour enregistrer le nouvel utilisateur dans la base de donnée
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userToCreate = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
      };
      User.create(userToCreate);
      res
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
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
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.UpdateProfil = (req, res, next) => {
  const userProfil = req.file
    ? {
        ...JSON.parse(req.body.user),
      }
    : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...userProfil, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Profil modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};
