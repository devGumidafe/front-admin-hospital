import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  private url: string = './assets/css/colors/default.css';

  constructor() { }

  public loadTheme(): void {
    this.url = localStorage.getItem('theme') || this.url;

    this.linkTheme?.setAttribute('href', this.url);
  }

  changeTheme(theme: string, links: NodeListOf<Element>) {
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.checkCurrentTheme(links);
  }

  checkCurrentTheme(links: NodeListOf<Element>) {
    links.forEach((element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }

}
