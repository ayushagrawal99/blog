const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/home");
router.get("/", home_controller.Home);
router.get("/admin-sign-up", home_controller.Admin_Signup);
router.get("/admin-sign-in", home_controller.Admin_SignIn);

const User_controller = require("../controllers/Admin/user");
router.get("/user-sign-up", User_controller.User_Signup);

router.get("/log-out", home_controller.LogOut);

router.use("/Admin", require("./admin"));
router.use("/User", require("./user"));

module.exports = router;
