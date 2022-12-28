const router = require('express').Router();

const AppointmentController = require('../Controllers/AppointmentController');

router.post('/Add', AppointmentController.createAppointment);
router.get('/all', AppointmentController.getAppointments);
router.delete('/delete/:id', AppointmentController.delete);

module.exports = router;
