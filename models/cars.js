"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: "false",
        },
      });
    }
  }
  Cars.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,

        allowNull: false,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM(["small", "medium", "large"]),
        defaultValue: "small",
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        defaultValue:
          "https://akcdn.detik.net.id/visual/2019/09/06/4cdd6470-59c4-4092-8664-0adaaa0eeebf_169.jpeg?w=650",
      },
      lastUpdatedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
