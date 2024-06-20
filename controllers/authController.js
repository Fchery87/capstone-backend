import bcrypt from 'bcryptjs'; // Bringing in bcrypt for hashing passwords
import jwt from 'jsonwebtoken'; // Bringing in JWT for generating tokens
import User from '../models/User.js'; // Importing the User model

// Register a new user, hash their password before saving
export const register = async (req, res) => {
  const { username, email, password } = req.body; // Get user details from request body

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save(); // Save the new user

    // Create and send a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token }); // Send back the token
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};

// Login a user by checking credentials and returning a token
export const login = async (req, res) => {
  const { email, password } = req.body; // Get login details from request body

  try {
    // Find the user by email
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Create and send a JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token }); // Send back the token
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};
