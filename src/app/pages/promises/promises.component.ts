import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): Promise<any> {
    return fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(({ data }) => console.log(data));
  }


}
