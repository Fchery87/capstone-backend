const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
  creator: { type: String, required: true },
});

module.exports = mongoose.model('Event', EventSchema);
