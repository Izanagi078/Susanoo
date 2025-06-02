// File: src/pages/ExpensePage.jsx
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../assets/components/Layouts/DashboardLayout";
import ExpenseLineChart from "../../assets/components/charts/LineExpense";
import ExpenseList from "../../../utils/expensehelper"; // Make sure this helper renders the full list
import axiosInstance from "../../../utils/axiosinstance";
import { API_PATHS } from "../../../utils/apiPaths";
import { IoMdAdd } from "react-icons/io";
import EmojiPicker from "emoji-picker-react"; // Ensure you've installed this package: npm install emoji-picker-react

const defaultIcon = "⬇️";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]); // All expenses till now.
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [formData, setFormData] = useState({
    icon: "",
    category: "",
    amount: "",
    date: "",
  });

  // Fetch expense data from the dashboard API.
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      // Log full dashboard data for debugging. Inspect this in your browser console.
      console.log("Dashboard API Data:", res.data);

      // Ensure you are using the correct property name.
      setExpenses(res.data.allExpenseTransactions || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handler to delete an expense record.
  const handleDelete = async (id) => {
    if (!window.confirm("Do you really wanna delete this expense?")) {
      return;
    }
    try {
      const deleteUrl = API_PATHS.EXPENSE.DELETE_EXPENSE(id);
      const response = await axiosInstance.delete(deleteUrl);
      console.log("Delete response:", response.data);
      setExpenses((prev) =>
        prev.filter((expense) => String(expense._id) !== String(id))
      );
    } catch (err) {
      console.error("Error deleting expense:", err.response || err);
    }
  };

  // Handle input change for the add expense form.
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

  // Handler for the add expense form submissions.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      icon: formData.icon.trim() === "" ? defaultIcon : formData.icon,
      amount: Number(formData.amount),
      date: formData.date,
    };

    try {
      const res = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, payload);
      console.log("New expense added:", res.data);
      // Prepend the new expense record to the existing list.
      setExpenses([res.data, ...expenses]);
      // Reset the form data and close the form.
      setFormData({ icon: "", category: "", amount: "", date: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  // New function to handle downloading expense data
  const handleDownload = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        responseType: "blob", // Ensures the file data is received properly.
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_data.csv"); // Update filename/extension as needed.
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading expense:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Expense Page</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm((prev) => !prev)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <IoMdAdd className="mr-2" /> {showAddForm ? "Cancel" : "Add Expense"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download Expense
            </button>
          </div>
        </div>

        {showAddForm && (
          <div className="mt-6">
            <form onSubmit={handleFormSubmit} className="bg-white shadow rounded-lg p-6">
              <div className="mb-4">
                <label className="block text-gray-700">Icon (Emoji)</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    readOnly
                    placeholder="Choose Emoji or leave empty"
                    className="mt-1 block w-full border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                    className="bg-gray-200 px-2 py-1 rounded"
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
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Food, Travel, Shopping, etc."
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md"
                />
              </div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Submit
              </button>
            </form>
          </div>
        )}

        {Array.isArray(expenses) && expenses.length === 0 ? (
          <div className="mt-6 p-4 bg-white shadow rounded-lg text-center text-gray-500">
            No expense records available yet. Start by adding your expense.
          </div>
        ) : (
          <>
            <div className="mt-6">
              <ExpenseLineChart expenses={expenses} />
            </div>
            <div className="mt-6">
              <ExpenseList expenses={expenses} onDelete={handleDelete} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ExpensePage;
