import { Injectable } from "@angular/core";
import { WorkingHoursUtil } from "../util/workingHourUtil";
import { Appointment } from "../models/appointment";

@Injectable({providedIn: "root"})
export class AvailableAppointmentService {

    getFirstAvailableAppointment(appointments: Appointment[], desiredAppointmentDateTime: string, duration: string): number {
        const numberOfDaysToLookForAppointment = 5;
        const desiredAppointmentTime = new Date(desiredAppointmentDateTime).getTime();
        const endDateAppointment = WorkingHoursUtil.getEndDate(desiredAppointmentDateTime, numberOfDaysToLookForAppointment);
        const durationofAppointment = Number(duration) * 60 * 1000;
        const appointmentOnGivenDate: Appointment[] = this.filterAppointmentsFromDesiredDate(appointments, desiredAppointmentTime, endDateAppointment);

        if(appointmentOnGivenDate.length > 0) {
            let sortedAppointments = this.sortAppointmentByEndDate(appointmentOnGivenDate);

            let isAppointmentFound = false;
            let appointmentStartTime;
            let appointmentEndTime;
            for(let index = 0; (index < (sortedAppointments.length - 1) && !isAppointmentFound); index++) {
                appointmentStartTime = sortedAppointments[index].appointmentEndTime;
                appointmentEndTime = appointmentStartTime + durationofAppointment;
                const nextAppointmentStartTime = sortedAppointments[index+1]?.appointmentStartTime;
                if(appointmentEndTime <= nextAppointmentStartTime) {
                    isAppointmentFound = true;
                    break;
                }
            }
            if(isAppointmentFound) {
                return appointmentStartTime;
            } else {
                return sortedAppointments[sortedAppointments.length - 1].appointmentEndTime;
            }
        }
        
        return desiredAppointmentTime;

    }

    filterAppointmentsFromDesiredDate(appointments: Appointment[], desiredAppointmentDateTime: number, endDate: number) {
        return appointments.filter(appointment => {
            return appointment.appointmentStartTime > desiredAppointmentDateTime && appointment.appointmentEndTime < endDate;
        });
    }

    sortAppointmentByEndDate(appointments: Appointment[]): Appointment[] {
        return appointments.sort((a, b) => {
            return a.appointmentEndTime - b.appointmentEndTime
        })
    }

    createAppointment(doctorId, startTime, endTime) {
        return {
            doctorId: doctorId,
            appointmentStartTime: new Date(startTime).getTime(),
            appointmentEndTime: new Date(endTime).getTime()
        } as Appointment;
    }
}