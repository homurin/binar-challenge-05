const userRepository = require("../repository/userRepository.js");

const findAll = async () => {
  try {
    const users = await userRepository.findAll();

    const data = users.map((user, i) => {
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        age: user.age,
        email: user.Auth.email,
      };
    });
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

const findByPk = async (primaryKey) => {
  try {
    const user = await userRepository.findByPk(primaryKey);
    if (user === null) {
      return null;
    }
    return {
      id: user.id,
      name: user.name,
      email: user.Auth.email,
      password: user.Auth.password,
      age: user.age,
      address: user.address,
      role: user.role,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const create = async (data) => {
  try {
    const { id, name, age, address, role, createdAt, updatedAt } =
      await userRepository.create(data);
    return {
      id,
      name,
      age,
      address,
      role,
      createdAt,
      updatedAt,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  findAll,
  findByPk,
  create,
};
