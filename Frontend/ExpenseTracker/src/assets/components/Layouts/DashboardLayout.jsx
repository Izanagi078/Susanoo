import React, { useContext } from "react";
import { UserContext } from "../../../context/userContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    // Ensure the entire layout takes at least the viewport height
    <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />
      {user && (
        // The flex container holding the sidebar and main content
        <div className="flex flex-1">
          {/* On desktop (md and above), always show the SideMenu */}
          <div className="hidden md:block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          {/* Main Content */}
          <div className="flex-1 mx-5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
