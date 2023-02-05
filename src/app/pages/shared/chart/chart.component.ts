import { Component, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartData } from 'src/app/models/chart-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  public chart: Chart | undefined;

  constructor(private elementRef: ElementRef) {
    Chart.register(...registerables);
  }

  createChart(chartData: ChartData | undefined) {
    this.chart?.destroy();
    const htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    this.chart = new Chart(htmlRef, {
      type: 'line', 

      data: {
        labels: chartData?.labels,

        datasets: [
          {
            label: chartData?.dataSetLabel,
            data: chartData?.dataSetValues,
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
