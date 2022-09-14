import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input()
  public title: string = 'Gráfica de Dona';

  @Input('labels')
  public graphicLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  @Input('data')
  public graphicData = [350, 450, 100];

  public doughnutChartData!: ChartData<'doughnut'>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData = {
      labels: this.graphicLabels,
      datasets: [
        {
          data: this.graphicData,
          backgroundColor: ['#6857E6', '#009FEE', '#F02059']
        }
      ]
    };
  }


}
