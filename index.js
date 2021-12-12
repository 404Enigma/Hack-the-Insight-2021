const express = require("express");
const ejs = require("ejs");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", require("./src/routes/index"));

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
