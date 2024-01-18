const express = require('express');
const connection = require('../../connection');
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
        const result = await appointmentService.getAppointments(appointment.doctorId);
    } catch (ex) {
        return res.status(500).json({
            success: 0,
            data: `Unable to get appointments for doctor ${req.params.doctorId}`
        });
    }
    
});


module.exports = router;