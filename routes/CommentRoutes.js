// Importation des plugins
const express = require("express");

// Lancement de la fonction Router()
const router = express.Router();

// Importation du controlleur user
const commentCtrl = require("../controllers/CommentControllers");

// Importation des middlewares
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// Routes
router.post("/", auth, multer, commentCtrl.createComment);
router.get("/", auth, multer, commentCtrl.getAllComments);
router.delete("/", auth, commentCtrl.deleteComment);

module.exports = router;
