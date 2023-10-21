const { User } = require("../models");

module.exports = {
  findAll() {
    return User.findAll();
  },
  findOne(query) {
    return User.findOne(query);
  },
  findByPk(primaryKey) {
    return User.findByPk(primaryKey, { include: ["Auth"] });
  },

  create(data) {
    return User.create(data);
  },
};
