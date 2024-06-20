import express from 'express';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, rsvpEvent, uploadMiddleware } from '../controllers/eventController.js';

const router = express.Router(); // Creating a router instance

// Route to create a new event, using uploadMiddleware to handle file uploads
router.post('/', uploadMiddleware, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);

// Route to update an event by its ID, using uploadMiddleware to handle file uploads
router.put('/:id', uploadMiddleware, updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/rsvp', rsvpEvent);

export default router;
