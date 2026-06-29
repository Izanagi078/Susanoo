import React, { useState, useContext } from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../../utils/axiosInstance";
import { API_PATHS } from "../../../utils/apiPaths";
import toast from "react-hot-toast";
import Avatar from "../../assets/components/cards/charAvatar";
import { useUserAuth } from "../../hooks/useUserauth";

const Settings = () => {
  useUserAuth(); // Hook to authenticate user on layout mount

  const { user, updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle Profile Photo Upload & Convert to Base64 (Stateless Cloud-Safe Upload)
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG images are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    const loadingToast = toast.loading("Processing and uploading photo...");
    try {
      const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData);
      setProfileImageUrl(res.data.imageUrl);
      toast.success("Profile photo updated successfully!", { id: loadingToast });
    } catch (err) {
      console.error("Photo upload failed:", err);
      toast.error(err.response?.data?.message || "Failed to process photo upload", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    if (password) {
      if (password.length < 6) {
        toast.error("New password must be at least 6 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    setSaving(true);
    try {
      const payload = {
        fullName,
        profileImageUrl,
      };
      if (password) {
        payload.password = password;
      }

      const res = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, payload);
      updateUser(res.data.user);
      setPassword("");
      setConfirmPassword("");
      toast.success("Profile settings updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update profile settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Settings">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-black border border-yellow-500 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-red-600 border-b border-red-600 pb-2">
          Profile Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile Photo Section */}
          <div className="flex flex-col items-center border-r border-gray-800 pr-6">
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Avatar Settings</h3>
            <div className="mb-4">
              <Avatar profileImageUrl={profileImageUrl} fullName={fullName} />
            </div>
            
            <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors text-sm font-semibold">
              {uploading ? "Uploading..." : "Upload New Photo"}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploading}
              />
            </label>
            <p className="text-xs text-gray-500 mt-2 text-center">
              JPEG or PNG formats. Processed into a secure, database-safe format.
            </p>
          </div>

          {/* Right Column: Profile Info Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Fixed Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-1">
                  Email Address (Fixed Identifier)
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-gray-900 border border-gray-700 text-gray-500 rounded p-3 cursor-not-allowed font-mono text-sm"
                  title="Your registered email is a fixed identifier and cannot be modified."
                />
              </div>

              {/* Full Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 focus:border-red-600 focus:outline-none text-white rounded p-3 text-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="border-t border-gray-800 my-6 pt-4">
                <h3 className="text-md font-semibold text-yellow-500 mb-4">Update Security Credentials</h3>
                
                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 focus:border-red-600 focus:outline-none text-white rounded p-3 text-sm"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-900 border border-gray-700 focus:border-red-600 focus:outline-none text-white rounded p-3 text-sm"
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
