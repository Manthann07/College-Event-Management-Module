const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware to verify JWT token
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Session expired. Please login again.' });
  }
};

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
});

// Create new event
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, eventType, date, time, venue } = req.body;
    const event = new Event({
      title,
      description,
      eventType,
      date,
      time,
      venue,
      image: req.file ? req.file.path : '',
      createdBy: req.userId
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
});

// Update event
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, description, eventType, date, time, venue } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.eventType = eventType || event.eventType;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;
    event.image = req.file ? req.file.path : event.image;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error: error.message });
  }
});

// Delete event
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error: error.message });
  }
});

// Search events
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { eventType: { $regex: query, $options: 'i' } }
      ]
    }).populate('createdBy', 'name email');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error searching events', error: error.message });
  }
});

module.exports = router; 