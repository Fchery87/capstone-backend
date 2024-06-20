import multer from 'multer';
import Event from '../models/Event.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single('image');

export const createEvent = async (req, res) => {
  const { title, description, date, time, endTime, location, category, creator } = req.body;
  let imageUrl = '';

  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
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

    await event.save();
    res.json(event);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

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

export const updateEvent = async (req, res) => {
  const { title, description, date, time, endTime, location, category, creator } = req.body;
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event.title = title;
    event.description = description;
    event.date = new Date(date).toISOString(); // Store date as UTC
    event.time = time;
    event.endTime = endTime;
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
