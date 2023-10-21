const ApiError = require("../utils/apiError.js");
const { verifyToken } = require("../libs/jwt.js");
const User = require("../services/userService.js");

const authentication = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      next(new ApiError("Token is empty", 401));
      return;
    }
    const token = bearer.split("Bearer ")[1];
    const userData = verifyToken(token);

    if (!userData) {
      next(new ApiError("Invalid token", 400));
      return;
    }
    const isUserExist = await User.findByPk(userData.id);

    if (!isUserExist) {
      next(new ApiError("User not found", 404));
      return;
    }

    req.user = userData;
    next();
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = authentication;
