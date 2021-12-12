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

router.post("/query", async (req, res) => {
    const { query } = req.body;

    console.log(query);

    res.send("success");
});

module.exports = router;
