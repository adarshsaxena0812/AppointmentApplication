import { Component, Input } from '@angular/core';
import { WorkingHour } from '../../models/workingHour';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrl: './working-hours.component.css'
})
export class WorkingHoursComponent {

  @Input()
  workingHours: WorkingHour[];

}
