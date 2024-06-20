import multer from 'multer'; // Bringing in multer for file uploads
import Event from '../models/Event.js'; // Importing the Event model

const storage = multer.memoryStorage(); // Storing files in memory
const upload = multer({ storage }); // Configuring multer with memory storage

export const uploadMiddleware = upload.single('image'); // Middleware for single image upload

// Create a new event
export const createEvent = async (req, res) => {
  const { title, description, date, time, endTime, location, category, creator } = req.body; // Get event details from request body
  let imageUrl = '';

  // If there's an image, convert it to base64
  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    // Create a new event with the details
    const event = new Event({
      title,
      description,
      date: new Date(date).toISOString(), // Store date as UTC
      time,
      endTime,
      location,
      category,
      imageUrl,
      creator,
    });

    await event.save(); // Save the event
    res.json(event); // Send back the event
  } catch (err) {
    console.error('Error creating event:', err); // Log the error
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find(); // Find all events
    res.json(events); // Send back the events
  } catch (err) {
    console.error('Error fetching events:', err); // Log the error
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};

// Get a single event by ID
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find the event by ID
    if (!event) return res.status(404).json({ msg: 'Event not found' }); // If not found, send 404
    res.json(event); // Send back the event
  } catch (err) {
    console.error('Error fetching event:', err); // Log the error
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
  const { title, description, date, time, endTime, location, category, creator } = req.body; // Get updated event details
  let imageUrl = req.body.imageUrl;

  // If there's a new image, convert it to base64
  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    let event = await Event.findById(req.params.id); // Find the event by ID
    if (!event) return res.status(404).json({ msg: 'Event not found' }); // If not found, send 404

    // Update the event details
    event.title = title;
    event.description = description;
    event.date = new Date(date).toISOString(); // Store date as UTC
    event.time = time;
    event.endTime = endTime;
    event.location = location;
    event.category = category;
    event.imageUrl = imageUrl || event.imageUrl;
    event.creator = creator;

    await event.save(); // Save the updated event
    res.json(event); // Send back the updated event
  } catch (err) {
    console.error('Error updating event:', err); // Log the error
    res.status(500).json({ msg: 'Server error', error: err.message }); // Server error if something goes wrong
  }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id); // Find and delete the event
    if (!event) return res.status(404).json({ msg: 'Event not found' }); // If not found, send 404

    res.json({ msg: 'Event removed' }); // Event successfully removed
  } catch (err) {
    console.error('Error deleting event:', err); // Log the error
    res.status(500).json({ msg: 'Server error', error: err.message }); // Server error if something goes wrong
  }
};

// RSVP for an event
export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find the event by ID
    if (!event) return res.status(404).json({ msg: 'Event not found' }); // If not found, send 404

    // Toggle RSVP: add user if not already an attendee, remove if they are
    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
    } else {
      event.attendees = event.attendees.filter(id => id !== req.user.id);
    }

    await event.save(); // Save the updated event
    res.json(event); // Send back the updated event
  } catch (err) {
    console.error('Error RSVPing event:', err); // Log the error
    res.status(500).json({ msg: 'Server error' }); // Server error if something goes wrong
  }
};
