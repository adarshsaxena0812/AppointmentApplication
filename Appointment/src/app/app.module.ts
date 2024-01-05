import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ProviderComponent } from './appointment/provider/provider.component';
import { WorkingHoursComponent } from './appointment/provider/working-hours/working-hours.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    ProviderComponent,
    WorkingHoursComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
