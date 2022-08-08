"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGameHistory.belongsTo(models.UserGame, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGameHistory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userIdPlayerOne: {
        type: DataTypes.UUID,
        field: "user_id_player_one",
      },
      userIdPlayerOne: {
        type: DataTypes.UUID,
        field: "user_id_player_two",
      },
      roomId: {
        type: DataTypes.STRING,
        field: "room_id",
      },
      playerOneChoice: {
        type: DataTypes.STRING,
        field: "player_one_choice",
      },
      playerOneScore: {
        type: DataTypes.INTEGER,
        field: "player_one_score",
      },
      playerTwoChoice: {
        type: DataTypes.STRING,
        field: "player_two_choice",
      },
      playerTwoScore: {
        type: DataTypes.INTEGER,
        field: "player_two_score",
      },
      whoIsWin: {
        type: DataTypes.STRING,
        field: "who_is_win",
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().getTime(),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: new Date().getTime(),
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "UserGameHistory",
      tableName: "user_game_histories",
      paranoid: true,
    }
  );
  return UserGameHistory;
};
