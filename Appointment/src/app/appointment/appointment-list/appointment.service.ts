import { Injectable } from "@angular/core";
import { Appointment } from "../book-appointment/book-appointmnet.service";

@Injectable({providedIn: "root"})
export class AppointmentService {

    filterAppointment(doctorId: number, appointments: Appointment[], fromDate: string, toDate: string) {
        const fromDateTime = new Date(new Date(fromDate).toUTCString()).setHours(0, 0, 0, 0);
        const toDateTime = new Date(new Date(toDate).toUTCString()).setHours(23, 59, 59, 0);

        const filteredApplontments: Appointment[] = appointments.filter((appointment) => {
            return appointment.doctorId === doctorId
                && appointment.appointmentStartTime >=  fromDateTime
                && appointment.appointmentEndTime <= toDateTime;
        });

        return this.sortAppointment(filteredApplontments);

    }

    sortAppointment(appointments: Appointment[]): Appointment[]{
        return appointments.sort((a, b) => {
            return a.appointmentStartTime - b.appointmentStartTime
        })
    }
}