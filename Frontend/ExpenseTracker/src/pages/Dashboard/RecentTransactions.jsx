import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mapRecentTransactions } from "../../../utils/transactioMapper";

const RecentTransactions = ({ transactions }) => {
  const [showMore, setShowMore] = useState(false);
  const mappedTransactions = mapRecentTransactions(transactions);

  // Separate transactions by type.
  const incomeTxns = mappedTransactions.filter(txn => txn.type === "income");
  const expenseTxns = mappedTransactions.filter(txn => txn.type === "expense");

  // Display 2 or 5 transactions per type based on showMore state.
  const displayedIncome = showMore ? incomeTxns.slice(0, 5) : incomeTxns.slice(0, 2);
  const displayedExpense = showMore ? expenseTxns.slice(0, 5) : expenseTxns.slice(0, 2);

  return (
    <div className="recentTransaction mt-8 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

      {/* Income Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Income</h3>
        {displayedIncome.length === 0 ? (
          <p className="text-gray-500">No income transactions found.</p>
        ) : (
          displayedIncome.map((txn) => (
            <div
              key={txn.id}
              className="flex justify-between items-center border-b pb-2 mb-2"
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{txn.icon}</div>
                <div>
                  <p className="font-medium">{txn.title}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
              </div>
              <div className="font-semibold">
                <span className="text-green-500">{txn.amount}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Expense Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Expense</h3>
        {displayedExpense.length === 0 ? (
          <p className="text-gray-500">No expense transactions found.</p>
        ) : (
          displayedExpense.map((txn) => (
            <div
              key={txn.id}
              className="flex justify-between items-center border-b pb-2 mb-2"
            >
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{txn.icon}</div>
                <div>
                  <p className="font-medium">{txn.title}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
              </div>
              <div className="font-semibold">
                <span className="text-red-500">{txn.amount}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Show More/Show Less toggle */}
      {(incomeTxns.length > 2 || expenseTxns.length > 2) && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition-all cursor-pointer"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Two Buttons: One for Income and one for Expense */}
      <div className="flex justify-end mt-4 space-x-4">
        <Link
          to="/income"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition-all"
        >
          See All Income
        </Link>
        <Link
          to="/expense"
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-all"
        >
          See All Expense
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
