const xlsx=require('xlsx');
const Expense=require("../models/Expense");

exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
    console.error("Error adding income:", error); // Log the full error
    res.status(500).json({ message: "Server Error", error: error.message });
}

};

exports.getAllExpense = async (req, res) => {
    const userId=req.user.id;
    try{
        const expense=await Expense.find({ userId }).sort({date : -1});
        res.json(expense);
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
};
// Delete Income Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Download Excel (Memory-Safe Buffer Stream)
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toLocaleDateString() : "",
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        
        // Write workbook to memory buffer instead of writing a local file to disk
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", "attachment; filename=\"expense_details.xlsx\"");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (error) {
        console.error("Error exporting expense excel:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
