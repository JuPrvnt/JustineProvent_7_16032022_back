// Importation model de la base de donnée post
const database = require("../models/indexModels");
const Comment = database.comment;
const Post = database.post;
const User = database.user;

// Création de commentaires
exports.createComment = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: ["lastName", "firstName", "id"],
      where: { id: req.auth.userId },
    });
    const comment = await Comment.create({
      content: req.body.content,
      userId: req.auth.userId,
      //postId: req.body.postId,
    });
    res.status(201).json(comment);
  } catch (error) {
    return res.status(500).send(error);
  }
};

// Affichage des commentaires
exports.getAllComments = async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      attributes: ["commentId", "content", "createdAt", "userId"],
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: database.user,
          as: "user",
          attributes: ["lastName", "firstName", "id"],
        },
      ],
    });
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json;
  }
};
