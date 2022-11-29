import {
    ChangeDetectionStrategy,
    Component, HostBinding, Input, OnInit
} from '@angular/core';

@Component({
    selector: 'show-bar',
    template: `&nbsp;`,
    styles: [
        `
    :host {
      display: block;
      background-color:green;
      margin-left: 1px;
    }
  `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class BarComponent implements OnInit {
    @Input() relHeight;
    @Input() max = 100;
    @HostBinding('style.height') height;

    ngOnInit() {
        this.height = this.relHeight * (1 / this.max) * 100 + '%';
    }
}
