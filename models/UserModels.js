// Connexion à la base de données
module.exports = (sequelize, DataType) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
      },
      lastName: {
        type: DataType.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      schema: "groupomania",
      freezeTableName: true,
      modelName: "user",
    }
  );
};
