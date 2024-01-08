import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing"

import { AppointmentDetailsComponent } from './appointment-details.component';
import { BookAppointmentService } from '../book-appointment/book-appointmnet.service';
import { of } from 'rxjs';
import { AppointmentService } from './appointment.service';
import { Doctor } from '../models/doctor';

describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  let bookAppointmentServiceMock;
  let appointmentServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { 
          provide: BookAppointmentService,
          useValue: jasmine.createSpyObj('BookAppointmentService', ['saveAppointment', 'fetchAppointment', 'filterAppointment'])
        },
        {
          provide: AppointmentService,
          useValue: jasmine.createSpyObj('AppointmentService', ['filterAppointment', 'sortAppointment'])
        }
      ]
    })
    .compileComponents();

    bookAppointmentServiceMock = TestBed.get(BookAppointmentService);
    appointmentServiceMock = TestBed.get(AppointmentService);
    
    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getAppointment', () => {
    it('should fetch appointments', (done) => {
      component.selectedDoctor = { id: 1 } as Doctor
      bookAppointmentServiceMock.fetchAppointment.and.returnValue(of([]));
      
      component.getAppointment();

      expect(bookAppointmentServiceMock.fetchAppointment).toHaveBeenCalled();
      expect(appointmentServiceMock.filterAppointment).toHaveBeenCalled();
      done();
    })
  });
});
