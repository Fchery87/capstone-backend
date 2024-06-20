import mongoose from 'mongoose';

// Schema for the user model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // User's username, must be unique
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  password: { type: String, required: true }, // User's password
  city: { type: String }, // User's city
  state: { type: String }, // User's state
  country: { type: String }, // User's country
});

// Adding an index for quicker email searches
userSchema.index({ email: 1 });

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

export default User; // Export the User model
