"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      room_id: {
        type: Sequelize.STRING,
        unique: true,
      },
      user_id_owner: {
        type: Sequelize.UUID,
        references: {
          model: "user_games",
          key: "user_id",
          as: "userId",
        },
      },
      user_id_challenger: {
        type: Sequelize.UUID,
        references: {
          model: "user_games",
          key: "user_id",
          as: "userId",
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
    await queryInterface.dropTable("user_game_rooms");
  },
};
