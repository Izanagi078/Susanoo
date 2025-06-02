// File: src/assets/components/charts/ExpenseList.jsx
import React from "react";

const defaultIcon = "⬇️";

const ExpenseList = ({ expenses, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="p-4 bg-white shadow rounded-lg text-gray-500">
        No expense records available.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Expense Records</h2>
      <div className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <div
            key={expense._id}
            className="flex items-center justify-between p-4 hover:bg-gray-100 group rounded-none"
          >
            <div className="flex items-center space-x-4">
              <span className="text-2xl">
                {expense.icon && expense.icon.trim() !== "" ? expense.icon : defaultIcon}
              </span>
              <div>
                <div className="font-semibold">{expense.category || "Expense"}</div>
                <div className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-bold">
                ${Number(expense.amount).toFixed(2)}
              </span>
              <button
                onClick={() => onDelete(expense._id)}
                className="cursor-pointer text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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

export default ExpenseList;
