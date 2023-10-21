const User = require("../services/userService.js");
const Auth = require("../services/authService.js");
const { createToken } = require("../libs/jwt.js");
const ApiError = "../utils/apiError.js";
const bcrypt = require("../libs/bcrypt.js");

const register = async (req, res, next) => {
  try {
    const { name, age, address, role, email, password, confirmPassword } =
      req.body;
    const user = await User.create({ name, role, age, address });
    const auth = await Auth.create({
      userId: user.id,
      email,
      password,
      confirmPassword,
    });

    res.status(201).json({
      status: "created",
      data: { user, auth },
    });
  } catch (err) {
    next(new ApiError("Internal server error", 500));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("email", email);
    const auth = await Auth.findOneByEmail(email);

    const isPasswordCorrect = await bcrypt.comparePassword(
      password,
      auth.password
    );

    if (!isPasswordCorrect) {
      next(new ApiError("Invalid email and password", 400));
      return;
    }

    const payload = {
      id: auth.id,
      email: auth.email,
      name: auth.name,
      role: auth.role,
    };
    console.log(payload);
    const token = createToken(payload);

    res.status(200).json({
      status: "success",
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

const checkMe = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findByPk(id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError("Internal server error", 500));
  }
};

module.exports = { register, login, checkMe };
