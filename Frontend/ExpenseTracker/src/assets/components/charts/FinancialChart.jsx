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
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    // Now accessing the centerText from the plugins options.
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
        backgroundColor: ["#FFA500", "#FF0000", "#6B46C1"],
        hoverBackgroundColor: ["#FF8C00", "#DC143C", "#7B53CF"]
      }
    ]
  };

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom"
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
    <div className="mt-8 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
      <div style={{ width: "100%", height: "300px", position: "relative" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialDonutChart;
