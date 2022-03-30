// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const userCtrl = require("../controllers/UserControllers");

// Route du endpoint signup
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

// Exportation du module router
module.exports = router;
