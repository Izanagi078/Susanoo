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
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving user info", error: err.message });
  }
};