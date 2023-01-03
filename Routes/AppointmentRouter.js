const router = require('express').Router();

const AppointmentController = require('../Controllers/AppointmentController');

router.post('/Add', AppointmentController.createAppointment);
router.get('/all', AppointmentController.getAppointments);
router.get('/allApp', AppointmentController.getAppointments2);
router.delete('/delete/:id', AppointmentController.delete);

module.exports = router;
