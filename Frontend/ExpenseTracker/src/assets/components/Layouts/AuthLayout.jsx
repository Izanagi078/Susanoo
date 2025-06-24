import React from "react";
import TRACK_IMG from "../../images/Perfect.png"; // Adjust path

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left Panel remains unchanged */}
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

      {/* Right Panel: Aesthetic Design */}
      <div className="hidden md:block w-[50vw] h-screen relative overflow-visible bg-gradient-to-br from-black via-red-900 to-black">
        {/* Layered Organic Background Shapes */}
        {/* Big flowing curved shape at top-left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-red-700 opacity-30 rounded-full shadow-2xl"
          style={{ clipPath: "ellipse(70% 70% at 50% 50%)" }}
        ></div>

        {/* Flowing shape at bottom-right */}
        <div
          className="absolute -bottom-40 -right-20 w-[400px] h-[400px] bg-yellow-500 opacity-20 rounded-full shadow-2xl"
          style={{ clipPath: "ellipse(80% 60% at 50% 50%)" }}
        ></div>

        {/* Central overlapping organic shape for depth */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-yellow-500 opacity-10 rounded-full shadow-2xl"
          style={{ clipPath: "circle(50% at 50% 50%)" }}
        ></div>

        {/* Diagonally placed organic curve in top-right */}
        <div
          className="absolute top-10 right-[-100px] w-[300px] h-[300px] bg-yellow-500 opacity-20 rounded-full shadow-2xl"
          style={{ clipPath: "ellipse(70% 80% at 50% 50%)" }}
        ></div>

        {/* Subtle tilted organic shape at bottom-left */}
        <div
          className="absolute bottom-10 left-10 transform rotate-12 w-[250px] h-[250px] bg-red-700 opacity-40 rounded-full shadow-2xl"
          style={{ clipPath: "ellipse(60% 60% at 50% 50%)" }}
        ></div>

        {/* ------------------------------------------------------------------- */}
        {/* New Decorative Shapes Extending from the RIGHT Edge */}
        {/* Shape R1: A curved dark ellipse (using dark red) */}
        <div
          className="absolute top-[20%] right-[-60px] w-56 h-56 bg-red-900 opacity-90 rounded-full shadow-lg"
          style={{ clipPath: "ellipse(70% 80% at 50% 50%)" }}
        ></div>

        {/* Shape R2: A straight dark rectangle (using dark gold) */}
        <div
          className="absolute top-[45%] right-[-40px] w-64 h-32 bg-yellow-900 opacity-90 shadow-lg"
        ></div>

        {/* Shape R3: A combination shape with angled edges (using dark red) */}
        <div
          className="absolute bottom-[20%] right-[-70px] w-72 h-24 bg-red-900 opacity-90 shadow-lg"
          style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 80%)" }}
        ></div>

        {/* ------------------------------------------------------------------- */}
        {/* New Shape R4: Additional shape below the big central circle, extending from the right */}
        <div
          className="absolute top-[70%] right-[-100px] w-80 h-80 bg-yellow-900 opacity-90 rounded-full shadow-lg"
        ></div>

        {/* Glassmorphism Expense Data Card */}
        <div className="absolute top-16 right-16 w-80 bg-gray-900 bg-opacity-75 border border-yellow-500 p-6 rounded-lg shadow-2xl backdrop-blur-lg text-center">
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

        {/* Expense Image Card */}
        <div className="absolute bottom-12 right-12 w-80 h-60 rounded-lg border-4 border-yellow-500 shadow-2xl overflow-hidden">
          <img
            src={TRACK_IMG}
            alt="Expense Overview"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
