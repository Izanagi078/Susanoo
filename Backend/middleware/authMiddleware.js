const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config(); // Ensure environment variables are loaded
console.log("🔑 JWT Secret:", process.env.JWT_SECRET);
exports.protect = async (req, res, next) => {
  try {
    // Extract token from headers
    let token;
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    // If no token, return error
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    // Check if token has been revoked (logged out)
    const RevokedToken = require("../models/RevokedToken");
    const isRevoked = await RevokedToken.findOne({ token });
    if (isRevoked) {
      return res.status(401).json({ message: "Session expired, please login again" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    // Check if user exists
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request and proceed
    req.user = user;
    next();
  } catch (err) {
    console.error("⛔ JWT Verification Error:", err.message);

    // Handle specific JWT errors for better debugging
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token signature" });
    }

    return res.status(401).json({ message: "Not authorized, token verification failed" });
  }
};
