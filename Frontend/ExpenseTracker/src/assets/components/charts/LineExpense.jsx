// File: src/assets/components/charts/LineExpense.jsx
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js modules.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExpenseLineChart = ({ expenses }) => {
  // Prepare the data for the line chart. Here we group expenses by date.
  const chartData = useMemo(() => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      // Format date as YYYY-MM-DD for grouping
      const dateKey = new Date(expense.date).toISOString().split("T")[0];
      groupedExpenses[dateKey] = (groupedExpenses[dateKey] || 0) + expense.amount;
    });

    // Sort dates in ascending order.
    const sortedDates = Object.keys(groupedExpenses).sort();

    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Expense ($)",
          data: sortedDates.map((date) => groupedExpenses[date]),
          borderColor: "#6B46C1", // Red color for expenses
          backgroundColor: "rgba(107, 70, 193, 0.1)",
          fill: true,
          tension: 0, // Curve of the line.
          pointRadius: 4, // Size of points.
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Expense Trends (All Time)" },
    },
    scales: {
      x: { 
        title: { display: true, text: "Date" },
        // Optionally, you can improve date display using time scales.
      },
      y: {
        title: { display: true, text: "Amount ($)" },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "300px" }} className="w-full bg-white shadow rounded-lg p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExpenseLineChart;
