"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGameBiodata.belongsTo(models.UserGame, {
        foreignKey: "user_id",
        as: "biodata",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGameBiodata.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      userId: {
        type: DataTypes.UUID,
        unique: true,
        field: "user_id",
      },
      firstName: { type: DataTypes.STRING, field: "first_name" },
      lastName: { type: DataTypes.STRING, field: "last_name" },
      address: DataTypes.STRING,
      phoneNumber: { type: DataTypes.STRING, field: "phone_number" },
      bio: DataTypes.STRING,
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
      modelName: "UserGameBiodata",
      tableName: "user_game_biodata",
      paranoid: true,
    }
  );
  return UserGameBiodata;
};
