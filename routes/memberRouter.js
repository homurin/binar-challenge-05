const { Router } = require("express");
const authController = require("../controllers/authController.js");
const registrationValidation = require("../middlewares/registrationValidation.js");
const loginValidation = require("../middlewares/loginValidation.js");

const router = Router();

router.route("/register").post(registrationValidation, authController.register);
router.route("/login").post(loginValidation, authController.login);

module.exports = router;
