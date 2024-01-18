import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookAppointmentComponent } from './book-appointment.component';
import { BookAppointmentService } from './book-appointmnet.service';
import { Doctor } from '../models/doctor';
import { DoctorService } from '../doctor/doctor.service';

describe('BookAppointmentComponent', () => {
  let component: BookAppointmentComponent;
  let fixture: ComponentFixture<BookAppointmentComponent>;
  let bookAppointmentServiceMock;
  let doctorServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAppointmentComponent],
      providers: [{ 
        provide: BookAppointmentService, 
        useValue: jasmine.createSpyObj('BookAppointmentService', ['saveAppointment', 'fetchAppointment'])
      },
      { 
        provide: DoctorService, 
        useValue: jasmine.createSpyObj('DoctorService', ['getWorkingHours'])
      },
    ]
    })
    .compileComponents();
    
    bookAppointmentServiceMock = TestBed.get(BookAppointmentService);
    doctorServiceMock = TestBed.get(DoctorService);
    
    fixture = TestBed.createComponent(BookAppointmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validateAppointmnet', () => {
    it('should call check appointment for conflict and if correct working hours then book appointments', (done) => {
      spyOn(component, 'bookAppointment');
      component.appointmentStartTime = '2024-01-05T09:30';
      bookAppointmentServiceMock.fetchAppointment.and.returnValue(of([]));
      doctorServiceMock.getWorkingHours.and.returnValue(of({
        data: [
        { day: 4, hourFrom: 9, hourTo: 17},
        { day: 5, hourFrom: 9, hourTo: 17},
        { day: 6, hourFrom: 0, hourTo: 0}
      ]}));
      component.selectedDoctor = {id: 1, name: 'Test Dr'} as Doctor;

      component.validateAppointmnet();

      expect(doctorServiceMock.getWorkingHours).toHaveBeenCalledWith(1);
      expect(component.hasWrongWorkingHours).toEqual(true);
      expect(component.bookAppointment).toHaveBeenCalled();
      done();
    });

    it('should check appointment for working hours and if wrong then should not book appointments', () => {
      component.appointmentStartTime = '2024-01-05T08:00';
      bookAppointmentServiceMock.fetchAppointment.and.returnValue(of([]));
      doctorServiceMock.getWorkingHours.and.returnValue(of({
        data: [
        { day: 4, hourFrom: 9, hourTo: 17},
        { day: 5, hourFrom: 9, hourTo: 17},
        { day: 6, hourFrom: 0, hourTo: 0}
      ]}));
      spyOn(component, 'bookAppointment');
      component.selectedDoctor = {id: 1, name: 'Test Dr'} as Doctor;

      component.validateAppointmnet();

      expect(component.bookAppointment).not.toHaveBeenCalled();
      expect(component.hasWrongWorkingHours).toEqual(false);
    });

    describe('resetValue', () => {
      it('should reset the appointmentStartTime', () => {
        component.appointmentStartTime = '2024-01-05T22:30';

        component.resetValue();

        expect(component.appointmentStartTime).toEqual('');
      });
    });

    describe('closeAlertMessage', () => {
      it('shopuld close all alert messages', () => {
        component.hasConflictingAppointment = true;
        component.hasWrongWorkingHours = true;
        component.appointmentCreated = true;
        spyOn(component, 'resetValue');

        component.closeAlertMessage();

        expect(component.hasConflictingAppointment).toEqual(false);
        expect(component.hasWrongWorkingHours).toEqual(false);
        expect(component.appointmentCreated).toEqual(false);
        expect(component.resetValue).toHaveBeenCalled();
      });
    });
  });
});
