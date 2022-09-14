import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { filter, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public count = 0;
  public intervalSubscription!: Subscription;

  constructor() {
    this.intervalSubscription = this.returnInterval()
      .subscribe(console.log);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  returnObservable(): Observable<string> {
    return new Observable<string>(observer => {
      setInterval(() => {
        observer.next(`Hello world ${this.count++}`);

        if (this.count === 5) {
          observer.complete();
        }
      }, 1000);
    });
  }

  returnInterval(): Observable<number> {
    return interval(1000)
      .pipe(
        take(10),
        map(i => i + 1),
        filter(i => i % 2 === 0)
      );
  }
}
