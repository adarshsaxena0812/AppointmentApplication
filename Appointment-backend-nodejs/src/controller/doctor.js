const express = require('express');
const router = express.Router();

const doctorService = require('../service/doctorService');

router.get('/getAll', async (req, res) => {
    try {
        const result = await doctorService.getAllDoctor();
        return res.status(200).json({
            success: 1,
            data: result
        });
    } catch(ex) {
        return res.status(500).json({
            success: 0,
            error: err
        });
    }
});

router.get('/getWorkingHours/:doctorId', async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const result = await doctorService.getWorkingHoursForDoctor(doctorId);
        return res.status(200).json({
            success: 1,
            data: result
        });
    } catch(ex) {
        return res.status(500).json({
            success: 0,
            error: err
        });
    }
});

module.exports = router;
