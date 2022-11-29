import {
  ApplicationRef,
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  Input
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { TickService } from './samples/tick.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tick-graph',
  template: `
    <button (click)="stop$.next('')">stop</button>
    <button (click)="remove(ticks[0])">remove</button>
    <button (click)="add()">add</button>
    <input type="checkbox" #box />
    <br />
    <br />
    <div class="tickHolder">
      <ng-container *ngIf="box.checked">
        <show-tick
          *ngFor="let tick$ of ticks"
          [data]="tick$ | async"
        ></show-tick>
      </ng-container>
      <ng-container *ngIf="!box.checked">
        <show-tick-bar
          *ngFor="let tick$ of ticks"
          [data]="tick$ | async"
        ></show-tick-bar>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .tickHolder {
        display: grid;
        grid-template-columns: repeat(auto-fill, 305px);
        grid-auto-rows: 1fr;
      }
    `,
  ],
})
export class TickGraphComponent {
  stop$ = new Subject();
  counter$ = timer(0, 1000 / 60);
  lock = false;

  @Input() name: string;
 
  ticks = [];

  constructor(
    private app: ApplicationRef,
    private ref: ChangeDetectorRef,
    private t: TickService
  ) {
    this.counter$
      .pipe(
        tap(_ => this.ref.detectChanges()),
        takeUntil(this.stop$)
      )
      .subscribe();

      for (let i = 0; i < 40; i++) {
        this.add();
      }
  }

  remove(ticker) {
    const i = this.ticks.indexOf(ticker);
    this.ticks.splice(i, 1);
  }

  add() {
    this.ticks.push(this.t.tickImmutable$.pipe(takeUntil(this.stop$)));
    // this.ticks.push(this.t.tickMutable$().pipe(takeUntil(this.stop$)));
  }
}
