const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/dashboard", async (req, res) => {
    if (!req.user) {
        return res.redirect("/auth/login");
    }

    const user = req.user;
    res.render("pages/dashboard", { user });
});

router.get("/query/:data", async (req, res) => {
    const data = req.params.data;

    console.log(data);
    const response = axios.post("http://localhost/8080", { query: data });
    const answer = response.data;

    res.render("pages/dashboard", { data, answer });
});

module.exports = router;
