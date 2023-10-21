const imagekit = require("../libs/imageKit.js");
const path = require("path");
const Car = require("../services/carService.js");
const ApiError = require("../utils/apiError.js");

const findAllCar = async (req, res, next) => {
  try {
    const cars = await Car.findAll();

    res.status(200).json({
      status: "success",
      data: cars,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const findOneCarById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await Car.findByPk(id);
    if (!car) {
      next(new ApiError("Car not found", 404));
      return;
    }
    res.status(200).json({
      status: "success",
      data: car,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const createCar = async (req, res, next) => {
  const { name, price, category, available } = req.body;
  const file = req.file;
  const id = req.user.id;
  try {
    if (file) {
      const fileName = file.originalname;
      const extension = path.extname(fileName);
      const image = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      req.body.image = image.url;
    }
    const newCar = await Car.create({
      userId: id,
      name,
      available,
      price,
      category,
      image: req.body.image,
      lastUpdatedBy: id,
    });
    res.status(201).json({
      status: "created",
      data: newCar,
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCar = async (req, res, next) => {
  const { name, price, category, available } = req.body;
  const file = req.file;
  const carId = req.params.id;
  const userId = req.user.id;

  try {
    if (file) {
      const fileName = file.originalname;
      const extension = path.extname(fileName);
      const image = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      req.body.image = image.url;
    }
    const car = await Car.update(
      {
        name,
        price,
        category,
        image: req.body.image,
        available,
        lastUpdatedBy: userId,
      },
      carId
    );
    res.status(201).json({
      status: "success",
      data: car,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const deleteCarById = async (req, res, next) => {
  const carId = req.params.id;
  try {
    const deletedCar = await Car.deleteByPk(carId);
    res.status(201).json({
      status: "success",
      message: deletedCar,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = {
  findAllCar,
  findOneCarById,
  createCar,
  updateCar,
  deleteCarById,
};
