const { Router } = require("express");
const carController = require("../controllers/carController.js");
const authentication = require("../middlewares/authentication.js");
const checkRole = require("../middlewares/checkRole.js");
const upload = require("../middlewares/multer.js");
const createValidation = require("../middlewares/createValidation.js");

const router = Router();
router
  .route("/")
  .get(carController.findAllCar)
  .post(
    authentication,
    checkRole("superadmin", "admin"),
    upload.single("image"),
    createValidation,
    carController.createCar
  );
router
  .route("/:id")
  .get(carController.findOneCarById)
  .patch(
    authentication,
    checkRole("superadmin", "admin"),
    upload.single("image"),
    createValidation,
    carController.updateCar
  )
  .delete(
    authentication,
    checkRole("superadmin", "admin"),
    carController.deleteCarById
  );
module.exports = router;
