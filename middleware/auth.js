const jwt = require('jsonwebtoken');

// Middleware to check if the request has a valid JWT token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token'); // Get the token from the request header
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' }); // No token, no access

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach the decoded user to the request
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' }); // Invalid token, no access
  }
};

module.exports = auth; // Export the auth middleware
