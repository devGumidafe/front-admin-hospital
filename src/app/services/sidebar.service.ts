import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: Menu[] = [];

  /* menu: Menu[] = [
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
        { title: 'Usuarios', url: 'users' },
        { title: 'Hospitales', url: 'hospitals' },
        { title: 'Médicos', url: 'doctors' },
      ]
    }
  ];*/

  constructor(private router: Router) { }

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];

    if (this.menu.length === 0) {
      this.router.navigateByUrl('/auth/login');
    }
  }

}
