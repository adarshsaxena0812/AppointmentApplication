import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'workingHourDisplay'
})
export class WorkingHoursPipe implements PipeTransform {

    transform(fromHour: number, toHour: number) {
        let displayString = '';
        if (fromHour == 0 && toHour == 0) {
            displayString = 'Holiday';
        } else {
            if (fromHour > 0 && fromHour < 12) {
                displayString = `${fromHour}:00 AM`;
            } 
            if (toHour > 0 && toHour > 12) {
                displayString = `${displayString} to ${toHour - 12}:00 PM` 
            }    
        } 
        return displayString;
    }
}