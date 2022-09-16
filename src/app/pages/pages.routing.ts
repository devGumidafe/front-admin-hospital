import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico/medico.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
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
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento médicos' } },
      { path: 'medicos/:id', component: MedicoComponent, data: { title: 'Editar médico' } },
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
