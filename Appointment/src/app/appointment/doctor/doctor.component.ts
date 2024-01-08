import { Component, EventEmitter, Output } from "@angular/core";
import { DoctorService } from "./doctor.service";
import { WorkingHour } from "../models/workingHour";
import { Doctor } from "../models/doctor";

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
  selectedDoctorId: number;
  
  @Output()
  selectedDoctor: EventEmitter<Doctor> = new EventEmitter<Doctor>();

  constructor(private doctorService: DoctorService) {}

  loadWorkingHours() {
    this.workingHours = this.doctorService.getWorkingHours(this.selectedDoctorId);
    this.emitDoctorEvent();
  }

  emitDoctorEvent() {
    let selectedDoctor = this.doctors.find((doctor) => {
      return doctor.id == this.selectedDoctorId;
    });
    this.selectedDoctor.emit(selectedDoctor);  
  }
}
