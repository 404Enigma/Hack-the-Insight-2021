const express = require("express");

const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const passport = require("passport");
const passportSetup = require("./src/config/passport_setup");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const keys = require("./src/config/keys");

app.use("/", express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
    cookieSession({
        maxAge: 7 * 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey],
    })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./src/routes/index"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
