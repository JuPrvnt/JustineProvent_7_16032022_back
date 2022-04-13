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
      imageUrl: {
        type: DataType.STRING,
        defaultValue:
          "https://www.flaticon.com/free-icon/user_1077012?term=person&page=1&position=16&related_id=1077012&origin=search&k=1649675418061",
      },
      isAdmin: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      schema: "Groupomania",
    }
  );
};
