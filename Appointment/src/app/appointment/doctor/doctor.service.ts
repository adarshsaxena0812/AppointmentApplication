import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment"

@Injectable({providedIn: "root"})
export class DoctorService {

    endpointUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getDoctorList(): any {
        return this.http.get(`${this.endpointUrl}/doctor/getAll`, {
            headers: new HttpHeaders().set('Content-Type', "application/json")
        });
    }
    
    getWorkingHours(doctorId: number): any {
        return this.http.get(`${this.endpointUrl}/doctor/getWorkingHours/${doctorId}`, {
            headers: new HttpHeaders().set('Content-Type', "application/json")
        });
    }
}