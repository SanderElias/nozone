import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    HostBinding
} from '@angular/core';

@Component({
    selector: 'show-bar',
    template: `&nbsp;`,
    styles: [
        `
    :host {
      background-color:green;
    }
  `
    ]
})
export class BarComponent implements OnInit {
    @Input() relHeight;
    @Input() max = 100;
    @HostBinding('style.height') height;

    constructor() {}

    ngOnInit() {
        this.height = this.relHeight * (1 / this.max) * 100 + '%';
        //console.log('called', this.height);
    }
}
