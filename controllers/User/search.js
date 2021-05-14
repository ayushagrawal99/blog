const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");
const Blog = require("../../models/Blog");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.Search = async (req, res, next) => {
    try {
        if (req.query.searchby === "category") {
            if (req.body.place === "home") {
                const ITEMS_PER_PAGE = 8;
                let page = +req.query.page || 1;
                const offset = (page - 1) * ITEMS_PER_PAGE;
                const limit = ITEMS_PER_PAGE;

                const search_blog = await Blog.findAll({
                    limit,
                    offset,
                    order: [["id", "DESC"]],
                    where: {
                        category: {
                            [Op.like]: "%" + req.body.category + "%",
                        },
                    },
                });

                const count = await Blog.count();

                return res.render("home", {
                    blogs: search_blog,
                    currentPage: page,
                    hasNextPage: ITEMS_PER_PAGE * page < count,
                    hasPreviousPage: page > 1,
                    nextPage: page + 1,
                    previousPage: page - 1,
                    lastPage: Math.ceil(count / ITEMS_PER_PAGE),
                });
            }

            if (req.body.place === "user_dashboard") {
                const user_data = await User.findOne({
                    where: {
                        id: req.session.user.id,
                    },
                });

                return res.render("user_dashboard", {
                    blogs: search_blog,
                    user: user_data,
                });
            }
        } else if (req.query.searchby === "date") {
            let date = new Date(req.body.date);
            console.log(" DATE ", date);

            let search_blog = await Blog.findAll({
                where: {
                    createdAt: date,
                },
            });

            console.log(" RESULT ", search_blog);

            return res.render("home", {
                blogs: search_blog,
            });
        }
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
