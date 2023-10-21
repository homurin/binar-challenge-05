const { Cars } = require("../models");

module.exports = {
  findAll() {
    return Cars.findAll({ include: ["User"], order: [["id", "ASC"]] });
  },
  findByPk(primaryKey) {
    return Cars.findByPk(primaryKey, { include: ["User"] });
  },
  findOne(query) {
    return Cars.findOne(query, { include: ["User"] });
  },
  create(data) {
    return Cars.create(data, { include: ["User"] });
  },
  updateByPk(data, primaryKey) {
    return Cars.update(data, {
      where: {
        id: primaryKey,
      },
    });
  },
  update(data, primaryKey) {
    return Cars.update(data, {
      where: {
        id: primaryKey,
      },
    });
  },
  deleteByPk(primaryKey) {
    return Cars.destroy({
      where: {
        id: primaryKey,
      },
    });
  },
};
