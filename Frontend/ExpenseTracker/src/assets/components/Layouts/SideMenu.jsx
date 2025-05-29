import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../../../utils/data";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../cards/charAvatar"; // Adjust the path as needed

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Trigger the route navigation, handling logout separately.
  const handleClick = (route) => {
    if (route && route.toLowerCase() === "/logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      {/* Using the separate Avatar component for user display */}
      <Avatar profileImageUrl={user?.profileImageUrl} fullName={user?.fullName} />

      {/* Menu items */}
      {SIDE_MENU_DATA &&
        SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${
              activeMenu === item.label
                ? "text-white bg-purple-500"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {/* Render the icon if available; otherwise, show a placeholder */}
            {item.icon ? (
              <item.icon className="text-xl" />
            ) : (
              <span className="text-xl">Icon</span>
            )}
            <span>{item.label}</span>
          </button>
        ))}
    </div>
  );
};

export default SideMenu;
