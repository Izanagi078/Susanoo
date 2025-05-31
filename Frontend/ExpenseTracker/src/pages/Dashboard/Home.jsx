import React, { useState, useEffect } from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import InfoCard from "../../assets/components/cards/InfoCard";
import RecentTransactions from "./RecentTransactions";
import { IoMdCard, IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";
import { addThousandsSeparator } from "../../../utils/helper";
import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import FinancialDonutChart from "../../assets/components/charts/FinancialChart";
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

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        {/* InfoCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={`$${addThousandsSeparator(dashboardData?.totalBalance)}`}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdTrendingUp />}
            label="Total Income"
            value={`$${addThousandsSeparator(dashboardData?.totalIncome)}`}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdTrendingDown />}
            label="Total Expense"
            value={`$${addThousandsSeparator(dashboardData?.totalExpenses)}`}
            color="bg-red-500"
          />
        </div>

        {/* Financial Donut Chart */}
        <FinancialDonutChart
          totalBalance={dashboardData?.totalBalance}
          totalIncome={dashboardData?.totalIncome}
          totalExpenses={dashboardData?.totalExpenses}
        />

        {/* Recent Transactions appear below */}
        {dashboardData?.recentTransactions && (
          <RecentTransactions transactions={dashboardData.recentTransactions} />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
