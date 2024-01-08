import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing"

import { BookAppointmentService } from "./book-appointmnet.service";
import { Appointment } from "../models/appointment";

describe('BookAppointmentService', () => {
    let service: BookAppointmentService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        })
        .compileComponents();
        
        service = TestBed.inject(BookAppointmentService);
    });

    describe('checkConflictingAppointment', () => {
        const appointments = [
            {
                doctorId: 1, 
                appointmentStartTime: new Date('2024-01-05T09:20').getTime(),
                appointmentEndTime: new Date('2024-01-05T09:40').getTime(),
            } as Appointment,
            {
                doctorId: 1, 
                appointmentStartTime: new Date('2024-01-05T09:55').getTime(),
                appointmentEndTime: new Date('2024-01-05T10:25').getTime(),
            } as Appointment,
            {
                doctorId: 2, 
                appointmentStartTime: new Date('2024-01-05T09:35').getTime(),
                appointmentEndTime: new Date('2024-01-05T09:55').getTime(),
            } as Appointment,
          ];

        const parameters: {
            doctorId: number; 
            appointmentStartTime: number;
            appointments: Appointment[];
            expectedResult: boolean;
        }[] = [
            {doctorId: 1, appointmentStartTime: new Date('2024-01-05T09:00').getTime(), appointments: appointments, expectedResult: false},
            {doctorId: 1, appointmentStartTime: new Date('2024-01-05T09:30').getTime(), appointments: appointments, expectedResult: true},
            {doctorId: 2, appointmentStartTime: new Date('2024-01-05T09:30').getTime(), appointments: appointments, expectedResult: false}
		];

        parameters.forEach(param => {
            it(`should return ${param.expectedResult} based on appointmentStartTime and the appointments `, () => {
                const result = service.checkConflictingAppointment(param.doctorId, param.appointmentStartTime, param.appointments);
                
                expect(result).toEqual(param.expectedResult);
            });
        });
    });
});
