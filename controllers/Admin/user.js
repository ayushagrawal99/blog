module.exports.User_Signup = async (req, res, next) => {
    try {
        return res.render("user_signup");
    } catch (error) {
        console.log("Error");
        return;
    }
};
