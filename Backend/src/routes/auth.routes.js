const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", registerUserController);

authRouter.post("/login", loginUserController);

authRouter.get("/logout", logoutUserController);

authRouter.get("/get-me", authMiddleware.authUser, getMeController);

module.exports = authRouter;