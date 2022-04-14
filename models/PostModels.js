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
        type: DataType.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataType.BLOB,
        allowNull: true,
      },
    },
    {
      schema: "groupomania",
      freezeTableName: true,
    }
  );
};
