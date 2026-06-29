const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/authController");

const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../middleware/validationSchemas");

// ✅ User Authentication Routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/getUser", protect, getUserInfo);

// ✅ Image Upload Route
router.post("/upload-image", upload.single("file"), (req, res) => {
  try {
    console.log("🔹 Received Upload Request");
    console.log("📂 File Details:", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    // ✅ Construct image URL dynamically
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    console.log("✅ Image Upload Successful:", imageUrl);
    
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("❌ Upload failed:", error.message);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
});

module.exports = router;
