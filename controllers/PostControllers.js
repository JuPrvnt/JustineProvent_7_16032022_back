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
        imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        imageUrl = null;
      }
      const postInfo = await Post.create({
        userId: req.auth.userId,
        content: req.body.content,
        file: imageUrl,
      });
      res.status(201).json({ message: "Publication créée !" });
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
    Post.findAll({
      attributes: ["id", "content", "file", "createdAt", "userId"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["lastName", "firstName", "id"],
        },
      ],
    }).then((post) => {
      console.log(post);
      res.json(post);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
