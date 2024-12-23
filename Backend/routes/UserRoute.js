const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user.controller"); // Ensure this import path is correct

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 }) // Fixed minimum length to match the error message
      .withMessage("Password should be at least 8 characters long"),
  ],
  userController.registerUser // Ensure this function is defined
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password should be at least 5 characters long"),
  ],
  userController.loginUser // Ensure this function is defined
);

module.exports = router;