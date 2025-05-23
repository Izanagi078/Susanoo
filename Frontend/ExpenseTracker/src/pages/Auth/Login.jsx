import React, { useState } from "react";
import AuthLayout from "../../assets/components/Layouts/AuthLayout"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout>
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-[20vh]">
        <h3 className="text-3xl font-bold text-purple-500">Welcome Back</h3>
        <p className="text-sm text-gray-500 mt-2">Please enter your details to log in</p>

        {/* Form */}
        <form className="w-full mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 px-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-purple-500"
          />

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

          {/* Login Button */}
          <button className="w-full py-3 bg-purple-500 text-white rounded-md font-semibold hover:bg-purple-600">
            Log In
          </button>
        </form>

        {/* Sign-Up Link */}
        <p className="text-sm text-gray-500 mt-6">
          Don't have an account? <a href="/signup" className="text-purple-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
