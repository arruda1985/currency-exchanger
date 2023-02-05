import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/currency-service/currency.service';
import { ChartComponent } from '../shared/chart/chart.component';
import { of } from 'rxjs';
import { DetailComponent } from './detail.component';
import { CurrencyConverterComponent } from '../shared/currency-converter/currency-converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, AppRoutingModule],
      declarations: [DetailComponent, ChartComponent, CurrencyConverterComponent],
      providers: [CurrencyService,
        {
          provide: ActivatedRoute, useValue: {
            params: of({ from: 'BRL', to: 'USD' }),
          },
        }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return month name', () => {

    const monthName = component.getMonthName(new Date('2023-02-03'));

    expect(monthName).toBe("February - 2023");
  });

  it('should load last twelve months', () => {

    const lastMonths = component.loadLastMonths();

    expect(lastMonths.length).toBe(12);
    console.log(lastMonths);
  });

});
