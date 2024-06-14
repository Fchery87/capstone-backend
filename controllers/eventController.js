const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, description, date, time, location, category, imageUrl, creator } = req.body;

  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      location,
      category,
      imageUrl,
      creator,
    });

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, time, location, category, imageUrl, creator } = req.body;

  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, date, time, location, category, imageUrl, creator } },
      { new: true }
    );

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: 'Event not found' });

    await event.remove();
    res.json({ msg: 'Event removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
