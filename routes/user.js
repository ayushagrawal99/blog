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

const Create_Blog_controller = require("../controllers/User/new_blog");
router.get("/new_blog", sessionChecker, Create_Blog_controller.New_Blog);
router.get("/my_blogs", sessionChecker, Create_Blog_controller.My_Blog);
router.post("/create_blog", sessionChecker, Create_Blog_controller.Create_Blog);

const Category_controller = require("../controllers/User/category");
router.get("/category", Category_controller.Category);
router.post("/add-category", Category_controller.ADD_Category);
router.post("/update-category", Category_controller.Update_Category);
router.post("/delete-category", Category_controller.Delete_Category);

const Update_Blog_controller = require("../controllers/User/update_blog");
router.post("/update-blog", Update_Blog_controller.Update_Blog);
router.post("/blog_update", Update_Blog_controller.Blog_Update);

const Delete_Blog_controller = require("../controllers/User/delete_blog");
router.post("/delete-blog", Delete_Blog_controller.Delete_Blog);

const Search_Blog_controller = require("../controllers/User/search");
router.post("/search-blog", Search_Blog_controller.Search);

module.exports = router;
