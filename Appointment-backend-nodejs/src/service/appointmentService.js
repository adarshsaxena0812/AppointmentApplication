const connection = require('../../connection');

getAppointments = async (doctorId) => {
    return new Promise((resolve, reject) => {
        query = "select * from appointment where doctor_id = ?";
        connection.query(query, [doctorId], (err, results) => {
            if(!err) {
                const data = [];
                results.forEach(result => {
                    data.push({
                        doctorId: result.doctor_id,
                        startTime: result.start_time,
                        endTime: result.end_time
                    });
                });
                return resolve(data);
            } else {
                return reject(err);
            }
        });
    });
}

createAppointment = async (appointment) => {
    return new Promise((resolve, reject) => {
        query = "insert into appointment (doctor_id, start_time, end_time) values (?, ?, ?)";
        connection.query(query, [appointment.doctorId, appointment.appointmentStartTime, appointment.appointmentEndTime], (err, results) => {
            if(!err) {
                return resolve("Appointment Created");
            } else {
                return reject(err);
            }
        });
    });
}

checkConflictingAppointment = (appointments, appointmnetStartTime) => {
    const conflictingAppointments = appointments.filter((appointment) => {
        return (appointment.startTime <= appointmnetStartTime) 
            && (appointment.endTime >= appointmnetStartTime);
    });
    
    return conflictingAppointments.length > 0;
}

module.exports = { getAppointments, checkConflictingAppointment, createAppointment }