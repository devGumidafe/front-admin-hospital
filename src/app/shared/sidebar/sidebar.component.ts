import { UserService } from 'src/app/services/user.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: Menu[];

  public user!: User;

  constructor(private sidebarService: SidebarService, private userService: UserService) {
    this.menuItems = this.sidebarService.menu;

    this.user = this.userService.user;
  }

  ngOnInit(): void {
  }

}
