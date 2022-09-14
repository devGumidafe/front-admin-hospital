import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public labels_1: string[] = ['Prueba', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_2: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_3: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public labels_4: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];


  public data_1 = [100, 200, 300];

  public data_2 = [0, 300, 250];

  public data_3 = [350, 450, 100];

  public data_4 = [150, 500, 200];

  constructor() { }

  ngOnInit(): void {
  }

}
