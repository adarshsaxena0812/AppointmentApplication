import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorService } from './doctor.service';
import { WorkingHoursUtil } from '../util/workingHourUtil';
import { WorkingHour } from '../models/workingHour';

describe('DoctorService', () => {
  let service: DoctorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
    })
    .compileComponents();
    
    service = TestBed.inject(DoctorService);
  });

  // describe('getWorkingHours', () => {
  //   it('should get working hours for doctor with id 1', () => {      
  //     const workingHours: WorkingHour[] = service.getWorkingHours(1);

  //     expect(workingHours.length).toEqual(7);
  //   });

  //   it('should not get working hours if doctor id not found', () => {      
  //       const workingHours: WorkingHour[] = service.getWorkingHours(123);
  
  //       expect(workingHours.length).toEqual(0);
  //     });
  // });
});
