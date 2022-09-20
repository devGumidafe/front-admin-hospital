import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'search/:value', component: SearchComponent, data: { title: 'Busquedas' } },

      // Mantenimientos
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento médicos' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Editar médico' } },

      // Rutas de admin
      { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Mantenimiento usuarios' } }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
