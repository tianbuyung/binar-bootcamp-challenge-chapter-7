"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_game_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      room_id: {
        type: Sequelize.STRING,
        references: {
          model: "user_game_rooms",
          key: "room_id",
          as: "roomId",
        },
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      player_choice: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      player_step: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      result: {
        type: Sequelize.STRING,
      },
      player_score: {
        type: Sequelize.INTEGER,
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
