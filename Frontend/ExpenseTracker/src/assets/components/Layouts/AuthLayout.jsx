import React from "react";
import TRACK_IMG from "../../images/Hope.png";
 // Adjust path

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Section */}
      <div className="w-[50vw] h-screen px-15 pt-8 pb-12 bg-white">
        <h2 className="text-3xl font-bold text-purple-500">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-[50vw] h-screen bg-violet-50 bg-cover bg-center relative">
        {/* Decorative Elements (Restored) */}
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-7 -left-10"></div>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-20 left-10"></div>
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute bottom-7 -left-10"></div>
        {/* Bold Purple Circular Design Beneath Elements */}
        <div className="absolute top-50 left-[60vw] w-72 h-72 rounded-full bg-purple-500 opacity-40"></div>
        {/* Adjusted White Box with Expenses Data */}
         <div className="absolute top-10 left-70 w-80 bg-white p-6 rounded-lg shadow-md text-center">
          <h4 className="text-purple-500 font-semibold text-lg">Track Your Expenses</h4>
          <p className="text-gray-700 text-xl font-bold">$6,90,000</p>
        </div>

        {/* Resized Image in the Corner */}
        <img src={TRACK_IMG} alt="Expense Overview"
          className="absolute bottom-20 right-5 w-[70%] rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
