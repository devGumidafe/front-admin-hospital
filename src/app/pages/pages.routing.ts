import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorComponent } from './maintenance/doctors/doctor/doctor.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'dashboard', component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de Tema' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'search/:value', component: SearchComponent, data: { title: 'Busquedas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs' } },

      // Mantenimientos
      { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento usuarios' } },
      { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento hospitales' } },
      { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento médicos' } },
      { path: 'doctors/:id', component: DoctorComponent, data: { title: 'Editar médico' } },
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
