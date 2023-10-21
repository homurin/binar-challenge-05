const { Router } = require("express");
const authController = require("../controllers/authController.js");
const loginValidation = require("../middlewares/loginValidation.js");
const authentication = require("../middlewares/authentication.js");
const checkRole = require("../middlewares/checkRole.js");

const router = Router();

router.route("/login").post(loginValidation, authController.login);
router
  .route("/me")
  .post(authentication, checkRole("superadmin"), authController.checkMe);

module.exports = router;
