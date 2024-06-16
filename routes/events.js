import express from 'express';
import { createEvent, getEvents, getEvent, updateEvent, deleteEvent, rsvpEvent, uploadMiddleware } from '../controllers/eventController.js';

const router = express.Router();

router.post('/', uploadMiddleware, createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent);
router.put('/:id', uploadMiddleware, updateEvent);
router.delete('/:id', deleteEvent);
router.post('/:id/rsvp', rsvpEvent);

export default router;
