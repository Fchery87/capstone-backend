import multer from 'multer';
import Event from '../models/Event.js';

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single('image');

// Create a new event with all the provided details
export const createEvent = async (req, res) => {
  const { title, description, date, time, location, category, creator } = req.body;
  let imageUrl = '';

  // If there's an image, convert it to base64 format
  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    // Save the event to the database
    const event = new Event({
      title,
      description,
      date: new Date(date).toISOString(), // Store date as UTC
      time,
      location,
      category,
      imageUrl,
      creator,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fetch all events from the database
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fetch a single event by its ID
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update an existing event with new details
export const updateEvent = async (req, res) => {
  const { title, description, date, time, location, category, creator } = req.body;
  let imageUrl = req.body.imageUrl;

  // If there's a new image, convert it to base64 format
  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    // Update the event details
    event.title = title;
    event.description = description;
    event.date = new Date(date).toISOString(); // Store date as UTC
    event.time = time;
    event.location = location;
    event.category = category;
    event.imageUrl = imageUrl || event.imageUrl;
    event.creator = creator;

    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete an event by its ID
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// RSVP to an event, either adding or removing the user from the attendees list
export const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
    } else {
      event.attendees = event.attendees.filter(id => id !== req.user.id);
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Error RSVPing event:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
