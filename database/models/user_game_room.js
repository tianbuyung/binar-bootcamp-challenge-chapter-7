"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGameRoom.belongsTo(models.UserGame, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.UserGameRoom.hasMany(models.UserGameHistory, {
        foreignKey: "room_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGameRoom.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      roomId: {
        type: DataTypes.STRING,
        field: "room_id",
      },
      userIdOwner: {
        type: DataTypes.UUID,
        field: "user_id_owner",
      },
      userIdChallenger: {
        type: DataTypes.UUID,
        field: "user_id_challenger",
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
      modelName: "UserGameRoom",
      tableName: "user_game_room",
      paranoid: true,
    }
  );
  return UserGameRoom;
};
