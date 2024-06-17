const mongoose = require('mongoose');

// Yo, this function connects to our MongoDB database using the URI in the environment variables
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // If there's a problem, we outta here with a failure
  }
};

module.exports = connectDB;
