const Sequelize = require("sequelize");
const db = require("../config/database");
const User = require("./Users");

// CREATE TABLE BLOG ( id INT AUTO_INCREMENT PRIMARY_KEY, title VARCHAR(250) NOT NULL, category VARCHAR(250) NOT NULL, description VARCHAR(500) NOT NULL, image_url VARCHAR(500) NOT NULL, user_id INT,  FOREIGN_KEY (user_id) references users(id) )

const Blog = db.define("blog", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image_url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        // get() {
        //     return moment(this.getDataValue("createdAt")).format("DD/MM/YYYY");
        // },
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
});

User.hasMany(Blog, { foreignKey: "user_id" });
Blog.belongsTo(User, { foreignKey: "user_id" });

module.exports = Blog;
