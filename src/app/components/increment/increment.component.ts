import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [
  ]
})
export class IncrementComponent implements OnInit {

  @Input()
  progress: number = 50;

  @Input()
  btnClass: string = 'btn-primary';

  @Output()
  changeValue: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  updateProgress(value: number) {
    if (this.progress >= 100 && value > 0) {
      this.changeValue.emit(100);
      this.progress = 100;
      return;
    }

    if (this.progress <= 0 && value < 0) {
      this.changeValue.emit(0);
      this.progress = 0;
      return;
    }

    this.changeValue.emit(this.progress += value);
    this.progress = this.progress + value;
  }

  onChange(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if (value <= 0) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.changeValue.emit(this.progress);
  }

  isInvalid(value: number): boolean {
    return value > 100 || value < 0 || isNaN(value);
  }

}
