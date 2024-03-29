import { TestBed } from "@angular/core/testing";
import { AppointmentService } from "./appointment.service";

describe('AppointmentService', () => {
    let service: AppointmentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({})
        .compileComponents();
        
        service = TestBed.inject(AppointmentService);
    });

    describe('filterAppointment', () => {
        it('should filter appointments for given dates and  call sort appointment', () => {
            let appointments = [
                { doctorId: 1, appointmentStartTime: new Date('2024-01-05T09:30').getTime(), appointmentEndTime: new Date('2024-01-05T09:45').getTime() },
                { doctorId: 2, appointmentStartTime: new Date('2024-01-05T09:30').getTime(), appointmentEndTime: new Date('2024-01-05T09:45').getTime() },
                { doctorId: 1, appointmentStartTime: new Date('2024-01-06T09:30').getTime(), appointmentEndTime: new Date('2024-01-06T09:45').getTime() }
            ]
            spyOn(service, 'sortAppointment').and.returnValue([appointments[0]]);

            let result = service.filterAppointment(appointments, '2024-01-05', '2024-01-05');

            expect(result.length).toEqual(1);
            expect(service.sortAppointment).toHaveBeenCalled();
        });
    });

    describe('sortAppointment', () => {
        it('should sort appointments by start date', () => {
            let appointments = [
                { doctorId: 1, startTime: 123456456000, endTime: 123458456000 },
                { doctorId: 1, startTime: 123123123000, endTime: 123125123000 },
                { doctorId: 1, startTime: 456456123000, endTime: 456458123000 },
                { doctorId: 1, startTime: 456123456000, endTime: 456125456000 }
            ]

            let result = service.sortAppointment(appointments);

            expect(result.length).toEqual(4);
            expect(result[0].startTime).toEqual(123123123000);
            expect(result[2].startTime).toEqual(456123456000);
        });
    });
});