import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';

declare function init_plugins(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private settingsService: SettingsService) {
    this.settingsService.loadTheme();
  }

  ngOnInit(): void {
    init_plugins();
  }

}
