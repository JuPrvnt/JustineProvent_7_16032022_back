// Importation du module de création de token
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Exportation de la fonction du middleware
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    console.log({ error: error | "Requête non authentifiée !" });
  }
};

/*
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
      if (err) {
        return res.status(403).send("Utilisateur non autorisé !");
      }
      req.userId = user.userId;

      next();
    });
  } catch (error) {
    res.status(400).send("Token invalide !");
  }
};
*/
