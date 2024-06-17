import multer from 'multer';
import Event from '../models/Event.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single('image');

export const createEvent = async (req, res) => {
  const { title, description, date, time, location, category, creator } = req.body;
  let imageUrl = '';

  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const utcDate = new Date(date);

  try {
    const event = new Event({
      title,
      description,
      date: utcDate,
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

export const updateEvent = async (req, res) => {
  const { title, description, date, time, location, category, creator } = req.body;
  let imageUrl = req.body.imageUrl;

  if (req.file) {
    imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  }

  const utcDate = new Date(date);

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event.title = title;
    event.description = description;
    event.date = utcDate;
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
