const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

// User schema definition with authentication fields
const UserSchema = new mongoose.Schema(
      {
            fullName: {type: String, required: true},        // User's full name
            email: {type: String, required: true, unique: true}, // Unique email for login
            password: {type: String, required: true},        // Hashed password
		profileImageURL: {type: String, default: null}, // Optional profile picture
      }, {timestamps: true} // Automatically add createdAt and updatedAt fields
);

// Pre-save middleware: Hash password before saving to database
UserSchema.pre("save", async function(next) {
      if(!this.isModified("password")) 
            return next();
      this.password = await bcrypt.hash(this.password, 10); // Hash with salt rounds of 10
      next();
});

// Instance method: Compare candidate password with stored hash
UserSchema.methods.comparePassword = async function (candidatePassword) {
      return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);