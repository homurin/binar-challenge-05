const authRepository = require("../repository/authRepository.js");
const bcrypt = require("../libs/bcrypt.js");

const create = async (data) => {
  const { userId, email, password } = data;
  try {
    const hashedPassword = await bcrypt.hashPassword(password);
    const auth = await authRepository.create({
      ...data,
      password: hashedPassword,
    });
    return {
      id: auth.id,
      userId,
      email,
      password: hashedPassword,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const findOneByEmail = async (email) => {
  try {
    const auth = await authRepository.findOneByEmail(email);
    if (auth === null) {
      return null;
    }
    return {
      id: auth.User.id,
      name: auth.User.name,
      email: auth.email,
      password: auth.password,
      age: auth.User.age,
      address: auth.User.address,
      role: auth.User.role,
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { create, findOneByEmail };
