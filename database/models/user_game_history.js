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
      models.UserGameHistory.belongsTo(models.UserGameRoom, {
        foreignKey: "room_id",
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
      roomId: {
        type: DataTypes.STRING,
        field: "room_id",
      },
      userId: {
        type: DataTypes.UUID,
        field: "user_id",
      },
      playerChoice: {
        type: DataTypes.STRING,
        field: "player_choice",
      },
      playerStep: {
        type: DataTypes.STRING,
        field: "player_step",
      },
      result: {
        type: DataTypes.STRING,
      },
      playerScore: {
        type: DataTypes.INTEGER,
        field: "player_score",
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
