const mongoose = require("mongoose");

// Expense schema for tracking user spending
const ExpenseSchema = new mongoose.Schema({
      userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Reference to user who owns this expense
      icon: {type: String}, // Emoji or icon representing the expense category
      category: {type: String, required: true}, // Expense category (e.g., food, transport, entertainment)
      amount: {type: Number, required: true}, // Expense amount in currency units
      date: {type: Date, default: Date.now} // When the expense occurred, defaults to current time
}, {timestamps: true}); // Automatically track creation and update times

module.exports = mongoose.model("Expense", ExpenseSchema);