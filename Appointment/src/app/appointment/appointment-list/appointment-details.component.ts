import { Component, Input } from '@angular/core';
import { Doctor } from '../doctor/doctor.component';
import { Appointment, BookAppointmentService } from '../book-appointment/book-appointmnet.service';
import { AppointmentService } from './appointment.service';

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
  filteredAppointments: Appointment[];

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private appointmentService: AppointmentService
  ) {}

  getAppointment() {
    this.bookAppointmentService.fetchAppointment().subscribe(data => {
        this.filteredAppointments = this.appointmentService.filterAppointment(this.selectedDoctor.id, data, this.fromDate, this.toDate);
    });
  }

}
