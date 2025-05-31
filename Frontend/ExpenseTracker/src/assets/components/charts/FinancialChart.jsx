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

const FinancialDonutChart = ({ totalBalance, totalIncome, totalExpenses }) => {
  const data = {
    labels: ["Total Income", "Total Expenses", "Total Balance"],
    datasets: [
      {
        data: [totalIncome, totalExpenses, totalBalance],
        backgroundColor: ["#FFA500", "#FF0000", "#800080"], // orange, red, purple
        hoverBackgroundColor: ["#FF8C00", "#DC143C", "#9932CC"]
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="mt-8 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
      <div style={{ width: "100%", height: "300px" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default FinancialDonutChart;
