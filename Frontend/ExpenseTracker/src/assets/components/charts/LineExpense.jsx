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
  // Prepare the data for the line chart by grouping expenses by date.
  const chartData = useMemo(() => {
    const groupedExpenses = {};
    expenses.forEach((expense) => {
      // Format date as YYYY-MM-DD for grouping.
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
          borderColor: "#FF4500", // Rich red for expenses.
          backgroundColor: "rgba(255, 69, 0, 0.1)", // Translucent red fill.
          fill: true,
          tension: 0, // No curve.
          pointRadius: 4, // Size of points.
        },
      ],
    };
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: "bottom",
        labels: { color: "#FFF" } // Set legend text to white.
      },
      title: { 
        display: true,
        text: "Expense Trends (All Time)",
        font: { size: 20 },
        color: "#FFF" // White title text.
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.dataset.label ? context.dataset.label + ": " : "";
            if (context.parsed.y !== null) {
              label += "$" + context.parsed.y.toFixed(2);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: "#FFF" },
        ticks: { color: "#FFF" },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      y: {
        title: { display: true, text: "Amount ($)", color: "#FFF" },
        ticks: { color: "#FFF" },
        beginAtZero: true,
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div style={{ height: "300px" }} className="w-full bg-gray-900 shadow rounded-lg p-4">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExpenseLineChart;
