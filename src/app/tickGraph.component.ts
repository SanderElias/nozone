import {
    Component,
    Input,
    ApplicationRef,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

import { timer } from 'rxjs/observable/timer';
import {
    take,
    tap,
    debounce,
    debounceTime,
    throttleTime
} from 'rxjs/operators';
import { TickService } from './samples/tick.service';
import { interval } from 'rxjs/observable/interval';
import { Scheduler } from 'rxjs/Scheduler';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'tick-graph',
    template: `
    <button (click)="stop$.next('')">stop</button>
    <button (click)="remove(ticks[0])">remove</button>
    <button (click)="add()">add</button>
    <input type="checkbox" #box>
    <br>
    <br>
    <div class="tickholder">
    <ng-container *ngIf="box.checked">
      <show-tick *ngFor="let tick$ of ticks" [data]="tick$|async" ></show-tick>
    </ng-container>
    <ng-container *ngIf="!box.checked">
      <show-tick-bar *ngFor="let tick$ of ticks" [data]="tick$|async" ></show-tick-bar>
    </ng-container>
    </div>

     `,
    changeDetection: ChangeDetectionStrategy.Default,
    styles: [
        `
      .tickholder {
        display:grid;
        grid-template-columns: repeat(auto-fill, 305px) ;
        grid-auto-rows: 1fr;
      }
    `
    ]
})
export class TickGraphComponent {
    stop$ = new Subject();
    counter$ = timer(0, 1000 / 60);
    lock = false;

    @Input() name: string;

    ticks = [
        this.t.tick$.pipe(takeUntil(this.stop$)),
        this.t.tick$.pipe(takeUntil(this.stop$)),
        this.t.tick$.pipe(takeUntil(this.stop$))
    ];

    constructor(
        private app: ApplicationRef,
        private ref: ChangeDetectorRef,
        private t: TickService
    ) {
        // this.counter$
        //     .pipe(tap(_ => this.ref.detectChanges()), takeUntil(this.stop$))
        //     .subscribe();
    }

    remove(ticker) {
        const i = this.ticks.indexOf(ticker);
        this.ticks.splice(i, 1);
    }

    add() {
        this.ticks.push(this.t.tick$.pipe(takeUntil(this.stop$)));
    }
}
