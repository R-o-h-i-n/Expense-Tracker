const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes by verifying JWT authentication
exports.protect = async (req, res, next) => {
    let token;

    // Extract Bearer token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token found!" });
    }

    try {
        // Verify the JWT token and decode user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID and attach to request object (excluding password)
        req.user = await User.findById(decoded.id).select("-password");

        // Ensure user still exists in database
        if (!req.user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Token verification failed (expired, invalid, etc.)
        return res.status(401).json({ message: "Not authorized, token failed!" });
    }
};
