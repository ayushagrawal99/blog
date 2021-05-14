const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");

module.exports.Admin_SignIn = async (req, res, next) => {
    try {
        if (req.body.usertype === "admin") {
            console.log("ADMIN LOGIN...");
            const admin = await Admin.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });

            if (admin) {
                req.session.user = admin.dataValues;
                return res.redirect("/Admin/admin_dashboard?page=1");
            } else {
                res.status(400).json({ message: "This User is not exist" });
                return;
            }
        } else if (req.body.usertype === "user") {
            console.log("USER LOGIN...");
            const user = await User.findOne({
                where: {
                    email: req.body.email,
                    password: req.body.password,
                },
            });

            if (user) {
                req.session.user = user.dataValues;
                return res.redirect("/User/user_dashboard?page=1");
            } else {
                res.status(400).json({ message: "This User is not exist" });
                return;
            }
        }
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
