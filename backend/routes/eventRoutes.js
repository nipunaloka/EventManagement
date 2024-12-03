// routes/eventRoutes.js
const express = require('express');
const { createEvent, getEvents, updateEvent, deleteEvent } = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authMiddleware'); // Ensure admin check

const router = express.Router();

// Route for creating an event (admin only)
router.post('/', verifyToken, createEvent);  // Ensure this matches the URL you're using

// Route for getting all events
router.get('/', getEvents);  // Make sure it's `/events`

// Route for updating an event
router.put('/:id', verifyToken, updateEvent);

// Route for deleting an event
router.delete('/:id', verifyToken, deleteEvent);

module.exports = router;
