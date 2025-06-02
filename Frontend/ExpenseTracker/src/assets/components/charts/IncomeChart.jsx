import { useMemo, React } from "react";
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
          backgroundColor: "#6B46C1", // Use your primary purple.
          borderColor: "#6B46C1",
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
        position: "bottom"
      },
      title: {
        display: true,
        text: "Last 60 Days Income Overview",
        font: { size: 20 }
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
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)"
        }
      }
    }
  };

  return (
    <div
      className="p-4 bg-white shadow rounded-lg"
      style={{ width: "100%", height: "300px" }}
    >
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Last60DaysIncomeBarChart;
