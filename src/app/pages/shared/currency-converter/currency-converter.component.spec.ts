import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CurrencyService } from 'src/app/services/currency.service';

import { CurrencyConverterComponent } from './currency-converter.component';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyConverterComponent],
      imports: [ReactiveFormsModule, AppRoutingModule, HttpClientTestingModule],
      providers: [CurrencyService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load symbols', () => {
    expect(component.symbolsArray).not.toBeNull();
  });

  it('should swap symbols', () => {
    const originValueFrom = '111';
    const originValueto = '222';


    component.convertForm.controls['from'].setValue(originValueFrom);
    component.convertForm.controls['to'].setValue(originValueto);

    component.swapCurrency();

    expect(component.convertForm.get('from')?.value).toBe(originValueto);
    expect(component.convertForm.get('to')?.value).toBe(originValueFrom);
  });
});
