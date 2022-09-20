import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './../components/components.module';
import { PipesModule } from './../pipes/pipes.module';
import { SharedModule } from './../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { UsersComponent } from './maintenance/users/users.component';

import { ProfileComponent } from './profile/profile.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { SearchComponent } from './search/search.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    DoctorComponent,
    SearchComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class PagesModule { }
