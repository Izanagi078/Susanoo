const xlsx=require('xlsx');
const Income=require("../models/Income");

exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
    console.error("Error adding income:", error); // Log the full error
    res.status(500).json({ message: "Server Error", error: error.message });
}

};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
    const userId=req.user.id;
    try{
        const income=await Income.find({ userId }).sort({date : -1});
        res.json(income);
    }
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
};
// Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// Download Excel (Memory-Safe Buffer Stream)
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date ? new Date(item.date).toLocaleDateString() : "",
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        
        // Write workbook to memory buffer instead of writing a local file to disk
        const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", "attachment; filename=\"income_details.xlsx\"");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (error) {
        console.error("Error exporting income excel:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
