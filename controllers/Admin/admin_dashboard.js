const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");

module.exports.Admin_Dashboard = async (req, res, next) => {
    try {
        const user = await User.findAll();
        return res.render("admin_dashboard", {
            users: user,
        });
    } catch (error) {
        console.log("Error");
        return;
    }
};
