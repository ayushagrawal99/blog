const db = require("../../config/database");
const User = require("../../models/Users");

module.exports.User_SignUp = async (req, res, next) => {
    try {
        if (req.body.password === req.body.confirm_password) {
            const user = await User.findAll({
                where: {
                    email: req.body.email,
                },
            });

            if (user.length !== 0) {
                res.status(400).json({ message: "This User is already exist" });
                return;
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                });

                return res.redirect("/Admin/admin_dashboard?page=1");
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
