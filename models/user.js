"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Auth, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
      this.hasMany(models.Cars, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM(["superadmin", "admin", "member"]),
        defaultValue: "member",
      },
      age: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
