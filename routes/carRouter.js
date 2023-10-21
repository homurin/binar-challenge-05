const { Router } = require("express");
const carController = require("../controllers/carController.js");
const authentication = require("../middlewares/authentication.js");
const checkRole = require("../middlewares/checkRole.js");
const upload = require("../middlewares/multer.js");
const carValidation = require("../middlewares/carValidation.js");
const checkCarId = require("../middlewares/checkCarId.js");

const router = Router();
router
  .route("/")
  .get(carController.findAllCar)
  .post(
    authentication,
    checkRole("superadmin", "admin"),
    upload.single("image"),
    carValidation,
    carController.createCar
  );
router
  .route("/:id")
  .get(checkCarId, carController.findOneCarById)
  .patch(
    authentication,
    checkRole("superadmin", "admin"),
    checkCarId,
    upload.single("image"),
    carValidation,
    carController.updateCar
  )
  .delete(
    checkCarId,
    authentication,
    checkRole("superadmin", "admin"),
    carController.deleteCarById
  );
module.exports = router;
