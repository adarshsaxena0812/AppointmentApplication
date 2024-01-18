import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { WorkingHoursUtil } from "../util/workingHourUtil";
import { environment } from "../../../environments/environment"

@Injectable({providedIn: "root"})
export class AvailableAppointmentService {

    endPointUrl: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getFirstAvailableAppointment(doctorId: number, desiredAppointmentDateTime: string, duration: string): any {
        const numberOfDaysToLookForAppointment = 5;
        const desiredAppointmentTime = new Date(desiredAppointmentDateTime).getTime();
        const endDateAppointment = WorkingHoursUtil.getEndDate(desiredAppointmentDateTime, numberOfDaysToLookForAppointment);
        const durationOfAppointment = Number(duration) * 60 * 1000;
        const req = {
            doctorId,
            desiredAppointmentTime,
            endDateAppointment,
            durationOfAppointment
        };

        return this.http.post(`${this.endPointUrl}/appointment/getFirstAvailableTime`, req, {
            headers: new HttpHeaders().set('Content-Type', "application/json")
        });
    }
}