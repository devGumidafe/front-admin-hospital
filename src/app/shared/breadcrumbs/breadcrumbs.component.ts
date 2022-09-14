import { ActivationEnd, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy  {

  public title!: string;
  public titleSubs$!: Subscription;
  public documentTitle = document;

  constructor(private router: Router) {
    this.titleSubs$ = this.getArgumentsRoute()
      .subscribe(({ title }) => {
        this.title = title;
        this.documentTitle.title = `AdminDashboard - ${title}`;
      });

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getArgumentsRoute() {
    return this.router.events
      .pipe(
        filter((event: any) => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      )
  }
}
