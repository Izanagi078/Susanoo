import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../../../utils/data";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../cards/charAvatar"; // your avatar component

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [showViewDP, setShowViewDP] = useState(false);

  const handleClick = (route) => {
    if (route?.toLowerCase() === "/logout") {
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        clearUser();
        navigate("/login");
      }
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <div className="w-64 h-full bg-black border-r border-yellow-500 p-4">
        {/* Avatar: clickable only if there's an image URL */}
        <div className="flex justify-center mb-6">
          {user?.profileImageUrl ? (
            <div
              onClick={() => setShowViewDP(true)}
              className="cursor-pointer"
              title="Click to enlarge"
            >
              <Avatar
                profileImageUrl={user.profileImageUrl}
                fullName={user.fullName}
              />
            </div>
          ) : (
            // no image? just render Avatar (initials via your regex logic)
            <Avatar
              profileImageUrl={user?.profileImageUrl}
              fullName={user?.fullName}
            />
          )}
        </div>

        {/* Menu items */}
        {SIDE_MENU_DATA.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${
              activeMenu === item.label
                ? "text-white bg-red-600"
                : "text-white hover:bg-gray-800"
            }`}
          >
            {item.icon ? <item.icon className="text-xl" /> : <span className="text-xl">Icon</span>}
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Enlarge‐DP modal only when image exists */}
      {user?.profileImageUrl && showViewDP && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-black p-4 rounded">
            <button
              onClick={() => setShowViewDP(false)}
              className="absolute top-2 right-2 text-white text-xl"
            >
              &times;
            </button>
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
