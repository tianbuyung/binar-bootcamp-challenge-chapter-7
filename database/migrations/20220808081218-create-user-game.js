"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_games", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        notNull: {
          msg: "Please enter your username",
        },
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        notNull: {
          msg: "Please enter your email",
        },
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(60),
        notNull: {
          msg: "Please enter your password",
        },
        validate: {
          is: /^\$2[ayb]\$.{56}$/i,
        },
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notIn: [["admin", "player"]],
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user_games");
  },
};
