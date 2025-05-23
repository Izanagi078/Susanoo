import React, { useState } from "react";
import AuthLayout from "../../assets/components/Layouts/AuthLayout";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa"; 

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
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

  return (
    <AuthLayout>
      <div className="flex flex-col items-center w-full max-w-lg mx-auto mt-[5vh]">
        <h3 className="text-3xl font-bold text-purple-500">Create an Account</h3>
        <p className="text-sm text-gray-500 mt-2">Sign up to start tracking your expenses</p>

        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center bg-gray-200 relative">
            {profileImage ? (
              <img src={profileImage} alt="Profile Preview" className="w-full h-full rounded-full object-cover" />
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
        <form className="w-full mt-6 space-y-4">
          <div className="flex space-x-4 w-full">
            <input
              type="text"
              placeholder="Full Name"
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

          {/* Sign-Up Button */}
          <button 
            className="w-full py-3 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600"
            disabled={emailError} // Prevent sign-up if email is invalid
          >
            SIGN UP
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500 mt-6">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
