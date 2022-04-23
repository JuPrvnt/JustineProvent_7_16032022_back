// Connexion à la base de données
module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "comment",
    {
      commentId: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataType.TEXT,
        allowNull: true,
      },
      userId: {
        type: DataType.UUID,
        required: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      postId: {
        type: DataType.UUID,
        required: false,
        references: {
          model: "post",
          key: "postId",
        },
      },
    },
    {
      schema: "groupomania",
      freezeTableName: true,
      modelName: "comment",
    }
  );
};
