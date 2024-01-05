import { Component, Input } from '@angular/core';

export class WorkingHour {
  day: string;
  hourFrom: number;
  hourTo: number;
}

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrl: './working-hours.component.css'
})
export class WorkingHoursComponent {

  @Input()
  workingHours: WorkingHour[];

}
