const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

const hashPassword = async (password) => {
  try {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (err) {
    throw new Error(err);
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { hashPassword, comparePassword };
