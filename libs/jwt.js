const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const process = require("process");

dotenv.config();

const createToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { createToken, verifyToken };
