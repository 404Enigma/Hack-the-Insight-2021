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

module.exports = router;
