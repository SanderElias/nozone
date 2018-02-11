import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
// import Chart from 'chart.js';

declare var Chart: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-tick',
  changeDetection : ChangeDetectionStrategy.OnPush,
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
export class ShowtickComponent implements OnInit, AfterViewInit, OnChanges {
  _data: number[];
  @ViewChild('graph') canvas: ElementRef;
  myChart;

  @Input() data;
  // @Input('data') set data(arr) {
  //   this._data = arr;
  //   // console.log('update',arr)

  ngOnChanges(sc:SimpleChanges) {
    if (sc.data && this.myChart) {
      this.myChart.data.datasets[0].data = this.data;
      this.myChart.update();
    }
  }

  // get data() {return this._data; }

  constructor() { }

  ngOnInit() { }


  ngAfterViewInit() {
    const cv: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = cv.getContext('2d');
    const labels = Array.from({ length: 15 }, (e, i) => i);
    // console.log(ctx, scale);
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
