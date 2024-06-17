import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  country: { type: String },
});

// Adding indexes to optimize search queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;
