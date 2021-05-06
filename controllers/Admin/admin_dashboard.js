const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");

module.exports.Admin_Dashboard = async (req, res, next) => {
    try {
        const ITEMS_PER_PAGE = 7;
        let page = +req.query.page || 1;
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const limit = ITEMS_PER_PAGE;

        const user = await User.findAll({
            limit,
            offset,
            order: [["id", "DESC"]],
        });

        const count = await User.count();

        return res.render("admin_dashboard", {
            users: user,
            currentPage: page,
            hasNextPage: ITEMS_PER_PAGE * page < count,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(count / ITEMS_PER_PAGE),
        });
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.Update_User = async (req, res, next) => {
    try {
        let user_data = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        await User.update(
            {
                readOnly: req.body.readOnly ? true : false,
                updateOnly: req.body.updateOnly ? true : false,
                deleteOnly: req.body.deleteOnly ? true : false,
            },
            { where: { email: req.body.email }, returning: true }
        );

        return res.redirect("back");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
