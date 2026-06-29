const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfile,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema, updateProfileSchema } = require("../middleware/validationSchemas");

// ✅ User Authentication Routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.put("/update-profile", protect, validate(updateProfileSchema), updateProfile);
router.post("/logout", protect, logoutUser);
router.get("/getUser", protect, getUserInfo);

// ✅ Image Upload Route (Base64 Conversion & Immediate Local Disk Cleanup)
router.post("/upload-image", upload.single("file"), (req, res) => {
  try {
    console.log("🔹 Received Upload Request");
    
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    const fs = require("fs");
    const filePath = req.file.path;
    
    // Read file to buffer, encode to base64, construct Data URL
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64Data}`;
    
    // Asynchronously delete local file so server storage footprint remains 0
    fs.unlink(filePath, (err) => {
      if (err) console.error("❌ Temporary upload file cleanup failed:", err.message);
      else console.log("🗑️ Temporary upload file deleted successfully");
    });

    console.log("✅ Image Base64 Upload Successful");
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
});

module.exports = router;
