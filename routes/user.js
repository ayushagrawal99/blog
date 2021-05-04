const express = require("express");
const router = express.Router();
const { sessionChecker } = require("../middlewares/authentication");

const User_Signup_controller = require("../controllers/User/signup");
router.post("/sign-up", sessionChecker, User_Signup_controller.User_SignUp);

const User_Dashboard_controller = require("../controllers/User/user_dashboard");
router.get(
    "/user_dashboard",
    sessionChecker,
    User_Dashboard_controller.User_Dashboard
);

module.exports = router;
