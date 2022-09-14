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
    // const promise = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hello world');
    //   } else {
    //     reject('Upsss something went wrong');
    //   }
    // });

    // promise.then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // });
    this.getUsers();
  }

  getUsers(): Promise<any> {
    return fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(({ data }) => console.log(data));
  }


}
