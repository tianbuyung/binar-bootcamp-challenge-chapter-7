"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_rooms", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      user_id_player_one: {
        type: Sequelize.UUID,
        references: {
          model: "user_games",
          key: "user_id",
          as: "userId",
        },
      },
      user_id_player_two: {
        type: Sequelize.UUID,
        references: {
          model: "user_games",
          key: "user_id",
          as: "userId",
        },
      },
      room_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true,
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
