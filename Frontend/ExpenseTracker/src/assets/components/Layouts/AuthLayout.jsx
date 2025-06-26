import React from "react";
import TRACK_IMG from "../../images/Perfect.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      {/* Left Panel */}
      <div className="flex flex-col justify-center w-full md:w-1/2 h-screen px-6 sm:px-12 py-8 bg-gradient-to-br from-black to-gray-900">
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

      {/* Right Panel */}
      <div className="hidden md:block w-1/2 h-screen relative overflow-hidden">
        {/* 1) Background image */}
        <img
          src={TRACK_IMG}
          alt="Expense Overview"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* 2) All your organic shapes now on top of it (z-10) */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-700 opacity-30 rounded-full shadow-2xl z-10"
          style={{ clipPath: "ellipse(70% 70% at 50% 50%)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[400px] h-[400px] bg-yellow-500 opacity-20 rounded-full shadow-2xl z-10"
          style={{ clipPath: "ellipse(80% 60% at 50% 50%)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-yellow-500 opacity-10 rounded-full shadow-2xl z-10"
          style={{ clipPath: "circle(50% at 50% 50%)" }}
        />
        {/* …and the rest of your shapes, all with z-10… */}

        {/* 3) Glassmorphic card on top */}
        <div className="absolute top-16 right-16 w-80 bg-gray-900 bg-opacity-75 border border-yellow-500 p-6 rounded-lg shadow-2xl backdrop-blur-lg text-center z-20">
          <h4 className="font-semibold text-xl mb-2">
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
          <p className="text-white text-2xl font-bold">$6,90,000</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
