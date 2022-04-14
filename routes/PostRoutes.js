// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const postCtrl = require("../controllers/PostControllers");

// Importation du middleware d'authentification
const auth = require("../middleware/auth");

// Routes
router.post("/", postCtrl.createPost);

module.exports = router;
