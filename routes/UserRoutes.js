// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const userCtrl = require("../controllers/UserControllers");

// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Route du endpoint signup
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/:id", userCtrl.getOneUser);

// Exportation du module router
module.exports = router;
