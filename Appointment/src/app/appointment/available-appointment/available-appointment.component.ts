import { Component, Input } from '@angular/core';
import { BookAppointmentService } from '../book-appointment/book-appointmnet.service';
import { AvailableAppointmentService } from './available-appointment.service';
import { Doctor } from '../models/doctor';

@Component({
  selector: 'app-available-appointment',
  templateUrl: './available-appointment.component.html',
  styleUrl: './available-appointment.component.css'
})
export class AvailableAppointmentComponent {

  @Input()
  selectedDoctor: Doctor;

  desiredAppointmentDateTime: string = null;
  appointmentDuration: string = null;
  firstAvailableAppointment: string;
  errorMessage: string;

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private availableAppointmentService: AvailableAppointmentService
  ) {}

  getFirstAvailableAppointment() {
    if(this.desiredAppointmentDateTime == null) {
      this.errorMessage = "Please select available date.";
    }

    if(this.appointmentDuration == null) {
      this.errorMessage = "Please select duration of appointment.";
    }

    if(this.desiredAppointmentDateTime && this.appointmentDuration) {
      this.bookAppointmentService.fetchAppointment().subscribe(appointments => {
        let firstAvailableAppointmentTime = this.availableAppointmentService.getFirstAvailableAppointment(appointments, this.desiredAppointmentDateTime, this.appointmentDuration);
        const availableDate = new Date(firstAvailableAppointmentTime);
        this.firstAvailableAppointment = `${availableDate.toLocaleDateString()} ${availableDate.toLocaleTimeString()}`;
        this.errorMessage = null;
      });
    }
  }
}
