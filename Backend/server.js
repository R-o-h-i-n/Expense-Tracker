require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js")

const app = express();

// Middleware to handle CORS
app.use(
      cors({
            origin: process.env.CLIENT_URL || "*",
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ["Content-type", "Authorization"],
      })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);


//Server Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));