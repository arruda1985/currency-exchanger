import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addMonths, format, lastDayOfMonth } from 'date-fns';
import { ChartData } from 'src/app/models/chart-data.model';
import { CurrencyService } from 'src/app/services/currency-service/currency.service';
import { ChartComponent } from '../shared/chart/chart.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements AfterViewInit {

  @ViewChild(ChartComponent) child: ChartComponent | undefined;
  public chartData: ChartData | undefined;
  private currencyFrom = '';
  private currencyTo = '';
  private lastMonthsDate: Array<string> | undefined;

  /**
   *
   */
  constructor(private changeDetectorRef: ChangeDetectorRef,
    private currencyService: CurrencyService,
    activatedRoute: ActivatedRoute) {

    activatedRoute.params.subscribe(params => {
      this.currencyFrom = params['from'];
      this.currencyTo = params['to'];
    });
  }

  ngAfterViewInit() {

    this.loadPage();
  }

  loadPage() {
    this.chartData = new ChartData();
    this.lastMonthsDate = new Array<string>();
    this.chartData.labels = this.loadLastMonths();
    this.loadChartValue();
    this.chartData.dataSetLabel = this.currencyFrom;
    this.changeDetectorRef.detectChanges();
  }

  public loadChartValue() {
    let aux = 0;
    this.lastMonthsDate?.forEach(m => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.currencyService.historical(this.currencyFrom, [this.currencyTo], m.split('T')[0]).subscribe((data: any) => {

        this.chartData?.dataSetValues?.push(data.rates[this.currencyTo]);
        aux++;

        if (aux == this.chartData?.labels?.length)
          this.loadChartData();
      })
    });
  }

  public loadLastMonths(): string[] {
    const lastMonths = new Array<string>();


    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const lastMonth = addMonths(now, -i - 1);
      const lastDayOfMonthAux = lastDayOfMonth(lastMonth);

      lastMonths.push(this.getMonthName(lastDayOfMonthAux))
      this.lastMonthsDate?.push(lastDayOfMonthAux.toISOString());
    }
    return lastMonths;
  }

  public getMonthName(date: Date): string {
    return format(date, "MMMM");
  }

  public loadChartData() {
    this.child?.createChart(this.chartData);
  }
}