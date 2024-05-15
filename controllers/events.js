const { response } = require('express');
const Event = require('../models/event-model');


const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                              .populate('user', 'name');


    res.status(200).json({
        ok: true,
        events
    })

}

const createEvent = async(req, res) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;

        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'

        })
    }
}

const updateEvent = async(req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para editar este evento'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent );

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'
        })
    }

}

const deleteEvent = async(req, res) => {

    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById( eventId );

        if( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        if( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario no autorizado para eliminar este evento'
            })
        }


        await Event.findByIdAndDelete( eventId );


        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'
        })
    }

}



module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}