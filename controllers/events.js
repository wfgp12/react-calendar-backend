const Event = require("../models/Event");

module.exports = {
    getEvents: async (req, res) => {
        try {
            const events = await Event.find().populate('user', 'name');
            res.json({
                ok: true,
                events
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error getting events'
            });
        }
    },
    createEvent: async (req, res) => {
        const { title, notes, start, end } = req.body;
        try {
            const event = new Event({ title, notes, start, end, user: req.user.uid });

            event.save();

            res.json({
                ok: true,
                msg: 'Event created',
                event
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error creating event'
            });
        }
    },
    updateEvent: async (req, res) => {
        const { id } = req.params;
        const { uid } = req.user;

        try {
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Event not found'
                });
            }

            if (event.user.toString() !== uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'You are not authorized to update this event'
                });
            }

            const newEvent = { ...req.body, user: uid }

            const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, { new: true });

            res.json({
                ok: true,
                msg: 'Events were updated',
                event: updatedEvent
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error updating event'
            });
        }
    },
    deleteEvent: async (req, res) => {
        const { id } = req.params;
        const { uid } = req.user;

        try {
            const event = await Event.findById(id);
            if (!event) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Event not found'
                });
            }

            if (event.user.toString() !== uid) {
                return res.status(401).json({
                    ok: false,
                    msg: 'You are not authorized to delete this event'
                });
            }

            await Event.findByIdAndDelete(id);

            res.json({
                ok: true,
                msg: 'Event was deleted'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                ok: false,
                msg: 'Error deleting event'
            });
        }
    }
}