import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild
} from '@angular/core';

declare var Chart: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-tick',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="holder">
      <canvas #graph width="150" height="75"></canvas>
    </div>
  `,
  styles: [
    `
    .holder {
      width: 300px;
      height:150px;
    }
    `
  ]
})
export class ShowtickComponent implements  AfterViewInit, OnChanges {
  _data: number[];
  @ViewChild('graph') canvas: ElementRef;
  myChart;

  @Input() data;

  ngOnChanges(sc: SimpleChanges) {
    if (sc.data && this.myChart) {
      this.myChart.data.datasets[0].data = this.data;
      this.myChart.update();
    }
  }

  ngAfterViewInit() {
    const cv: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = cv.getContext('2d');
    const labels = Array.from({ length: 15 }, (e, i) => i);
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: undefined,
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
