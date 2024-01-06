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

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    DoctorComponent,
    WorkingHoursComponent,
    BookAppointmentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
