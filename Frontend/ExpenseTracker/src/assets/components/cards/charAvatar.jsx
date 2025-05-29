import React, { useState } from "react";
import { getInitials } from "../../../../utils/helper"; // Adjust path as needed

const Avatar = ({ profileImageUrl, fullName, size = "w-16 h-16" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal to show the full-screen image or initials.
  const openModal = () => setIsModalOpen(true);
  // Close the modal.
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mb-6 border-b border-gray-300 pb-4 flex flex-col items-center">
      {profileImageUrl ? (
        <img
          src={profileImageUrl}
          alt="Profile"
          className={`${size} rounded-full object-cover cursor-pointer`}
          onClick={openModal}
        />
      ) : (
        <div
          className={`${size} rounded-full bg-gray-400 flex items-center justify-center cursor-pointer`}
          onClick={openModal}
        >
          <span className="text-white font-bold text-lg">
            {getInitials(fullName)}
          </span>
        </div>
      )}
      <h5 className="mt-2 text-lg font-medium text-gray-800">
        {fullName || "User"}
      </h5>

      {/* Full-Screen Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal} // Clicking the overlay closes the modal.
        >
          <div className="relative">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile Fullscreen"
                className="max-w-full max-h-full rounded"
              />
            ) : (
              <div className="bg-gray-400 flex items-center justify-center w-32 h-32 rounded-full">
                <span className="text-white font-bold text-4xl">
                  {getInitials(fullName)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
