import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorComponent } from './doctor.component';
import { DoctorService } from './doctor.service';
import { of } from 'rxjs';

describe('DoctorComponent', () => {
  let component: DoctorComponent;
  let fixture: ComponentFixture<DoctorComponent>;
  let doctorServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorComponent],
      providers: [{ 
        provide: DoctorService, 
        useValue: jasmine.createSpyObj('DoctorService', ['getWorkingHours'])
      }]
    })
    .compileComponents();

    doctorServiceMock = TestBed.get(DoctorService);
    
    fixture = TestBed.createComponent(DoctorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('loadWorkingHours', () => {
    it('should get working hours for doctor and emit selected doctor', () => {
      component.selectedDoctorId = 1
      spyOn(component, 'emitDoctorEvent');
      doctorServiceMock.getWorkingHours.and.returnValue(of([]));

      component.loadWorkingHours();

      expect(component.emitDoctorEvent).toHaveBeenCalled();
      expect(doctorServiceMock.getWorkingHours).toHaveBeenCalledWith(1);
    });
  });
});
