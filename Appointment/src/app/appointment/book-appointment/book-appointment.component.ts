import { Component, Input, OnInit } from '@angular/core';
import { BookAppointmentService } from './book-appointmnet.service';
import { DoctorService } from '../doctor/doctor.service';
import { WorkingHoursUtil } from '../util/workingHourUtil';
import { WorkingHour } from '../models/workingHour';
import { Doctor } from '../models/doctor';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {

  @Input()
  selectedDoctor: Doctor;
  
  appointmentStartTime: string;
  appointmentDuration: string = '10';
  appointments: Appointment[];
  hasConflictingAppointment = false;
  hasWrongWorkingHours = false
  appointmentCreated = false;

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
  }

  validateAppointmnet() {
    const startTime = (new Date(this.appointmentStartTime)).getTime();

    this.doctorService.getWorkingHours(this.selectedDoctor.id).subscribe((result) => {
      console.log(result.data);
      const workingHours: WorkingHour[] = result.data;
      this.hasWrongWorkingHours = WorkingHoursUtil.validateWorkingHours(workingHours, this.appointmentStartTime);
      if (this.hasWrongWorkingHours) {
        this.bookAppointment(startTime);
      }
    });
  }

  bookAppointment(startTime: number) {
    this.bookAppointmentService.saveAppointment(this.selectedDoctor.id, startTime, Number(this.appointmentDuration)).subscribe((result) => {
      if (result.success == 1) {
        this.appointmentCreated = true;
        this.resetValue();
      } else {
          this.hasConflictingAppointment = true;
      }
    });
  }

  resetValue() {
    this.appointmentStartTime = '';
  }

  closeAlertMessage() {
    this.hasConflictingAppointment = false;
    this.hasWrongWorkingHours = false;
    this.appointmentCreated = false;
    this.resetValue();
  }
}
