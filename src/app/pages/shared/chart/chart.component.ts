import { Component, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from 'src/app/models/chart-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: unknown;
  public chartData: ChartData | undefined;

  /**
   *
   */
  constructor(private elementRef: ElementRef) {
    Chart.register(...registerables);
  }

  createChart() {
    const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);

    this.chart = new Chart(htmlRef, {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.chartData?.labes,

        datasets: [
          {
            label: this.chartData?.dataSetLabel,
            data: this.chartData?.dataSetValues,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }

}
