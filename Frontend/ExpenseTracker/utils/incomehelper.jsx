// File: src/assets/components/charts/IncomeList.jsx
import React from "react";

const defaultIcon = "⬆️";

const IncomeList = ({ incomes, onDelete }) => {
  if (!incomes || incomes.length === 0) {
    return (
      <div className="p-4 bg-white shadow rounded-lg text-gray-500">
        No income records available.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Income Records</h2>
      <div className="divide-y divide-gray-200">
        {incomes.map((income) => (
          <div
            key={income._id}
            className="flex items-center justify-between p-4 hover:bg-gray-100 group"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">
                {income.icon && income.icon.trim() !== "" ? income.icon : defaultIcon}
              </span>
              <div>
                <div className="font-semibold">{income.source}</div>
                <div className="text-sm text-gray-500">
                  {new Date(income.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">${income.amount.toFixed(2)}</span>
              <button
                onClick={() => onDelete(income._id)}
                className="cursor-pointer text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ cursor: "pointer" }} // Force pointer style if needed.
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
