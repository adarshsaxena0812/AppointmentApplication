import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { BookingDetails } from "../models/bookingDetails";
import { Appointment } from "../models/appointment";
import { environment } from "../../../environments/environment"

@Injectable({providedIn: "root"})
export class BookAppointmentService {

    allAppointmnet: any;
    // endPointUrl: string = "https://bartiappointment-default-rtdb.firebaseio.com/appointment.json";
    endPointUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    saveAppointment(doctorId: number, appointmnetStartTime: number, appointmentDuration: number): any {    
        let bookingDetails = new BookingDetails();
        bookingDetails.doctorId = doctorId;
        bookingDetails.appointmentStartTime = appointmnetStartTime;
        bookingDetails.appointmentEndTime = appointmnetStartTime + (appointmentDuration * 60 * 1000)

        return this.http.post(`${this.endPointUrl}/appointment/bookAppointment`, bookingDetails, {
            headers: new HttpHeaders().set('Content-Type', "application/json")
        });
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
}