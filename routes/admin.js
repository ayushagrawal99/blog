const express = require("express");
const router = express.Router();
const { sessionChecker } = require("../middlewares/authentication");

const Admin_Signup_controller = require("../controllers/Admin/signup");
router.post("/sign-up", Admin_Signup_controller.Admin_SignUp);

const Admin_Signin_controller = require("../controllers/Admin/signin");
router.post("/sign-in", Admin_Signin_controller.Admin_SignIn);

const Admin_Dashboard_controller = require("../controllers/Admin/admin_dashboard");
router.get(
    "/admin_dashboard",
    sessionChecker,
    Admin_Dashboard_controller.Admin_Dashboard
);

module.exports = router;
