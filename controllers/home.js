module.exports.Home = async (req, res, next) => {
    try {
        return res.render("home");
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.Admin_Signup = async (req, res, next) => {
    try {
        return res.render("admin_signup");
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.Admin_SignIn = async (req, res, next) => {
    try {
        return res.render("admin_signin");
    } catch (error) {
        console.log("Error");
        return;
    }
};

module.exports.LogOut = async (req, res, next) => {
    try {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie("user_sid");
            res.redirect("/");
        } else {
            res.redirect("/admin-sign-in");
        }
    } catch (error) {
        console.log("Error");
        return;
    }
};
