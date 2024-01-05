import { Injectable } from "@angular/core";
import { WorkingHour } from "./working-hours/working-hours.component";

@Injectable({providedIn: "root"})
export class DoctorService {

    getWorkingHours(doctorId: number): WorkingHour[] {
        if(doctorId == 1) {
            return [
                { day: "Monday", hourFrom: 9, hourTo: 5 } as WorkingHour,
                { day: "Tuesday", hourFrom: 9, hourTo: 5 } as WorkingHour,
                { day: "Wednesday", hourFrom: 9, hourTo: 5 } as WorkingHour,
                { day: "Thursday", hourFrom: 9, hourTo: 5 } as WorkingHour,
                { day: "Friday", hourFrom: 9, hourTo: 5 } as WorkingHour
              ];
        } else if(doctorId == 2) {
            return [
                { day: "Monday", hourFrom: 8, hourTo: 4 } as WorkingHour,
                { day: "Tuesday", hourFrom: 8, hourTo: 4 } as WorkingHour,
                { day: "Wednesday", hourFrom: 8, hourTo: 4 } as WorkingHour,
                { day: "Thursday", hourFrom: 8, hourTo: 4 } as WorkingHour,
                { day: "Friday", hourFrom: 8, hourTo: 4 } as WorkingHour
              ];
        }

        return [];
    }
}