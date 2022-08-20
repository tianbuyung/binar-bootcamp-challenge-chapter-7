"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserGame.hasOne(models.UserGameBiodata, {
        foreignKey: "user_id",
        as: "biodata",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.UserGame.hasMany(models.UserGameHistory, {
        foreignKey: "user_id",
        as: "history",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.UserGame.hasMany(models.UserGameRoom, {
        foreignKey: "user_id_owner",
        as: "ownerRoom",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      models.UserGame.hasMany(models.UserGameRoom, {
        foreignKey: "user_id_challenger",
        as: "challengerRoom",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  UserGame.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        unique: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        field: "user_id",
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        notNull: {
          msg: "Please enter your username",
        },
        unique: true,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
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
        type: DataTypes.STRING(60),
        notNull: {
          msg: "Please enter your password",
        },
        validate: {
          is: /^\$2[ayb]\$.{56}$/i,
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [["admin", "player"]],
        },
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
      modelName: "UserGame",
      tableName: "user_games",
      paranoid: true,
    }
  );
  return UserGame;
};
