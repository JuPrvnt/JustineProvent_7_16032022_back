// Connexion à la base de données
module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "post",
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataType.TEXT,
        allowNull: true,
      },
      image: {
        type: DataType.STRING,
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
    },
    {
      schema: "groupomania",
      freezeTableName: true,
      modelName: "post",
    }
  );
};
