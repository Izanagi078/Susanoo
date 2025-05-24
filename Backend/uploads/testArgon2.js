const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

try {
  const decoded = jwt.verify(token, secret);
  console.log("Decoded Token:", decoded);
} catch (err) {
  console.error("JWT Verification Error:", err.message);
}
