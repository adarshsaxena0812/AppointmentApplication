import { Component } from '@angular/core';
import { Doctor } from './doctor/doctor.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent {

  selectedDoctor: Doctor;
  displayAppointmentsForDoctor = false;

  onDoctorSelection(data: Doctor) {
    this.selectedDoctor = data;
  }

  displayAppointments() {
    this.displayAppointmentsForDoctor = true;
  }
}
