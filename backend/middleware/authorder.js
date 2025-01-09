const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust path as necessary

// Middleware to authenticate and extract user ID
module.exports = function (req, res, next) {
    const token = req.headers["Authorization"]; // Extract token from Authorization header
    console.log("Token:", token);
    if (!token) return res.sendStatus(401); // Unauthorized if no token

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden if token is invalid
        req.userId = user.id; // Attach user ID to request
        next();
    });
};
