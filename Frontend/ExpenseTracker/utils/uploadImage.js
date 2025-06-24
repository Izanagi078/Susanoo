import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to form data
  formData.append('file', imageFile);

  console.log("📝 Preparing Image Upload Request...");
  console.log("📂 FormData:", [...formData.entries()]);
  console.log("📡 Sending request to:", API_PATHS.IMAGE.UPLOAD_IMAGE);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set header for file upload
      },
    });

    console.log("🎯 Upload Success:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Image Upload Error:", error?.message || error);
    console.log("⚠️ Backend Response:", error?.response?.data || "No response received");
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;
