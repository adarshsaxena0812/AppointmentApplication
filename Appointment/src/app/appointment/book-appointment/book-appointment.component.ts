import { Component, Input } from '@angular/core';
import { Doctor } from '../doctor/doctor.component';
import { Appointment, BookAppointmentService } from './book-appointmnet.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent {

  @Input()
  selectedDoctor: Doctor;
  
  appointmentStartTime: string;
  appointmnetDuration: string = '10';
  appointments: Appointment[];
  hasConflictingAppointment: boolean = false;

  constructor(private bookAppointmentService: BookAppointmentService) {}

  bookAppointmnet() {
    const startTime = (new Date(this.appointmentStartTime)).getTime();
    this.bookAppointmentService.fetchAppointment().subscribe(data => {
      this.appointments = data;
      this.checkConflictingAppointment(startTime);
    });
  }

  checkConflictingAppointment(appointmentStartTime: number) {
    this.hasConflictingAppointment = this.bookAppointmentService.checkConflictingAppointment(this.selectedDoctor.id, appointmentStartTime, this.appointments);
    if(!this.hasConflictingAppointment) {
      const startTime = (new Date(this.appointmentStartTime)).getTime();
      this.bookAppointmentService.saveAppointment(this.selectedDoctor.id, startTime, Number(this.appointmnetDuration)).subscribe(() => {
        this.resetValues();
      });
    }
  }

  resetValues() {
    this.appointmentStartTime = '';

  }

  closeAlertMessage() {
    this.hasConflictingAppointment = false;
    this.resetValues();
  }
}
