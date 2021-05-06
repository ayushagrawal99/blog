const db = require("../../config/database");
const User = require("../../models/Users");
const Blog = require("../../models/Blog");

module.exports.User_Dashboard = async (req, res, next) => {
    try {
        const ITEMS_PER_PAGE = 8;
        let page = +req.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const limit = ITEMS_PER_PAGE;

        const blogs = await Blog.findAll({
            limit,
            offset,
            order: [["id", "DESC"]],
        });

        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        const count = await Blog.count();

        return res.render("user_dashboard", {
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
