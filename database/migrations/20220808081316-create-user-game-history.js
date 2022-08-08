"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
        type: Sequelize.STRING,
        references: {
          model: "user_game_rooms",
          key: "room_id",
          as: "roomId",
        },
      },
      player_one_choice: {
        type: Sequelize.STRING,
      },
      player_one_score: {
        type: Sequelize.INTEGER,
      },
      player_two_choice: {
        type: Sequelize.STRING,
      },
      player_two_score: {
        type: Sequelize.INTEGER,
      },
      who_is_win: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("user_game_histories");
  },
};
