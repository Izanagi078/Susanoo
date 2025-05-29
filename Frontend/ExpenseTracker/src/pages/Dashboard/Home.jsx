import React from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserauth";
const Home = () => {
  useUserAuth();
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        Home
      </div>
    </DashboardLayout>
  );
};

export default Home;