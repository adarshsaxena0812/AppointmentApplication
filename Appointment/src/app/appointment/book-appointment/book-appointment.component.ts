import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from '../doctor/doctor.component';
import { Appointment, BookAppointmentService } from './book-appointmnet.service';
import { DoctorService } from '../doctor/doctor.service';
import { WorkingHour } from '../doctor/working-hours/working-hours.component';
import { WorkingHoursUtil } from '../util/workingHourUtil.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {

  @Input()
  selectedDoctor: Doctor;
  
  appointmentStartTime: string;
  appointmnetDuration: string = '10';
  appointments: Appointment[];
  hasConflictingAppointment = false;
  hasWrongWorkingHours = false
  appointmentCreated = false;

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private doctorService: DoctorService,
    private workingHoursUtil: WorkingHoursUtil
  ) {}

  ngOnInit() {
  }

  bookAppointmnet() {
    const startTime = (new Date(this.appointmentStartTime)).getTime();
    const hasCorrectWorkingHours = this.checkAppointmentWorkingHours()
    if (hasCorrectWorkingHours) {
      this.bookAppointmentService.fetchAppointment().subscribe(data => {
        this.appointments = data;
        this.checkConflictingAppointment(startTime);
      });
    } else {
      this.hasWrongWorkingHours = true;
    }
  }

  checkAppointmentWorkingHours(): boolean {
    const workingHours: WorkingHour[] = this.doctorService.getWorkingHours(this.selectedDoctor.id);
    return this.workingHoursUtil.validateWorkingHours(workingHours, this.appointmentStartTime);
  }

  checkConflictingAppointment(appointmentStartTime: number) {
    this.hasConflictingAppointment = this.bookAppointmentService.checkConflictingAppointment(this.selectedDoctor.id, appointmentStartTime, this.appointments);
    if(!this.hasConflictingAppointment) {
      const startTime = (new Date(this.appointmentStartTime)).getTime();
      this.bookAppointmentService.saveAppointment(this.selectedDoctor.id, startTime, Number(this.appointmnetDuration)).subscribe(() => {
        this.resetValue();
        this.appointmentCreated = true;
      });
    }
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
