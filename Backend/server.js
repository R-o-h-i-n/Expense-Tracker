const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes.js");
const incomeRoutes = require("./routes/incomeRoutes.js");
const expenseRoutes = require("./routes/expenseRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");


// Load environment variables
dotenv.config({ path: "./.env" });

// Connect to the database
connectDB();


// Initialize Express app
const app = express();


// Middleware: Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Middleware: Parse JSON and URL-encoded bodies
app.use(express.json()); // ✅ Needed for req.body to work
app.use(express.urlencoded({ extended: true }));


// Serve static files from "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);


// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));