const express = require('express');
const connection = require('../../connection');
const router = express.Router();

router.get('/getAll', (req, res) => {

    query = "select * from doctor";
    connection.query(query, (err, results) => {
        if(!err) {
            const data = [];
            results.forEach(result => {
                data.push({
                    id: result.id,
                    name: result.name
                });
            });

            return res.status(200).json({data: results});
        }
        else {
            return res.status(500).json(err);
        }
    });
});

router.get('/getWorkingHours/:doctorId', (req, res) => {
    const doctorId = req.params.doctorId;
    query = "select * from working_hours where doctor_id = ?";
    connection.query(query, [doctorId], (err, results) => {
        if(!err) {
            const data = [];
            results.forEach(result => {
                data.push({
                    day: result.day_of_week,
                    hourFrom: result.hour_from,
                    hourTo: result.hour_to
                });
            });
            return res.status(200).json({data});
        }
        else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;