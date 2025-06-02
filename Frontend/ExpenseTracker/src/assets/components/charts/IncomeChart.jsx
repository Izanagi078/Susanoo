import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register necessary chart elements.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Custom plugin to add shadow for bars.
ChartJS.register({
  id: "barShadowPlugin",
  beforeDatasetDraw(chart, args, pluginOptions) {
    const { ctx } = chart;
    ctx.save();
    ctx.shadowColor = pluginOptions.shadowColor || "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = pluginOptions.shadowBlur || 10;
    ctx.shadowOffsetX = pluginOptions.shadowOffsetX || 2;
    ctx.shadowOffsetY = pluginOptions.shadowOffsetY || 2;
  },
  afterDatasetDraw(chart, args, pluginOptions) {
    const { ctx } = chart;
    ctx.restore();
  }
});

const Last60DaysIncomeBarChart = ({ last60DaysIncome }) => {
  // Extract transactions array.
  const transactions = last60DaysIncome?.transactions || [];

  // Group transactions by date.
  const chartData = useMemo(() => {
    const grouped = {};
    transactions.forEach((txn) => {
      // Format the transaction date as "MMM DD" (e.g., "Jul 05").
      const dateObj = new Date(txn.date);
      const dateKey = dateObj.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric"
      });
      if (!grouped[dateKey]) {
        grouped[dateKey] = 0;
      }
      grouped[dateKey] += txn.amount;
    });

    // Sort the dates in ascending order.
    const currentYear = new Date().getFullYear();
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      const dateA = new Date(`${a}, ${currentYear}`);
      const dateB = new Date(`${b}, ${currentYear}`);
      return dateA - dateB;
    });
    const dataValues = sortedDates.map((date) => grouped[date]);

    return {
      labels: sortedDates,
      datasets: [
        {
          label: "Income ($)",
          data: dataValues,
          backgroundColor: "#FFD700", // Luxurious gold color.
          borderColor: "#FFD700",
          borderWidth: 1
        }
      ]
    };
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "x", // vertical bars
    plugins: {
      // Apply shadow plugin options.
      barShadowPlugin: {
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowBlur: 10,
        shadowOffsetX: 2,
        shadowOffsetY: 2
      },
      legend: {
        position: "bottom",
        labels: { color: "#FFF" } // White legend text.
      },
      title: {
        display: true,
        text: "Last 60 Days Income Overview",
        font: { size: 20 },
        color: "#FFF" // White title text.
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              label += "$" + context.parsed.y.toFixed(2);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: "#FFF" },
        ticks: { color: "#FFF" },
        grid: { color: "rgba(255,255,255,0.2)" }
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Amount ($)", color: "#FFF" },
        ticks: { color: "#FFF" },
        grid: { color: "rgba(255,255,255,0.2)" }
      }
    }
  };

  return (
    <div
      className="p-4 bg-gray-900 shadow rounded-lg border border-yellow-500"
      style={{ width: "100%", height: "300px" }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Last60DaysIncomeBarChart;
