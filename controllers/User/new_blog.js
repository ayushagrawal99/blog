const db = require("../../config/database");
const Admin = require("../../models/Admin");
const User = require("../../models/Users");

module.exports.Create_Blog = async (req, res, next) => {
    try {
        console.log("FORM ----- DATA", req.body);
        console.log("FORM ----- FILE", req.file);
        return res.render("user_dashboard");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
