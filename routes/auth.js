import express from 'express'; // Bringing in express to handle routes
import bcrypt from 'bcryptjs'; // Bringing in bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Bringing in JWT for generating tokens
import User from '../models/User.js'; // Importing the User model

const router = express.Router(); // Creating a router instance

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, city, state, country, isAdult } = req.body; // Get user details from request body
  console.log('Received data:', req.body); // Log the received data

  // Check if the user is an adult
  if (!isAdult) {
    return res.status(400).json({ msg: 'You must be 18 years or older to register.' });
  }

  // Check if username, email, and password are provided
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Username, email, and password are required.' });
  }

  try {
    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already in use.' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, city, state, country });
    await user.save(); // Save the new user

    // Create and send a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token }); // Send back the user and token
  } catch (error) {
    console.error('Error during registration:', error); // Log the error
    res.status(500).json({ msg: 'Server error', error: error.message }); // Server error if something goes wrong
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // Get login details from request body
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'User not found' }); // If user not found, send 400

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' }); // If passwords don't match, send 400

    // Create and send a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token }); // Send back the user and token
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    res.status(500).json({ msg: 'Server error', error: error.message }); // Server error if something goes wrong
  }
});

export default router; // Export the router
