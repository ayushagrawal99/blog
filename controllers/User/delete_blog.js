const Blog = require("../../models/Blog");

module.exports.Delete_Blog = async (req, res, next) => {
    try {
        await Blog.destroy({
            where: {
                id: req.body.id,
            },
        });
        return res.redirect("back");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
