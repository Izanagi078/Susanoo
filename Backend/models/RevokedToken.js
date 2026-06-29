const mongoose = require("mongoose");

const revokedTokenSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // Auto-deleted after 1 hour (expiry of JWT)
});

module.exports = mongoose.model("RevokedToken", revokedTokenSchema);
