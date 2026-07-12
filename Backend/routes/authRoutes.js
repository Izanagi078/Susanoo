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

// ✅ Image Upload Route (Base64 Conversion & In-Memory Processing)
router.post("/upload-image", upload.single("file"), (req, res) => {
  try {
    console.log("🔹 Received Upload Request");
    
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    // Convert file buffer from memory to base64, construct Data URL
    const base64Data = req.file.buffer.toString("base64");
    const imageUrl = `data:${req.file.mimetype};base64,${base64Data}`;

    console.log("✅ Image Base64 Upload Successful (In-Memory)");
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
});

module.exports = router;
