const express = require("express");

const {
  allusersController,
  userController,
} = require("../controller/userController");

const { protectRoute } = require("../controller/authController");

const userRouter = express.Router();

userRouter.get("/users", protectRoute, allusersController);

userRouter.get("/user", protectRoute, userController);

module.exports = userRouter;
