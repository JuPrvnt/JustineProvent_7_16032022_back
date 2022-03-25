// Connexion à la base de données
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      schema: "Groupomania",
    }
  );
  return User;
};
