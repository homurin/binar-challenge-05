"use strict";
const bcrypt = require("bcrypt");
const { User, Auth } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    try {
      const userData = {
        name: "Peter Griffin",
        role: "superadmin",
        age: 35,
        address: "California",
      };
      const user = await User.create(userData);
      const hashedPassword = await bcrypt.hash("griffin123456", 10);
      const authData = {
        userId: user.id,
        email: "peter@gmail.com",
        password: hashedPassword,
      };
      await Auth.create(authData);
    } catch (err) {
      console.log(err);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
