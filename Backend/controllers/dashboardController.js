const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Convert userId correctly into an ObjectId.
    const userObjectId = new Types.ObjectId(userId);

    // Fetch total income & expenses using aggregation.
    const [totalIncome, totalExpense] = await Promise.all([
      Income.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]).then((result) => result[0]?.total || 0),

      Expense.aggregate([
        { $match: { userId: userObjectId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]).then((result) => result[0]?.total || 0),
    ]);

    // Get income transactions in the last 60 days.
    const [last60DaysIncomeTransactions, incomeLast60Days] = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean()
      .then((transactions) => [
        transactions,
        transactions.reduce((sum, txn) => sum + txn.amount, 0),
      ]);

    // Get expense transactions in the last 30 days.
    const [last30DaysExpenseTransactions, expensesLast30Days] = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean()
      .then((transactions) => [
        transactions,
        transactions.reduce((sum, txn) => sum + txn.amount, 0),
      ]);

    // Fetch last 5 transactions (both income and expenses).
    const lastTransactions = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5).lean(),
      Expense.find({ userId }).sort({ date: -1 }).limit(5).lean(),
    ]).then(([incomeTxns, expenseTxns]) =>
      [
        ...incomeTxns.map((txn) => ({ ...txn, type: "income" })),
        ...expenseTxns.map((txn) => ({ ...txn, type: "expense" })),
      ]
    );

    // Fetch all income transactions in the past 365 days.
    const yearIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    // Fetch all expense transactions in the past 365 days.
    const yearExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
    })
      .sort({ date: -1 })
      .lean();

    // Combine year-long transactions and add a type property.
    const yearTransactions = [
      ...yearIncomeTransactions.map((txn) => ({ ...txn, type: "income" })),
      ...yearExpenseTransactions.map((txn) => ({ ...txn, type: "expense" })),
    ];

    // Fetch ALL income transactions till now.
    const allIncomeTransactions = await Income.find({ userId })
      .sort({ date: -1 })
      .lean();

    // Fetch ALL expense transactions till now.
    const allExpenseTransactions = await Expense.find({ userId })
      .sort({ date: -1 })
      .lean();

    // Final Response.
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome: totalIncome,
      totalExpenses: totalExpense,
      last30DaysExpenses: {
        total: expensesLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
      yearTransactions, // Full year's transaction data.
      allIncomeTransactions, // All income records till now.
      allExpenseTransactions, // All expense records till now.
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
