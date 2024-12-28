const express = require("express");
const router = express.Router();
// Change the import path or filename to match your actual file location
const captionController = require("../controller/caption.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be at least 3 characters long"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color should be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate should be at least 3 characters long"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity should be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid Vehicle Type"),
  ],
  captionController.registerCaption
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password should be at least 8 characters long"),
  ],
  captionController.logincaptain
);

router.get("/profile",authMiddleware.authCaptain,captionController.getCaptainProfile);
router.get("/logout",authMiddleware.authCaptain,captionController.logoutCaptain);
module.exports = router;
