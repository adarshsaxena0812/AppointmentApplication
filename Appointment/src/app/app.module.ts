import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { DoctorComponent } from './appointment/doctor/doctor.component';
import { WorkingHoursComponent } from './appointment/doctor/working-hours/working-hours.component';
import { BookAppointmentComponent } from './appointment/book-appointment/book-appointment.component';
import { DayDisplayPipe } from './appointment/util/dayDisplayPipe.pipe';
import { WorkingHoursPipe } from './appointment/util/workingHoursDisplayPipe.pipe';
import { AppointmentDetailsComponent } from './appointment/appointment-list/appointment-details.component';
import { DurationCalculationPipe } from './appointment/util/durationPipe.pipe';
import { AvailableAppointmentComponent } from './appointment/available-appointment/available-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    DoctorComponent,
    WorkingHoursComponent,
    BookAppointmentComponent,
    DayDisplayPipe,
    WorkingHoursPipe,
    DurationCalculationPipe,
    AppointmentDetailsComponent,
    AvailableAppointmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
