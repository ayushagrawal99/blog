const Blog = require("../../models/Blog");
const User = require("../../models/Users");
const Category = require("../../models/category");

module.exports.Update_Blog = async (req, res, next) => {
    try {
        let blog_data = await Blog.findOne({
            where: {
                id: req.body.id,
            },
        });

        const user_data = await User.findOne({
            where: {
                id: req.session.user.id,
            },
        });

        const category_data = await Category.findAll();

        return res.render("update_blog", {
            user: user_data,
            blog: blog_data,
            categories: category_data,
        });
    } catch (error) {
        console.log("Error", error);
        return;
    }
};

module.exports.Blog_Update = async (req, res, next) => {
    try {
        await Blog.update(
            {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                image_url: req.file.filename,
                user_id: req.session.user.id,
            },
            {
                where: {
                    id: req.body.id,
                },
            }
        );

        return res.redirect("/User/user_dashboard");
    } catch (error) {
        console.log("Error", error);
        return;
    }
};
