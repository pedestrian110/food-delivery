const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "User already exists." });
        user = new User({username, password});
        user = await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
        return res.json({ user });
        
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
    
    
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;  
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(400).send("User not exists");
        }
        const isMatch = user.password === password;
        if (!isMatch) {
            return res.status(400).send("Invalid Password");
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
        return res.json({ token });
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
});

module.exports = router;