const mongoose = require("mongoose");

// Establish connection to MongoDB database
const connectDB = async() => {
      try {
            // Connect to MongoDB using connection string from environment variables
            await mongoose.connect(process.env.MONGO_URL, {});
            console.log("MongoDB connected!");
      } catch(err) {
            // Log connection error and exit process if database connection fails
            console.log("Error connecting to MongoDB", err);
            process.exit(1);
      }
};

module.exports = connectDB;