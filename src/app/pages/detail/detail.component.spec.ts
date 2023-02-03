import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyService } from 'src/app/services/currency-service/currency.service';
import { ChartComponent } from '../shared/chart/chart.component';

import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DetailComponent, ChartComponent],
      providers: [CurrencyService]
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

    expect(monthName).toBe("February");
  });

  it('should load last twelve months', () => {

    const lastMonths = component.loadLastMonths();

    expect(lastMonths.length).toBe(12);
    console.log(lastMonths);
  });

});
