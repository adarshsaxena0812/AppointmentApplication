const connection = require('../../connection');

getWorkingHoursForDoctor = async (doctorId) => {
    return new Promise((resolve, reject) => {
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

                return resolve(data);
            }
            else {
                return reject(err);
            }
        });
    });
}

getAllDoctor = async () => {
    return new Promise((resolve, reject) => {
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

                return resolve(data);
            }
            else {
                return reject(err);
            }
        });
    });
}

module.exports = { getWorkingHoursForDoctor, getAllDoctor }