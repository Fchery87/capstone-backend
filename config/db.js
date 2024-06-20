const mongoose = require('mongoose');

// This function hooks us up with MongoDB using the URI from environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('MongoDB connected'); // MongoDB is live, baby
  } catch (err) {
    console.error(err.message); // Log the error if there's a problem
    process.exit(1); // We outta here if connection fails
  }
};

module.exports = connectDB; // Exporting the connection function
