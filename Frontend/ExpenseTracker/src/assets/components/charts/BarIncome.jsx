// File: src/assets/components/charts/IncomeBarChart.jsx
import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary chart elements.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeBarChart = ({ incomes }) => {
  const chartData = useMemo(() => {
    // Group incomes by date (formatted as "YYYY-MM-DD").
    const grouped = {};
    incomes.forEach((income) => {
      const date = new Date(income.date).toISOString().split("T")[0];
      grouped[date] = (grouped[date] || 0) + income.amount;
    });

    // If there are any income records, build a full date range:
    let dates = [];
    if (incomes.length > 0) {
      // Compute the earliest and latest transaction dates.
      const incomeDates = incomes.map((income) => new Date(income.date));
      let minDate = new Date(Math.min(...incomeDates));
      let maxDate = new Date(Math.max(...incomeDates));
      
      // Optionally, extend the max date to today.
      const today = new Date();
      if (today > maxDate) {
        maxDate = today;
      }

      // Construct a full date range from minDate to maxDate.
      for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
        // Clone each date so that the ISO conversion is correct.
        const dateStr = new Date(d).toISOString().split("T")[0];
        dates.push(dateStr);
      }
    }

    // For every date in the range, if there is no transaction, assign a 0 value.
    const dataValues = dates.map((date) => grouped[date] || 0);

    return {
      labels: dates,
      datasets: [
        {
          label: "Income ($)",
          data: dataValues,
          backgroundColor: "#6B46C1", // primary purple
          borderColor: "#6B46C1",
          borderWidth: 1,
        },
      ],
    };
  }, [incomes]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Income Overview (All Time)" },
    },
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: { beginAtZero: true, title: { display: true, text: "Amount ($)" } },
    },
  };

  return (
    <div style={{ height: "300px" }} className="w-full bg-white shadow rounded-lg p-4">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default IncomeBarChart;
