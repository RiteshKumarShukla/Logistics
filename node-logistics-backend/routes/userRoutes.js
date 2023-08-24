const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// User Registration
router.post("/signup", UserController.signup);

// User Login
router.post("/login", UserController.login);

module.exports = router;
