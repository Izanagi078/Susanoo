const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MzFkNDQ5Zjc5ZTY0Nzg5YmE1ZTQ1MiIsImlhdCI6MTc0ODA5NjA5NiwiZXhwIjoxNzQ4MDk5Njk2fQ.-xSy-AIjq5JFsAqYhqMDUGRGBVYECJD0vg6WjkAX2S8";
const secret = process.env.JWT_SECRET;

try {
  const decoded = jwt.verify(token, secret);
  console.log("Decoded Token:", decoded);
} catch (err) {
  console.error("JWT Verification Error:", err.message);
}
