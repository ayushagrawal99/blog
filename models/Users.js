const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
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
    readOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    updateOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    deleteOnly: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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

module.exports = User;
