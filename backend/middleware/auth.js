const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header:", authHeader);
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  const token = authHeader;
  console.log("Token:", token);
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    console.log("auth middleware ke andar try block me aaya");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden if token is invalid
            req.userId = user.id; // Attach user ID to request
            next();
        });
  } catch (ex) {
    console.error("Token Verification Error:", ex);
    res.status(400).json({ message: "Invalid token." });
  }
};