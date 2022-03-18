// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const userCtrl = require("../controllers/user");

// Route du endpoint signup
router.post("/signup");

router.get("/", userCtrl.coucou);
// Exportation du module router
module.exports = router;
