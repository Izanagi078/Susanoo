import React, { useContext, useState } from "react";
import { SIDE_MENU_DATA } from "../../../../utils/data";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import Avatar from "../cards/charAvatar"; // Adjust the path as needed
import axiosInstance from "../../../../utils/axiosinstance";
import { API_PATHS } from "../../../../utils/apiPaths";
import { MdLockOutline } from "react-icons/md"; // For change password
import { FaPencilAlt } from "react-icons/fa"; // Pencil icon for DP change

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State for DP modals: view mode & change mode.
  const [showViewDP, setShowViewDP] = useState(false);
  const [showChangeDP, setShowChangeDP] = useState(false);
  const [selectedDPFile, setSelectedDPFile] = useState(null);

  // State for Password update modal.
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Route navigation with logout handling.
  const handleClick = (route) => {
    if (route && route.toLowerCase() === "/logout") {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) {
      return;
    }
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  // Update profile picture (DP) handler.
  const handleDPUpdate = async (e) => {
    e.preventDefault();
    if (!selectedDPFile) {
      alert("Please select a file to update your profile picture.");
      return;
    }
    const formData = new FormData();
    formData.append("dp", selectedDPFile);
    try {
      await axiosInstance.put(API_PATHS.USER.UPDATE_DP, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile picture updated successfully!");
      setShowChangeDP(false);
      setSelectedDPFile(null);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("Failed to update profile picture. Please try again.");
    }
  };

  // Handle change for password fields.
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit handler for updating password.
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }
    try {
      await axiosInstance.put(API_PATHS.USER.UPDATE_PASSWORD, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      alert("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      alert(
        "Failed to update password. Please check your current password and try again."
      );
    }
  };

  return (
    <>
      {/* Outer Container using h-full so that it inherits full height from its parent */}
      <div className="w-64 h-full bg-black border-r border-yellow-500 p-4">
        {/* Avatar & Pencil Icon Container */}
        <div className="relative flex justify-center mb-6">
          {/* Clicking on avatar shows enlarged image */}
          <div onClick={() => setShowViewDP(true)} className="cursor-pointer">
            <Avatar
              profileImageUrl={user?.profileImageUrl}
              fullName={user?.fullName}
            />
          </div>
          {/* Pencil icon triggers the DP change modal */}
          <div
            onClick={() => setShowChangeDP(true)}
            className="absolute bottom-0 right-0 bg-yellow-500 rounded-full p-1 cursor-pointer hover:bg-yellow-600"
          >
            <FaPencilAlt className="text-sm text-black" />
          </div>
        </div>

        {/* Menu Items */}
        {SIDE_MENU_DATA &&
          SIDE_MENU_DATA.map((item, index) => (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${
                activeMenu === item.label
                  ? "text-white bg-red-600"
                  : "text-white hover:bg-gray-800"
              }`}
            >
              {item.icon ? (
                <item.icon className="text-xl" />
              ) : (
                <span className="text-xl">Icon</span>
              )}
              <span>{item.label}</span>
            </button>
          ))}

        {/* Password Change Menu Item */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors text-white hover:bg-gray-800"
        >
          <MdLockOutline className="text-xl" />
          <span>Change Password</span>
        </button>
      </div>

      {/* Modal for Viewing Enlarged Profile Picture */}
      {showViewDP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded shadow-lg relative">
            <button
              onClick={() => setShowViewDP(false)}
              className="absolute top-2 right-2 text-white hover:text-yellow-500"
            >
              X
            </button>
            <img
              src={user?.profileImageUrl}
              alt="Enlarged Profile"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      {/* Modal for Changing Profile Picture */}
      {showChangeDP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded shadow-lg relative w-80">
            <button
              onClick={() => setShowChangeDP(false)}
              className="absolute top-2 right-2 text-white hover:text-yellow-500"
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4 text-center text-white">
              Change Profile Picture
            </h2>
            <form onSubmit={handleDPUpdate}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedDPFile(e.target.files[0])}
                className="mb-4 w-full"
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Update Profile Picture
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Updating Password */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded shadow-lg relative w-96">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-2 right-2 text-white hover:text-yellow-500"
            >
              X
            </button>
            <h2 className="text-lg font-bold mb-4 text-center text-white">
              Change Password
            </h2>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label className="block mb-1 text-white">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border border-yellow-500 rounded p-2 bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border border-yellow-500 rounded p-2 bg-gray-800 text-white"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordData.confirmNewPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full border border-yellow-500 rounded p-2 bg-gray-800 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
