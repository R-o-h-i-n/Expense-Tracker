const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Database connection utility
const connectDB = require("./config/db.js");

// Route handlers for different API endpoints
const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

// Establish database connection
connectDB();

// Initialize Express application
const app = express();

// Middleware: Enable Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware: Parse JSON and URL-encoded request bodies
app.use(express.json()); // ✅ Needed for req.body to work
app.use(express.urlencoded({ extended: true }));

// Serve static files from "uploads" directory for profile images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes - Version 1
app.use("/api/v1/auth", authRoutes);        // Authentication endpoints
app.use("/api/v1/income", incomeRoutes);    // Income management endpoints
app.use("/api/v1/expense", expenseRoutes);  // Expense management endpoints
app.use("/api/v1/dashboard", dashboardRoutes); // Dashboard data endpoints

// Start the server on specified port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));