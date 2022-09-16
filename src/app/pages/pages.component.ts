import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function init_plugins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService, private sideBarService: SidebarService) {
    this.settingsService.loadTheme();
  }

  ngOnInit(): void {
    init_plugins();
    this.sideBarService.loadMenu();
  }

}
