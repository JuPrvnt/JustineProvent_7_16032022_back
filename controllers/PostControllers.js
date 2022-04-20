// Importation model de la base de donnée post
const database = require("../models/indexModels");
const Post = database.post;
const User = database.user;

// Importation du module fs de node.js pour accéder au fichier du serveur
const fs = require("fs");

// Création d'une publication
exports.createPost = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["lastName", "firstName", "id"],
      where: { id: req.auth.userId },
    });
    if (user !== null) {
      let imageUrl;
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get("host")}/image/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }
      const post = await Post.create({
        userId: req.auth.userId,
        content: req.body.content,
        image: imageUrl,
      });
      res.status(201).json(post);
    } else {
      res.status(400).json({ error: "L'utilisateur n'existe pas !" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Affichage des publications
exports.getAllPosts = async (req, res, next) => {
  try {
    const post = await Post.findAll({
      attributes: ["id", "content", "image", "createdAt", "userId"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: database.user,
          as: "user",
          attributes: ["lastName", "firstName", "id"],
        },
      ],
    });
    return res.status(200).json(post);
  } catch (error) {
    return console.log(error);
  }
};

// res.status(500).json
