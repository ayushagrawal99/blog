const db = require("../../config/database");
const Admin = require("../../models/Admin");

module.exports.Admin_SignUp = async (req, res, next) => {
    try {
        if (req.body.password === req.body.confirm_password) {
            const admin = await Admin.findAll({
                where: {
                    email: req.body.email,
                },
            });

            if (admin.length !== 0) {
                res.status(400).json({ message: "This User is already exist" });
                return;
            } else {
                Admin.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });

                return res.redirect("/admin-sign-in");
            }
        } else {
            res.status(400).json({ message: "Password does not match" });
            return;
        }
    } catch (error) {
        console.log("Error");
        return;
    }
};
