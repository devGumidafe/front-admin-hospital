import { Injectable } from '@angular/core';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: Menu[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Home', url: '/' },
        { title: 'ProgressBar', url: 'progress' },
        { title: 'Gráficas', url: 'grafica1' },
        { title: 'Promises', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ]
    },
    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Hospitales', url: 'hospitals' },
        { title: 'Médicos', url: 'medicos' },
      ]
    }
  ];

  constructor() { }
}
