import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'displayDuration'
})
export class DurationCalculationPipe implements PipeTransform {

    transform(fromHour: number, toHour: number) {
        return `${(toHour - fromHour) / (60 * 1000)} minutes`
    }
}