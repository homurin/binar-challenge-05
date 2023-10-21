"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.FLOAT,
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM(["small", "medium", "large"]),
        defaultValue: "small",
      },
      image: {
        type: Sequelize.STRING,
        defaultValue:
          "https://akcdn.detik.net.id/visual/2019/09/06/4cdd6470-59c4-4092-8664-0adaaa0eeebf_169.jpeg?w=650",
      },
      lastUpdatedBy: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cars");
  },
};
