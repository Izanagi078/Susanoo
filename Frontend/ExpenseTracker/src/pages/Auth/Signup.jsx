import React, { useState } from "react";
import AuthLayout from "../../assets/components/Layouts/AuthLayout"; // Adjust path accordingly
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Preview selected image
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-start ml-[5px] w-[50%] mt-[40vh]">
        <h3 className="text-2xl font-bold text-purple-500">Create an Account</h3>
        <p className="text-sm text-gray-500 mt-4">Sign up to start tracking your expenses</p>

        {/* Profile Image Upload */}
        <div className="w-full flex flex-col items-center mb-4">
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
            />
          )}
          <label className="mt-2 text-sm text-gray-500 cursor-pointer">
            Upload Profile Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
        </div>

        {/* Sign-Up Form */}
        <form className="mt-6 w-full space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full h-14 px-4 py-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full h-14 px-4 py-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
          />

          {/* Password Field with Eye Icon */}
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-14 px-10 py-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          <button className="w-full py-3 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600">
            SIGN UP
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-gray-500 mt-8">
          Already have an account? <a href="/login" className="text-purple-500 hover:underline">Login</a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

