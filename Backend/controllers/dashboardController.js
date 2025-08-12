const Income = require("../models/Income");
const Expense = require("../models/Expense");

const { isValidObjectId, Types } = require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
      try {
            const userId = req.user.id;
            const userObjectId = new Types.ObjectId(String(userId));

            // Fetch total income & expenses
            const totalIncome = await Income.aggregate([
                  { $match : {userId: userObjectId} },
                  { $group: { _id: null, total: {$sum: "$amount"} } },
            ]);

            console.log("totalIncome", {totalIncome, userId: isValidObjectId(userId)});

            const totalExpense = await Expense.aggregate([
                  { $match : {userId: userObjectId} },
                  { $group: { _id: null, total: {$sum: "$amount"} } },
            ]);


            // Get income transactions in the last 30 days
            const last30DaysIncomeTransactions = await Income.find({
                  userId,
                  date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 ) },
            }).sort({ date: -1 });

            // Get total income for the last 30 days
            const incomelast30Days = last30DaysIncomeTransactions.reduce(
                  (sum, transaction) => sum + transaction.amount, 
                  0
            );


            // Get expense transactions in the last 30 days
            const last30DaysExpenseTransactions = await Expense.find({
                  userId,
                  date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 ) },
            }).sort({ date: -1 });

            // Get total expense for the last 30 days
            const expenselast30Days = last30DaysExpenseTransactions.reduce(
                  (sum, transaction) => sum + transaction.amount, 
                  0
            );


            // Fetch last 10 transactions (income + expenses)
            const lastTransactions = [
                  ...(await Income.find({ userId }).sort({ date: -1 }).limit(10)).map(
                        (txn) => ({
                              ...txn.toObject(),
                              type: "income",
                        })
                  ),
                  ...(await Expense.find({ userId }).sort({ date: -1 }).limit(10)).map(
                        (txn) => ({
                              ...txn.toObject(),
                              type: "expense",
                        })
                  ),
            ].sort((a, b) => b.date - a.date); // Sort latest first


            // Final Response
            res.json({
                  totalBalance:
                        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),

                  totalIncome: totalIncome[0]?.total || 0,

                  totalExpense: totalExpense[0]?.total || 0,

                  last30DaysExpenses: {
                        total: expenselast30Days,
                        transactions: last30DaysExpenseTransactions,
                  },

                  last30DaysIncome: {
                        total: incomelast30Days,
                        transactions: last30DaysIncomeTransactions
                  },

                  recentTransactions: lastTransactions,
            });

      }
      catch(err) {
            res.status(500).json({ message: "Error fetching dashboard data!😢 ", error: err.message });
      }
}