// File: src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import InfoCard from "../../assets/components/cards/InfoCard";
import RecentTransactions from "./RecentTransactions";
import { IoMdCard, IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { addThousandsSeparator } from "../../../utils/helper";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserauth";
import FinancialDonutChart from "../../assets/components/charts/FinancialChart";
import Last60DaysIncomeBarChart from "../../assets/components/charts/IncomeChart";
import Last30DaysExpenseChart from "../../assets/components/charts/ExpenseGraph";

const Home = () => {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;

  // Combine transactions from last60DaysIncome and last30DaysExpenses for the heatmap.
  const heatmapTransactions = [
    ...(dashboardData?.last60DaysIncome?.transactions || []),
    ...(dashboardData?.last30DaysExpenses?.transactions || [])
  ];

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto text-white">
        {/* InfoCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={`$${addThousandsSeparator(dashboardData?.totalBalance)}`}
            color="bg-gradient-to-r from-black to-red-600"
          />
          <InfoCard
            icon={<IoMdTrendingUp />}
            label="Total Income"
            value={`$${addThousandsSeparator(dashboardData?.totalIncome)}`}
            color="bg-red-600"
          />
          <InfoCard
            icon={<IoMdTrendingDown />}
            label="Total Expense"
            value={`$${addThousandsSeparator(dashboardData?.totalExpenses)}`}
            color="bg-red-700"
          />
        </div>

        {/* Financial Donut Chart and Recent Transactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="w-full">
            <FinancialDonutChart
              totalBalance={dashboardData?.totalBalance}
              totalIncome={dashboardData?.totalIncome}
              totalExpenses={dashboardData?.totalExpenses}
            />
          </div>
          <div className="w-full">
            {dashboardData?.recentTransactions && (
              <RecentTransactions transactions={dashboardData.recentTransactions} />
            )}
          </div>
        </div>

        {/* Bar and Line Charts for Past 60 Days Income & Last 30 Days Expense */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="w-full">
            {dashboardData?.last60DaysIncome && (
              <Last60DaysIncomeBarChart last60DaysIncome={dashboardData.last60DaysIncome} />
            )}
          </div>
          <div className="w-full">
            {dashboardData?.last30DaysExpenses && (
              <Last30DaysExpenseChart last30DaysExpenses={dashboardData.last30DaysExpenses} />
            )}
          </div>
        </div>

        {/* Transactions Heatmap */}

      </div>
    </DashboardLayout>
  );
};

export default Home;
