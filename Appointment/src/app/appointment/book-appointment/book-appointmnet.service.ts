import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BookingDetails } from "../models/bookingDetails";
import { Appointment } from "../models/appointment";

@Injectable({providedIn: "root"})
export class BookAppointmentService {

    allAppointmnet: any;
    endPointUrl: string = "https://bartiappointment-default-rtdb.firebaseio.com/appointment.json";

    constructor(private http: HttpClient) {}

    saveAppointment(doctorId: number, appointmnetStartTime: number, appointmentDuration: number) {
        let bookingDetails = new BookingDetails();
        bookingDetails.doctorId = doctorId;
        bookingDetails.appointmentStartTime = appointmnetStartTime;
        bookingDetails.appointmentEndTime = appointmnetStartTime + (appointmentDuration * 60 * 1000)

        return this.http.post(this.endPointUrl, bookingDetails);
    }

    fetchAppointment() {
        return this.http.get<{[key: string]: Appointment}>(this.endPointUrl)
            .pipe(map((res) => {
                const appointments: Appointment[] = [];
                for(const key in res) {
                    if(res.hasOwnProperty(key)) {
                        appointments.push({...res[key], id: key});
                    } 
                }
                return appointments 
            }));
    }

    checkConflictingAppointment(doctorId: number, appointmnetStartTime: number, appointments: Appointment[]): boolean {
        const conflictingAppointments = appointments.filter((appointment) => {
            return (doctorId === appointment.doctorId) 
                && (appointment.appointmentStartTime < appointmnetStartTime) 
                && (appointment.appointmentEndTime > appointmnetStartTime);
        });
        
        return conflictingAppointments.length > 0;
    }
}