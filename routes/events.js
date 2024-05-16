/*
    Events Routes
    host + /api/events
*/

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');


const { isDate } = require('../helpers/isDate');
const { fieldValidate } = require('../middlewares/field-validator');
const { jwtValidate } = require('../middlewares/jwt-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');


router.use( jwtValidate );


// Get Events
router.get('/', getEvents);

// Create Event
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidate
    ],
    createEvent
);

// Update Event
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidate
    ],
    updateEvent);

// Delete Event
router.delete('/:id', deleteEvent);


module.exports = router;