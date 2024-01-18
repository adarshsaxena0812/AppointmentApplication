import { Injectable } from "@angular/core";
import { Appointment } from "../models/appointment";

@Injectable({providedIn: "root"})
export class AppointmentService {

    filterAppointment(appointments, fromDate: string, toDate: string) {
        const fromDateTime = new Date(new Date(fromDate).toUTCString()).setHours(0, 0, 0, 0);
        const toDateTime = new Date(new Date(toDate).toUTCString()).setHours(23, 59, 59, 0);

        const filteredApplontments = appointments.filter((appointment) => {
            return appointment.startTime >=  fromDateTime
                && appointment.endTime <= toDateTime;
        });

        return this.sortAppointment(filteredApplontments);

    }

    sortAppointment(appointments) {
        return appointments.sort((a, b) => {
            return a.startTime - b.startTime
        })
    }
}