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
      const user = new User({
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => console.log({ message: "Utilisateur créé !" }))
        .catch((error) => console.log({ error }));
    })
    .catch((error) => console.log({ error }));
};

// Login pour s'identifier
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return console.log({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return console.log({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => console.log({ error }));
    })
    .catch((error) => console.log({ error }));
};

exports.logout = (req, res, next) => {
  res
    .clearCookie("access_token")
    .status(200)
    .send("L'utilisateur a été déconnecté");
};
