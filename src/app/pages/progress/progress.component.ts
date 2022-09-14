import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  progress_1: number = 25;
  progress_2: number = 50;

  constructor() { }

  ngOnInit(): void {
  }

  get getProgress_1() {
    return `${this.progress_1}%`;
  }

  get getProgress_2() {
    return `${this.progress_2}%`;
  }

}
