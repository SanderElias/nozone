import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <div style="text-align:center">
      <h1>
        Ticker-graph
      </h1>
      <tick-graph></tick-graph>
    </div>

  `,
    styles: []
})
export class AppComponent {
    title = 'app';
}
