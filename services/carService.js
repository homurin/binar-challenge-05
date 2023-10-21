const cars = require("../models/cars.js");
const carRepository = require("../repository/carRepository.js");
const userRepository = require("../repository/userRepository.js");

const findAll = async () => {
  try {
    const getCars = await carRepository.findAll();

    const cars = await Promise.all(
      getCars.map(async (car) => {
        const user = await userRepository.findByPk(car.lastUpdatedBy);
        return {
          id: car.id,
          name: car.name,
          price: car.price,
          available: car.available,
          category: car.category,
          image: car.image,
          createdBy: car.User.name,
          lastUpdatedBy: user.name,
          createdAt: car.createdAt,
          updatedAt: car.updatedAt,
        };
      })
    );
    return cars;
  } catch (err) {
    throw new Error(err);
  }
};

const findByPk = async (primaryKey) => {
  try {
    const car = await carRepository.findByPk(primaryKey);
    if (car === null) {
      return null;
    }
    const user = await userRepository.findByPk(car.lastUpdatedBy);

    return {
      id: car.id,
      name: car.name,
      price: car.price,
      available: car.available,
      category: car.category,
      image: car.image,
      createdBy: car.User.name,
      lastUpdatedBy: user.name,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    };
  } catch (err) {
    throw new Error(err);
  }
};

const create = async (data) => {
  try {
    const car = await carRepository.create(data);
    return car;
  } catch (err) {
    throw new Error(err);
  }
};

const update = async (data, primaryKey) => {
  try {
    const car = await carRepository.update(data, primaryKey);
    return car;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteByPk = async (primaryKey) => {
  try {
    const deletedCar = await carRepository.deleteByPk(primaryKey);
    return deletedCar;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  findAll,
  findByPk,
  create,
  update,
  deleteByPk,
};
