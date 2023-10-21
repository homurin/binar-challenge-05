const { Router } = require("express");
const upload = require("../middlewares/multer");
const authController = require("../controllers/authController.js");
const loginValidation = require("../middlewares/loginValidation.js");
const authentication = require("../middlewares/authentication.js");
const checkRole = require("../middlewares/checkRole.js");

const router = Router();

router
  .route("/login")
  .post(upload.single(""), loginValidation, authController.login);
router
  .route("/me")
  .get(
    authentication,
    checkRole("superadmin"),
    upload.single(""),
    authController.checkMe
  );

module.exports = router;
