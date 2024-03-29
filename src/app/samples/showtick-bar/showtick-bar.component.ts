import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'show-tick-bar',
    template: `
    <show-bar *ngFor="let bar of data" [relHeight]="bar" [max]="maxVal"></show-bar>

  `,
    styles: [
        `
:host {
  width: 300px;
  height:150px;
  border: 1px solid blue;
  display:grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: 1fr;
  align-items:end;
}
`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowtickBarComponent {
    @Input('data') data: number[];
    maxVal: number;

    ngOnChanges() {
        if (Array.isArray(this.data)) {
            this.maxVal = this.data.reduce((x, y) => Math.max(x, y));
        }
    }
}
