const ApiError = require("../utils/apiError");

const createValidation = async (req, res, next) => {
  try {
    const category = ["small", "medium", "large"];
    if (!category.includes(req.body.category)) {
      next(new ApiError(`Please insert valid category like ${category}`));
      return;
    }

    next();
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = createValidation;
