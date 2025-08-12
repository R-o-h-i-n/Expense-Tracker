const xlsx = require('xlsx');
const Expense = require("../models/Expense.js");

// Add Expense Source
exports.addExpense = async(req, res) => {
      const userId = req.user.id;

      try{
            const { icon, category, amount, date } = req.body;

            // Validation : Check for missing fields
            if (!category || !amount || !date) {
                  return res.status(400).json({message: "All fields are required!"});
            }

            const newExpense = new Expense({
                  userId,
                  icon,
                  category,
                  amount,
                  date: new Date(date),
            });

            await newExpense.save();
            res.status(201).json({message: "Expense added successfully!", newExpense});
      }
      catch(err) {
            res.status(500).json({message: "Error adding Expense!😢 ", error: err.message});
      }
}


// Get all Expense Source
exports.getAllExpense = async(req, res) => {
      const userId = req.user.id;

      try {
            const expense = await Expense.find({ userId }).sort({ date: -1 });
            res.json(expense);
      } catch (err) {
            res.status(500).json({ message: "Error fetching Expense!😢 ", error: err.message });
      }
}

// Delete Expense Source
exports.deleteExpense = async(req, res) => {
   
      try {
            await Expense.findByIdAndDelete(req.params.id);
            res.json({ message : " Expense deleted successfully! "});
      } catch(err) {
            res.status(500).json({ message: "Error deleting Expense!😢 ", error: err.message });
      }
}

// Download Expense in Excel
exports.downloadExpenseExcel = async(req, res) => {
      const userId = req.user.id;

      try{
            const expense = await Expense.find({userId}).sort({date: -1});

            // Prepare data for excel
            const data = expense.map((item)=> ({
                  Category: item.category,
                  Amount: item.amount,
                  Date: item.date,
            }));

            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(wb, ws, "Expense");
            xlsx.writeFile(wb, 'Expense_details.xlsx');
            res.download('Expense_details.xlsx');
      } catch(err) {
            res.status(500).json({ message: "Error downloading Expense excel!😢 ", error: err.message });
      }
}