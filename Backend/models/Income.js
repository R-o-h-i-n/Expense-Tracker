const mongoose = require("mongoose");

// Income schema for tracking user earnings
const IncomeSchema = new mongoose.Schema({
      userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, // Reference to user who owns this income
      icon: {type: String}, // Emoji or icon representing the income source
      source: {type: String, required: true}, // Income source (e.g., salary, freelance, investment)
      amount: {type: Number, required: true}, // Income amount in currency units
      date: {type: Date, default: Date.now} // When the income was received, defaults to current time
}, {timestamps: true}); // Automatically track creation and update times

module.exports = mongoose.model("Income", IncomeSchema);