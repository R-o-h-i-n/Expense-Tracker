const User = require("../models/User.js")
const jwt = require("jsonwebtoken");

// Generate JWT token for user authentication
const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register new user account
exports.registerUser = async(req, res) => {
	const {fullName, email, password, profileImageURL} = req.body;

      // Input validation: Ensure all required fields are present
      if(!fullName || !email || !password) {
            return res.status(400).json({message: " All fields are required! "});
      }
      try {
            // Check if email is already registered to prevent duplicates
            const existingUser = await User.findOne({email});
            if (existingUser) {
                  return res.status(400).json({message: " Email already in use! "});
            }

            // Create new user with hashed password (handled by pre-save middleware)
            const user = await User.create({
                  fullName,
                  email,
			password,
			profileImageURL,
            });

            // Return user data and authentication token
            res.status(201).json({
                  id: user._id,
                  user,
                  token: generateToken(user._id),
            });
      }
      catch(err) {
            res
                  .status(500)
                  .json({ message: "Error registering user!😢 ", error: err.message});
      }
};

// Authenticate existing user and provide access token
exports.loginUser = async(req, res) => {
      const { email, password } = req.body;
      if( !email || !password) {
            return res.status(400).json({message: "All fields are required!"});
      }
      try{
            // Find user by email and verify password
            const user = await User.findOne({ email });
            if(!user || !(await user.comparePassword(password))) {
                  return res.status(400).json({message: "Invalid Credentials!"});
            }

            // Return user data and new authentication token
            res.status(200).json({
                  id: user._id,
                  user,
                  token: generateToken(user._id),
            });
      } catch(err) {
            res
                  .status(500)
                  .json({ message: "Error logging in user!😢 ", error: err.message});
      }
};

// Retrieve current user information (requires authentication)
exports.getUserInfo = async(req, res) => {
      try {
            // Get user data excluding password field for security
            const user= await User.findById(req.user.id).select("-password");

            if (!user) {
                  return res.status(404).json({ message: "User not found!☠️ "});
            }

            res.status(200).json(user);
            
      } catch(err) {
            res
                  .status(500)
                  .json({ message: "Error fetching user info!😢 ", error: err.message});
      }
};