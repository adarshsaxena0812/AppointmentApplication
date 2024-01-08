import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing"

import { AvailableAppointmentComponent } from './available-appointment.component';

describe('AvailableAppointmentComponent', () => {
  let component: AvailableAppointmentComponent;
  let fixture: ComponentFixture<AvailableAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableAppointmentComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableAppointmentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
