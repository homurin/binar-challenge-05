const { Auth } = require("../models");

module.exports = {
  create(data) {
    return Auth.create(data);
  },
  findOne(query) {
    return Auth.findOne(query);
  },
  findOneByEmail(email) {
    return Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    });
  },
};
