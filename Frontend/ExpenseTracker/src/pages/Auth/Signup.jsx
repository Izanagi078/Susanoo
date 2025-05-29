import React, { useState, useContext } from "react";
import AuthLayout from "../../assets/components/Layouts/AuthLayout";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa"; 
import axiosInstance from "../../../utils/axiosinstance"; // Verify correct path
import { API_PATHS } from "../../../utils/apiPaths"; // Verify correct path
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../../utils/UploadImage"; // Import uploadImage

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setProfileImagePreview(URL.createObjectURL(file)); // Preview image
      console.log("📂 Selected image for upload:", file);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      let profileImageUrl = ""; // Initialize profile image URL

      // Upload image if present
      if (profilePic) {
        console.log("📡 Uploading profile image...");
        const imgUploadRes = await uploadImage(profilePic); // Ensure uploadImage() exists
        profileImageUrl = imgUploadRes.imageUrl || "";
        console.log("✅ Profile Image Uploaded:", profileImageUrl);
      }

      console.log("📨 Sending Signup Request...");
      // Prepare request payload (JSON format)
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl, // Store uploaded image URL
      });

      console.log("🎯 Signup Success:", response.data);
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("❌ Signup Error:", error);

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-[5vh]">
        <h3 className="text-3xl font-bold text-purple-500">Create an Account</h3>
        <p className="text-sm text-gray-500 mt-2">Sign up to start tracking your expenses</p>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center bg-gray-200 relative">
            {profileImagePreview ? (
              <img src={profileImagePreview} alt="Profile Preview" className="w-full h-full rounded-full object-cover" />
            ) : (
              <FaUpload className="text-gray-500 text-xl" />
            )}
          </div>
          <label className="mt-3 text-sm text-gray-500 cursor-pointer">
            Upload Profile Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {/* Sign-Up Form */}
        <form className="w-full mt-6 space-y-4" onSubmit={handleSignUp}>
          <div className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-1/2 h-12 px-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
            />
            <div className="w-1/2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
                className={`w-full h-12 px-4 rounded-md border bg-white text-gray-700 focus:outline-none 
                ${emailError ? "border-red-500" : "border-gray-300 focus:border-purple-500"}`}
              />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Sign-Up Button */}
          <button 
            type="submit"
            className="w-full py-3 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600"
            disabled={emailError} // Prevent sign-up if email is invalid
          >
            SIGN UP
          </button>
        </form>

        {/* Go to Login Page */}
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <button 
            onClick={() => navigate("/login")} 
            className="text-purple-500 font-semibold hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
