import { Injectable } from "@angular/core";
import { WorkingHour } from "../doctor/working-hours/working-hours.component";

@Injectable({providedIn: "root"})
export class WorkingHoursUtil {

    validateWorkingHours(workingHours: WorkingHour[], startTimeStr: string) {
        const appointmentDate = new Date(startTimeStr);
        const appointmentDay = appointmentDate.getDay();
        const workingHour = workingHours.find((workingHour) => {
          return workingHour.day === appointmentDay;
        });
    
        const appointmentHour = appointmentDate.getHours();
        const appointmentMin = appointmentDate.getMinutes();
    
        if (workingHour) {
          if(workingHour.hourFrom === 0 && workingHour.hourTo === 0) {
            return false;
          } else if (appointmentHour < workingHour.hourFrom) {
            return false;
          } else if ((appointmentHour > workingHour.hourTo) || (appointmentHour == workingHour.hourTo && appointmentMin > 0)) {
            return false;
          }
          return true;
        }
    
        return false;
    }

}