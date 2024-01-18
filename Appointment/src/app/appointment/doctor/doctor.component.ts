import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DoctorService } from "./doctor.service";
import { WorkingHour } from "../models/workingHour";
import { Doctor } from "../models/doctor";

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent implements OnInit {

  doctors: Doctor[] = [
    {id: 0, name: ""},
  ];

  workingHours: WorkingHour[];
  selectedDoctorId: number;
  
  @Output()
  selectedDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getDoctorList().subscribe((result) => {
      this.doctors = [...this.doctors, ...result.data];
    });
  }

  loadWorkingHours() {
    this.workingHours = this.doctorService.getWorkingHours(this.selectedDoctorId).subscribe((result) => {
      this.workingHours = result.data;
    });
    this.emitDoctorEvent();
  }

  emitDoctorEvent() {
    let selectedDoctor = this.doctors.find((doctor) => {
      return doctor.id == this.selectedDoctorId;
    });
    this.selectedDoctor.emit(selectedDoctor);  
  }
}
