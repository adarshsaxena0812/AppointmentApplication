import { Injectable } from "@angular/core";
import { WorkingHour } from "../models/workingHour";

@Injectable({providedIn: "root"})
export class DoctorService {

    getWorkingHours(doctorId: number): WorkingHour[] {
        if(doctorId == 1) {
            return [
                { day: 0, hourFrom:0, hourTo: 0 } as WorkingHour,
                { day: 1, hourFrom:9, hourTo: 17 } as WorkingHour,
                { day: 2, hourFrom: 9, hourTo: 17 } as WorkingHour,
                { day: 3, hourFrom: 9, hourTo: 17 } as WorkingHour,
                { day: 4, hourFrom: 9, hourTo: 17 } as WorkingHour,
                { day: 5, hourFrom: 9, hourTo: 17 } as WorkingHour,
                { day: 6, hourFrom: 0, hourTo: 0 } as WorkingHour
              ];
        } else if(doctorId == 2) {
            return [
                { day: 0, hourFrom:0, hourTo: 0 } as WorkingHour,
                { day: 1, hourFrom: 8, hourTo: 16 } as WorkingHour,
                { day: 2, hourFrom: 8, hourTo: 16 } as WorkingHour,
                { day: 3, hourFrom: 8, hourTo: 16 } as WorkingHour,
                { day: 4, hourFrom: 8, hourTo: 16 } as WorkingHour,
                { day: 5, hourFrom: 8, hourTo: 16 } as WorkingHour,
                { day: 6, hourFrom: 0, hourTo: 0 } as WorkingHour
              ];
        }

        return [];
    }
}