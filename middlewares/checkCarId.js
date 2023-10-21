const ApiError = require("../utils/apiError");
const Car = require("../services/carService");

const createValidation = async (req, res, next) => {
  const id = req.params.id;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      next(new ApiError(`Car with id ${id} not found`, 404));
      return;
    }
    next();
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = createValidation;
