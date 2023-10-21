const validator = require("validator");
const ApiError = require("../utils/apiError.js");
const { findOneByEmail } = require("../services/authService.js");

const loginValidation = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  try {
    const isEmailValid = validator.isEmail(email);
    if (!isEmailValid) {
      next(new ApiError("Invalid email format", 400));
    }

    const isEmailExist = await findOneByEmail(email);
    if (!isEmailExist) {
      next(new ApiError("Email not registered", 400));
    }

    if (password.length < 8) {
      next(new ApiError("Minimum password length is 8", 400));
    }

    if (password !== confirmPassword) {
      next(new ApiError("Password not match", 400));
    }

    next();
  } catch (err) {
    next(new ApiError("Middleware registration error", 500));
  }
};

module.exports = loginValidation;
