const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/dashboard", async (req, res) => {
    // if (!req.user) {
    //     return res.redirect("/auth/login");
    // }

    const user = {
        user_id: '114892971548466360252',
        email: 'rahul2002aug@gmail.com',
        name: 'Rahul Mansharamani',
        thumbnail: 'https://lh3.googleusercontent.com/a-/AOh14GhQOQbEkcPdEk36bvlocY5rtUS_Cd7PiId0eOa-1g=s96-c'
      }

    //const user = req.user;
    res.render("pages/dashboard", { user });
});

router.get("/query/:data", async (req, res) => {
    const data = req.params.data;

    console.log(data);
    const response = axios.post("http://localhost/8080/api/", { query: data });
    const answer = response.data;
    console.log(answer)
   res.render("pages/dashboard", { data, answer });

    
});

module.exports = router;
