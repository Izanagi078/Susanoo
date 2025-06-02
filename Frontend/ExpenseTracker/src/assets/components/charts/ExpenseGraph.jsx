// File: src/assets/components/charts/Last30DaysExpenseChart.jsx
import React, { useMemo } from "react";
import PropTypes from "prop-types";
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
  Filler
} from "chart.js";

// Register necessary chart elements including the Filler for area charts.
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Last30DaysExpenseChart = ({ last30DaysExpenses }) => {
  // Safely extract the transactions array, defaulting to an empty array.
  const transactions = last30DaysExpenses?.transactions || [];

  // Compute the chart data using a memoized calculation.
  const chartData = useMemo(() => {
    // Group transaction amounts by their date.
    const grouped = {};
    transactions.forEach((txn) => {
      const dateObj = new Date(txn.date);
      const dateKey = dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      grouped[dateKey] = (grouped[dateKey] || 0) + txn.amount;
    });

    // Create an array of dates for the last 30 days, ensuring consistency even for dates with zero transactions.
    const dates = [];
    const amounts = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 29); // Includes today plus the previous 29 days.
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const key = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      dates.push(key);
      amounts.push(grouped[key] || 0);
    }
    
    return {
      labels: dates,
      datasets: [
        {
          label: "Expense ($)",
          data: amounts,
          fill: "origin", // Enables filling from the line to the x-axis.
          borderColor: "#FF4500", // Luxurious red tone.
          backgroundColor: "rgba(255,69,0,0.3)", // Matching translucent red fill.
          tension: 0,
          pointRadius: 3,
        },
      ],
    };
  }, [transactions]);

  // Configure chart options with theme-appropriate colors.
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#FFF" }, // White legend text.
      },
      title: {
        display: true,
        text: "Last 30 Days Expense Overview",
        font: { size: 20 },
        color: "#FFF", // White title text.
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
        beginAtZero: true,
        title: { display: true, text: "Amount ($)", color: "#FFF" },
        ticks: { color: "#FFF" },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div
      className="p-4 bg-gray-900 shadow rounded-lg border border-yellow-500"
      style={{ width: "100%", height: "300px" }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

Last30DaysExpenseChart.propTypes = {
  last30DaysExpenses: PropTypes.shape({
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default Last30DaysExpenseChart;
