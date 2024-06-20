import mongoose from 'mongoose';

// Schema for the event model
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Event title
  description: { type: String, required: true }, // Event description
  date: { type: Date, required: true }, // Event date
  time: { type: String, required: true }, // Event time
  location: { type: String, required: true }, // Event location
  category: { type: String, required: true }, // Event category
  imageUrl: { type: String }, // URL of event image
  creator: { type: String, required: true }, // Who created the event
});

// Adding indexes for quicker searches
eventSchema.index({ title: 1 });
eventSchema.index({ date: 1 });

// Create the Event model using the schema
const Event = mongoose.model('Event', eventSchema);

export default Event; // Export the Event model
