import React from "react";
import TRACK_IMG from "../../images/Perfect.png"; // Adjust path

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-[50vw] h-screen px-15 pt-8 pb-12 bg-gradient-to-br from-black to-gray-900">
        <h2 className="text-3xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
            Expense
          </span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
            Tracker
          </span>
        </h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[50vw] h-screen bg-gradient-to-tr from-black via-red-900 to-black bg-cover bg-center relative">
        {/* Decorative Elements */}
        <div className="w-48 h-48 rounded-[40px] bg-red-700 shadow-lg absolute top-10 -left-12"></div>
        <div className="w-48 h-56 rounded-[40px] border-[12px] border-yellow-500 shadow-xl absolute top-24 left-8"></div>
        <div className="w-48 h-48 rounded-[40px] bg-red-700 shadow-lg absolute bottom-10 -left-12"></div>
        {/* Bold Circular Design */}
        <div className="absolute top-1/2 left-[60vw] w-72 h-72 rounded-full bg-red-700 opacity-20 blur-sm"></div>
        {/* Dark Box with Expenses Data */}
        <div className="absolute top-10 left-80 w-80 bg-gray-900 border border-yellow-500 p-6 rounded-lg shadow-2xl text-center">
          <h4 className="font-semibold text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
              Track
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
              Your
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-300">
              Expenses
            </span>
          </h4>
          <p className="text-white text-2xl font-bold mt-2">$6,90,000</p>
        </div>

        {/* Resized Image in the Corner */}
        <img
          src={TRACK_IMG}
          alt="Expense Overview"
          className="absolute bottom-16 right-8 w-[65%] rounded-lg shadow-2xl border-4 border-yellow-500"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
