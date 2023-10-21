const ApiError = require("../utils/apiError.js");

const checkRole = (...role) => {
  return (req, res, next) => {
    try {
      console.log(req.user.role);
      if (!role.includes(req.user.role)) {
        next(new ApiError(`Your role is not ${role.join(" and ")}`, 401));
        return;
      }
      const userRole = "superadmin" ? "admin" : "member";
      req.body.role = userRole;
      next();
    } catch (err) {
      console.log(typeof err);
      next(new ApiError("Internal server error", 500));
    }
  };
};

module.exports = checkRole;
