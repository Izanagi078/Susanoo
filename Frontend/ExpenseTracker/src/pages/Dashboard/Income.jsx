// File: src/pages/IncomePage.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import IncomeBarChart from "../../assets/components/charts/BarIncome";
import IncomeList from "../../../utils/incomehelper";
import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { IoMdAdd } from "react-icons/io";
import EmojiPicker from "emoji-picker-react"; // Ensure you've installed this package: npm install emoji-picker-react

const defaultIcon = "⬆️";

const IncomePage = () => {
  const [incomes, setIncomes] = useState([]); // All incomes until date.
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formData, setFormData] = useState({
    icon: "",
    source: "",
    amount: "",
    date: "",
  });

  // Fetch data from the dashboard endpoint that includes allIncomeTransactions.
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setIncomes(res.data.allIncomeTransactions);
    } catch (err) {
      console.error("Error fetching incomes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // Ask the user for confirmation before deleting.
    if (!window.confirm("Do you really wanna delete this income?")) {
      return; // User cancelled deletion.
    }
    console.log("Attempting to delete income with ID:", id);
    try {
      // Using the parameterized API path for deleting income:
      const deleteUrl = API_PATHS.INCOME.DELETE_INCOME(id);
      console.log("Deleting via URL:", deleteUrl);
      const response = await axiosInstance.delete(deleteUrl);
      console.log("Delete response:", response.data);
      // Remove record from state - converting both to strings for a safe comparison.
      setIncomes((prev) =>
        prev.filter((income) => String(income._id) !== String(id))
      );
    } catch (err) {
      console.error("Error deleting income:", err.response || err);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Called when an emoji is clicked from the picker.
  const handleEmojiClick = (emojiData, event) => {
    setFormData((prev) => ({
      ...prev,
      icon: emojiData.emoji,
    }));
    setShowEmojiPicker(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit triggered");
    const payload = {
      ...formData,
      icon: formData.icon.trim() === "" ? defaultIcon : formData.icon,
      amount: Number(formData.amount),
      date: formData.date,
    };

    try {
      // Using the route /api/v1/income/add.
      const res = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, payload);
      console.log("New income added:", res.data);
      // Prepend the new income record.
      setIncomes([res.data, ...incomes]);
      // Reset form and automatically close the add-income form.
      setFormData({ icon: "", source: "", amount: "", date: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  // New function to handle downloading income data.
  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob", // Ensures the file data is received properly.
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_data.csv"); // Update filename/extension as needed.
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading income:", err);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto max-w-4xl text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-yellow-500">Income Page</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm((prev) => !prev)}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              <IoMdAdd className="mr-2" /> {showAddForm ? "Cancel" : "Add Income"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600"
            >
              Download Income
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="mt-6">
            <form onSubmit={handleFormSubmit} className="bg-gray-900 shadow rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-yellow-500">Icon (Emoji)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    readOnly
                    placeholder="Choose Emoji or leave empty"
                    className="mt-1 block w-full border border-yellow-500 rounded-md bg-gray-800 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="bg-gray-700 px-2 py-1 rounded text-yellow-500"
                  >
                    {showEmojiPicker ? "Close" : "Select"}
                  </button>
                </div>
                {showEmojiPicker && (
                  <div className="mt-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-yellow-500">Source</label>
                <input
                  type="text"
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  placeholder="Salary, Business, etc."
                  required
                  className="mt-1 block w-full border border-yellow-500 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-500">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                  className="mt-1 block w-full border border-yellow-500 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <div className="mb-4">
                <label className="block text-yellow-500">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-yellow-500 rounded-md bg-gray-800 text-white focus:outline-none focus:border-red-600"
                />
              </div>
              <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Submit
              </button>
            </form>
          </div>
        )}

        {incomes.length === 0 ? (
          <div className="mt-6 p-4 bg-gray-900 shadow rounded-lg text-center text-gray-400">
            No income records available yet. Start by adding your income.
          </div>
        ) : (
          <>
            <div className="mt-6">
              <IncomeBarChart incomes={incomes} />
            </div>
            <div className="mt-6">
              <IncomeList incomes={incomes} onDelete={handleDelete} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IncomePage;
