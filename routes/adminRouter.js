const { Router } = require("express");
const authController = require("../controllers/authController.js");
const registrationValidation = require("../middlewares/registrationValidation.js");
const loginValidation = require("../middlewares/loginValidation.js");
const checkRole = require("../middlewares/checkRole.js");
const authentication = require("../middlewares/authentication.js");

const router = Router();

router
  .route("/register")
  .post(
    authentication,
    checkRole("superadmin"),
    registrationValidation,
    authController.register
  );
router.route("/login").post(loginValidation, authController.login);
router
  .route("/me")
  .post(authentication, checkRole("superadmin"), authController.checkMe);

module.exports = router;
