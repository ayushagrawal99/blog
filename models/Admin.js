const Sequelize = require("sequelize");
const db = require("../config/database");

const Admin = db.define("admin", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
    },
});

// // create all the defined tables in the specified database.
// db.sync()
//     .then(() =>
//         console.log(
//             "users table has been successfully created, if one doesn't exist"
//         )
//     )
//     .catch((error) => console.log("This error occured", error));

module.exports = Admin;
