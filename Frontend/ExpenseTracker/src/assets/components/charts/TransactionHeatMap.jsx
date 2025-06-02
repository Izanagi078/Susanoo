import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const TransactionHeatmap = ({ transactions }) => {
  // Group transactions by date (formatted as 'YYYY-MM-DD')
  const grouped = transactions.reduce((acc, txn) => {
    const date = new Date(txn.date).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Map grouped data to heatmap values.
  const heatmapData = Object.keys(grouped).map((date) => ({
    date,
    count: grouped[date],
  }));

  // Set start and end dates for 1 year.
  const endDate = new Date().toISOString().split("T")[0];
  const startDateObj = new Date();
  startDateObj.setFullYear(startDateObj.getFullYear() - 1);
  const startDate = startDateObj.toISOString().split("T")[0];

  return (
    <div className="p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Transactions Heatmap</h2>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          if (value.count >= 5) {
            return "color-scale-4";
          } else if (value.count >= 3) {
            return "color-scale-3";
          } else if (value.count >= 2) {
            return "color-scale-2";
          }
          return "color-scale-1";
        }}
        tooltipDataAttrs={(value) => {
          if (!value.date) return null;
          return { "data-tip": `${value.date}: ${value.count} transactions` };
        }}
        showWeekdayLabels={true}
      />
      {/* Custom CSS for purple themed colors */}
      <style jsx>{`
        .react-calendar-heatmap .color-empty {
          fill: #f3e8ff;
        }
        .react-calendar-heatmap .color-scale-1 {
          fill: #e6ccff;
        }
        .react-calendar-heatmap .color-scale-2 {
          fill: #d9b3ff;
        }
        .react-calendar-heatmap .color-scale-3 {
          fill: #cc99ff;
        }
        .react-calendar-heatmap .color-scale-4 {
          fill: #bf80ff;
        }
      `}</style>
    </div>
  );
};

export default TransactionHeatmap;
