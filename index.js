const express = require("express");
const app = express();
const db = require("./config/database");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("./assets"));

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
    session({
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
        },
    })
);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie("user_sid");
    }
    next();
});

// DB Connection
db.authenticate()
    .then(() => console.log("Database connected..."))
    .catch((err) => console.log("Error :", err));

app.use("/", require("./routes/index"));

// For create tables
db.sync()
    .then((result) => console.log("Working"))
    .catch((err) => console.log("error"));

// server
app.listen(3000, () => {
    console.log("Server is running..");
});
