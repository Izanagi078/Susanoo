const User = require("../models/User");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
// 🔑 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// 🔥 Register User (Secure Hashing)
exports.registerUser = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);

    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // ✅ Explicitly Hash Password
    const hashedPassword = await argon2.hash(password);

    console.log("Hashed Password Before Save:", hashedPassword);

    // ✅ Save User in MongoDB
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

// 🔐 Login User (Fixing Verification)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    console.log("User Found:", user ? user.email : "User not found");
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password (DB):", user?.password || "No password found");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // ✅ Debug Password Inputs Before Verification
    console.log("Trying to verify:", { enteredPassword: password, storedHash: user.password });

    // ✅ Fix Verification Logic
    const isMatch = await argon2.verify(user.password, password);
    
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
exports.getUserInfo = async (req, res) => {
  try {
    // Debugging log to verify user data in request
    console.log("🔍 Requested User ID:", req.user?.id);

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("❌ Error retrieving user info:", err.message);
    res.status(500).json({ message: "Error retrieving user info", error: err.message });
  }
};

// 👤 Update Profile Details (Except Fixed Email)
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  try {
    const { fullName, password, profileImageUrl, email } = req.body;

    // Find User
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Explicitly enforce that the email is a fixed primary key and cannot be updated
    if (email && email !== user.email) {
      return res.status(400).json({ message: "Email is a fixed identifier and cannot be modified." });
    }

    // Update fields if provided
    if (fullName) {
      user.fullName = fullName;
    }
    if (profileImageUrl) {
      user.profileImageUrl = profileImageUrl;
    }
    if (password) {
      user.password = await argon2.hash(password);
    }

    await user.save();

    // Return sanitized updated user profile
    const updatedUser = await User.findById(userId).select("-password");
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("❌ Profile update error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 🚪 Logout User (Stateless Token Revocation Blocklisting)
exports.logoutUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({ message: "No active session token found" });
    }
    const token = authHeader.split(" ")[1];

    const RevokedToken = require("../models/RevokedToken");
    
    // Save to database blocklist (MongoDB will auto-delete it after 1 hour via TTL)
    await RevokedToken.create({ token });

    console.log("🔒 Session revoked successfully");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("❌ Logout revocation error:", error.message);
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};