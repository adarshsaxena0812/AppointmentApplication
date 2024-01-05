import { Component, OnInit } from '@angular/core';
import { WorkingHour } from './working-hours/working-hours.component';
import { DoctorService } from './doctor.service';

export class Doctor {
  id: number
  name: String;
}

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {

  doctors: Doctor[] = [
    {id: 0, name: ""},
    {id: 1, name: "Stranger"},
    {id: 2, name: "Who"}
  ];
  workingHours: WorkingHour[];
  selectedDoctor: number;

  constructor(private doctorService: DoctorService) {}

  loadWorkingHours() {
    this.workingHours = this.doctorService.getWorkingHours(this.selectedDoctor);
  }
}
