const Categogy = require("../../models/category");
const User = require("../../models/Users");

module.exports.Category = async (req, res, next) => {
    try {
        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        let ITEMS_PER_PAGE = 7;

        if (!user_data.categoryAccess) {
            ITEMS_PER_PAGE = 9;
        }

        let page = +req.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const limit = ITEMS_PER_PAGE;

        let category_data = await Categogy.findAll({
            offset,
            limit,
            order: [["id", "DESC"]],
        });
        let errors = [];

        let count = await Categogy.count();

        return res.render("category", {
            errors: errors,
            category: category_data,
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

module.exports.ADD_Category = async (req, res, next) => {
    try {
        let category_name = req.body.category.toLowerCase();

        let category_data = await Categogy.findOne({
            where: {
                category: category_name,
            },
        });

        if (!category_data) {
            await Categogy.create({
                category: category_name,
            });
        }

        return res.redirect("back");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.Update_Category = async (req, res, next) => {
    try {
        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        if (user_data.categoryAccess) {
            await Categogy.update(
                {
                    category: req.body.category_value,
                },
                {
                    where: {
                        id: req.body.category_id,
                    },
                }
            );
        }

        return res.redirect("back");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.Delete_Category = async (req, res, next) => {
    try {
        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        if (user_data.categoryAccess) {
            await Categogy.destroy({
                where: {
                    id: req.body.category_id,
                },
            });
        }
        return res.redirect("back");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
