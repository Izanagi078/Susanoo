let argon2;
let hasArgon2 = false;

try {
  argon2 = require("argon2");
  hasArgon2 = true;
  console.log("🔒 Argon2 loaded successfully for password hashing.");
} catch (err) {
  console.warn("⚠️ Argon2 failed to load. Falling back to bcryptjs for password hashing. Reason:", err.message);
}

const bcrypt = require("bcryptjs");

/**
 * Hashes a plain-text password using Argon2 if available, or BcryptJS as fallback.
 * @param {string} password - The plain-text password.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
  if (hasArgon2) {
    try {
      return await argon2.hash(password);
    } catch (err) {
      console.error("Argon2 hashing failed, falling back to bcryptjs:", err.message);
    }
  }
  // Fallback or default to bcryptjs
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Verifies a plain-text password against a hashed password.
 * Detects the hash format (Argon2 vs Bcrypt) automatically.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @param {string} password - The plain-text password entered by the user.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 */
const verifyPassword = async (hashedPassword, password) => {
  if (!hashedPassword) return false;

  // Argon2 hashes typically start with '$argon2'
  if (hashedPassword.startsWith("$argon2")) {
    if (hasArgon2) {
      try {
        return await argon2.verify(hashedPassword, password);
      } catch (err) {
        console.error("Argon2 verification failed:", err.message);
        return false;
      }
    } else {
      console.error("⚠️ Cannot verify Argon2 password hash: Argon2 library is not available in this environment.");
      return false;
    }
  }

  // Otherwise, assume bcrypt
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error("Bcrypt verification failed:", err.message);
    return false;
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
};
