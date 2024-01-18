const express = require('express');
const router = express.Router();

const appointmentService = require('../service/appointmentService');

router.post('/bookAppointment', async (req, res) => {
    try {
        const appointment = req.body;
        const result = await appointmentService.getAppointments(appointment.doctorId);

        const hasConflictingAppointment = appointmentService.checkConflictingAppointment(result, appointment.appointmentStartTime);
        if(hasConflictingAppointment) {
            return res.status(200).json({
                success: 0,
                message: 'There are conflicting appointment'
            });        
        } else {
            await appointmentService.createAppointment(appointment);
            return res.status(200).json({
                success: 1,
                message: 'Appointment saved'
            });
        }
    } catch(ex) {
        return res.status(500).json({
            success: 0,
            data: "Unable to create appointment"
        });
    }
});

router.get('/getAppointment/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const result = await appointmentService.getAppointments(doctorId);
        return res.status(200).json({
            success: 1,
            data: result
        });
    } catch (ex) {
        return res.status(500).json({
            success: 0,
            data: `Unable to get appointments for doctor ${req.params.doctorId}`
        });
    }
});

router.post('/getFirstAvailableTime', async (req, res) => {
    try {
        const body = req.body;
        const appointments = await appointmentService.getAppointments(body.doctorId);
        const firstAvailableTime = appointmentService.getFirstAvailableDateTime(appointments, body.desiredAppointmentTime, body.endDateAppointment, body.durationOfAppointment);
        return res.status(200).json({
            success: 1,
            data: firstAvailableTime
        });
    } catch(ex) {
        return res.status(500).json({
            success: 0,
            data: `Unable to calculate first available time for doctor ${req.body.doctorId}`
        });
    }

});

module.exports = router;