const path = require("path");
const express = require("express");
const app = express();
const db = require("./config/database");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const moment = require("moment");

app.locals.fromNow = function (date) {
    return moment(date).fromNow();
};

app.locals.format = function (date) {
    return moment(date).format("DD-MM-YYYY");
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/images"));
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") +
                "-" +
                file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("file"));

app.use(express.static("./assets"));
app.use("/images", express.static(__dirname + "/images"));

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
            expires: 6000000,
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
    .catch((err) => console.log("error on db sync"));

// server
app.listen(3000, () => {
    console.log("Server is running..");
});
