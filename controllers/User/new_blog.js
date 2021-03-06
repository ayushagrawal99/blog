const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");
const Blog = require("../../models/Blog");
const Category = require("../../models/category");

module.exports.New_Blog = async (req, res, next) => {
    try {
        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        const category_data = await Category.findAll();

        return res.render("new_blog", {
            user: user_data,
            categories: category_data,
        });
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.My_Blog = async (req, res, next) => {
    try {
        const ITEMS_PER_PAGE = 8;
        let page = +req.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const limit = ITEMS_PER_PAGE;

        const blogs = await Blog.findAll({
            limit,
            offset,
            order: [["id", "DESC"]],
            where: {
                user_id: req.session.user.id,
            },
        });

        const ALL_Blog = await Blog.findAll({
            where: {
                user_id: req.session.user.id,
            },
        });

        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        const count = ALL_Blog.length;

        return res.render("my_blogs", {
            blogs: blogs,
            user: user_data,
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

module.exports.Create_Blog = async (req, res, next) => {
    try {
        await Blog.create({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            image_url: req.file.filename,
            user_id: req.session.user.id,
        });

        return res.redirect("/User/user_dashboard?page=1");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
