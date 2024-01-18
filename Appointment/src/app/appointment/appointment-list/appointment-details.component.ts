import { Component, Input } from '@angular/core';
import { BookAppointmentService } from '../book-appointment/book-appointmnet.service';
import { AppointmentService } from './appointment.service';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.css'
})
export class AppointmentDetailsComponent {

  @Input()
  selectedDoctor: Doctor;

  toDate: string;
  fromDate: string;
  filteredAppointments;

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private appointmentService: AppointmentService
  ) {}

  getAppointment() {
    this.bookAppointmentService.fetchAppointment(this.selectedDoctor.id).subscribe(result => {
        this.filteredAppointments = this.appointmentService.filterAppointment(this.selectedDoctor.id, result.data, this.fromDate, this.toDate);
    });
  }
}
