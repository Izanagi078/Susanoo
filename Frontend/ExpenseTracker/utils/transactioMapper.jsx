// File: src/utils/transactionMapper.js

import React from "react";
import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

/**
 * Converts raw transaction objects from the backend into a standardized format for the UI.
 *
 * For income transactions, the 'source' property is used as the title.
 * For expense transactions, the 'category' property is used as the title.
 *
 * @param {Array} transactions - An array of raw transaction objects.
 * @returns {Array} An array of mapped transaction objects.
 */
export const mapRecentTransactions = (transactions) => {
  return transactions.map((txn) => {
    const isIncome = txn.type === "income";
    return {
      id: txn._id,
      type: txn.type,
      icon: isIncome 
        ? <IoMdTrendingUp className="text-yellow-500" /> 
        : <IoMdTrendingDown className="text-red-500" />,
      title: isIncome ? (txn.source || "Income") : (txn.category || "Expense"),
      date: new Date(txn.date).toLocaleDateString(),
      amount: `$${txn.amount}`,
    };
  });
};
