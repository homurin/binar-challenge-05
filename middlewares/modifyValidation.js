const ApiError = require("../utils/apiError");
const Car = require("../services/carService");

const modifyValidation = async (req, res, next) => {
  const carId = req.params.id;
  try {
    const isCarExist = await Car.findByPk(carId);
    if (!isCarExist) {
      next(new ApiError("Car not found", 404));
      return;
    }
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

module.exports = modifyValidation;
