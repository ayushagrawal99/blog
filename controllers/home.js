const Blog = require("../models/Blog");
const { Sequelize } = require("sequelize");

module.exports.Home = async (req, res, next) => {
    try {
        const ITEMS_PER_PAGE = 8;
        let page = +req.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const limit = ITEMS_PER_PAGE;

        // const all_blog = await Blog.findAll({
        //     attributes: [
        //         "id",
        //         "title",
        //         "category",
        //         "description",
        //         "image_url",
        //         "user_id",
        //         "updatedAt",
        //         [
        //             Sequelize.fn(
        //                 "to_date",
        //                 Sequelize.col("createdAt"),
        //                 "YYYY-MM-DD"
        //             ),
        //             "createdAt",
        //         ],
        //     ],
        //     limit,
        //     offset,
        //     order: [["id", "DESC"]],
        // });

        // console.log(all_blog);

        const all_blog = await Blog.findAll({
            limit,
            offset,
            order: [["id", "DESC"]],
        });

        // console.log(all_blog);

        const count = await Blog.count();

        return res.render("home", {
            blogs: all_blog,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < count,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(count / ITEMS_PER_PAGE),
        });
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.Admin_Signup = async (req, res, next) => {
    try {
        return res.render("admin_signup");
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.Admin_SignIn = async (req, res, next) => {
    try {
        return res.render("admin_signin");
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.LogOut = async (req, res, next) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie("user_sid");
            res.redirect("/home?page=1");
        } else {
            res.redirect("/admin-sign-in");
        }
    } catch (error) {
        console.log("Error");
        return;
    }
};

// https://cdn.pixabay.com/photo/2020/12/25/11/57/flamingos-5859192_960_720.jpg
