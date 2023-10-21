const { Router } = require("express");
const checkRole = require("../middlewares/checkRole");
const authentication = require("../middlewares/authentication");
const upload = require("../middlewares/multer");
const authController = require("../controllers/authController.js");
const registrationValidation = require("../middlewares/registrationValidation.js");
const loginValidation = require("../middlewares/loginValidation.js");

const router = Router();

router
  .route("/register")
  .post(upload.single(), registrationValidation, authController.register);
router.route("/login").post(loginValidation, authController.login);
router
  .route("/me")
  .get(authentication, checkRole("member"), authController.checkMe);

module.exports = router;
