const express = require("express");

const {
  signupController,
  loginController,
  forgetpasswordController,
  resetpasswordController,
} = require("../controller/authController");

const authRouter = express.Router();

authRouter.post("/signup", signupController);

authRouter.post("/login", loginController);

authRouter.patch("/forgetpassword",forgetpasswordController);

authRouter.patch("/resetpassword", resetpasswordController);

module.exports = authRouter;
