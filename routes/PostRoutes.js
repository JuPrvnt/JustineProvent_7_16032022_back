// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const postCtrl = require("../controllers/PostControllers");

// Importation des middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Routes
router.post("/", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);

module.exports = router;
