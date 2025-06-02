import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register the required chart elements.
ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to render center text in the doughnut chart.
ChartJS.register({
  id: "centerTextPlugin",
  beforeDraw: (chart) => {
    const {
      ctx,
      chartArea: { left, right, top, bottom }
    } = chart;
    const width = right - left;
    const height = bottom - top;
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    ctx.save();
    ctx.font = "bold 20px Arial";
    // Set the center text color to white.
    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Access the center text from the plugins options.
    const centerText =
      chart.config.options.plugins.centerText &&
      chart.config.options.plugins.centerText.text
        ? chart.config.options.plugins.centerText.text
        : "";
    ctx.fillText(centerText, centerX, centerY);
    ctx.restore();
  }
});

const FinancialDonutChart = ({ totalBalance, totalIncome, totalExpenses }) => {
  const data = {
    labels: ["Total Income", "Total Expenses", "Total Balance"],
    datasets: [
      {
        data: [totalIncome, totalExpenses, totalBalance],
        backgroundColor: [
          "#FFD700", // Yellow for Total Income.
          "#FF4500", // Red for Total Expenses.
          "#8B0000"  // Dark Red (mix of red and black) for Total Balance.
        ],
        hoverBackgroundColor: [
          "#FFC700", // Lighter yellow on hover.
          "#DC143C", // Crimson on hover.
          "#7A0000"  // Slightly lighter dark red on hover.
        ]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#FFF" // White legend text.
        }
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            return `${label}: $${value}`;
          }
        }
      },
      centerText: {
        text: `$${totalBalance}`
      }
    }
  };

  return (
    <div className="mt-8 p-4 bg-gray-900 shadow rounded-lg border border-yellow-500">
      <h2 className="text-xl font-semibold mb-4 text-yellow-500">Financial Overview</h2>
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialDonutChart;
