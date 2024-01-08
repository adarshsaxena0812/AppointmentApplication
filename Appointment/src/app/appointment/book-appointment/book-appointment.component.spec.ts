import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BookAppointmentComponent } from './book-appointment.component';
import { BookAppointmentService } from './book-appointmnet.service';
import { Doctor } from '../models/doctor';

describe('BookAppointmentComponent', () => {
  let component: BookAppointmentComponent;
  let fixture: ComponentFixture<BookAppointmentComponent>;
  let bookAppointmentServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookAppointmentComponent],
      providers: [{ 
        provide: BookAppointmentService, 
        useValue: jasmine.createSpyObj('BookAppointmentService', ['saveAppointment', 'fetchAppointment'])
      },
    ]
    })
    .compileComponents();
    
    bookAppointmentServiceMock = TestBed.get(BookAppointmentService);
    
    fixture = TestBed.createComponent(BookAppointmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('bookAppointmnet', () => {
    it('should call check appointment for conflict and if correct working hours then fetch appointments', (done) => {
      spyOn(component, 'checkAppointmentWorkingHours').and.returnValue(true);
      spyOn(component, 'checkConflictingAppointment');
      component.appointmentStartTime = '2024-01-05T09:30';
      bookAppointmentServiceMock.fetchAppointment.and.returnValue(of([]));

      component.bookAppointmnet();

      expect(component.checkAppointmentWorkingHours).toHaveBeenCalledWith();
      expect(bookAppointmentServiceMock.fetchAppointment).toHaveBeenCalledWith();
      expect(component.checkConflictingAppointment).toHaveBeenCalled();
      done();
    });

    it('should check appointment for working hours and if wrong then should fetch appointments', () => {
      spyOn(component, 'checkAppointmentWorkingHours').and.returnValue(false);
      spyOn(component, 'checkConflictingAppointment');
      component.appointmentStartTime = '2024-01-05T09:30';
      bookAppointmentServiceMock.fetchAppointment.and.returnValue(of([]));

      component.bookAppointmnet();

      expect(component.checkAppointmentWorkingHours).toHaveBeenCalledWith();
      expect(bookAppointmentServiceMock.fetchAppointment).not.toHaveBeenCalledWith();
      expect(component.checkConflictingAppointment).not.toHaveBeenCalled();
      expect(component.hasWrongWorkingHours).toEqual(true);
    });

    describe('checkAppointmentWorkingHours', () => {
      it('should validate the working hours of the appointment', () => {
        component.appointmentStartTime = '2024-01-05T09:30';
        component.selectedDoctor = { id: 1 } as Doctor;
        
        const hasValidAppointmentWorkingHours = component.checkAppointmentWorkingHours();

        expect(hasValidAppointmentWorkingHours).toEqual(true);
      });

      it('should return false if appointment hour is out of working hour range', () => {
        component.appointmentStartTime = '2024-01-05T22:30';
        component.selectedDoctor = { id: 1 } as Doctor;
        
        const hasValidAppointmentWorkingHours = component.checkAppointmentWorkingHours();

        expect(hasValidAppointmentWorkingHours).toEqual(false);
      });
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
