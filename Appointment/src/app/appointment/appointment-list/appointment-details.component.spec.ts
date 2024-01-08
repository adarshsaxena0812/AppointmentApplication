import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing"

import { AppointmentDetailsComponent } from './appointment-details.component';
import { BookAppointmentService } from '../book-appointment/book-appointmnet.service';

describe('AppointmentDetailsComponent', () => {
  let component: AppointmentDetailsComponent;
  let fixture: ComponentFixture<AppointmentDetailsComponent>;

  let bookAppointmentServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: BookAppointmentService }
      ]
    })
    .compileComponents();

    bookAppointmentServiceMock = TestBed.get(BookAppointmentService);
    
    fixture = TestBed.createComponent(AppointmentDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
