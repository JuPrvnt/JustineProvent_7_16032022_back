// Importation model de la base de donnée post
const database = require("../models/indexModels");
const Post = database.post;

// Importation du module fs de node.js pour accéder au fichier du serveur
const fs = require("fs");

// Créer une publication
exports.createPost = (req, res, next) => {
  let postInfo = {
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  };
  Post.create(postInfo)
    .then(() => res.status(201).json({ message: "Publication créée !" }))
    .catch((error) => res.status(500).json(error));
};
