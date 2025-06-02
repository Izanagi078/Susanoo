import React from "react";

const InfoCard = ({ icon, label, value, color = "bg-gray-900" }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-yellow-500">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
