import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConvertionResult } from 'src/app/interfaces/convertion-result.interface';
import { ISymbolResult } from 'src/app/interfaces/symbol-result.interface';
import { CurrencyService } from 'src/app/services/currency-service/currency.service';
import { CurrencySymbol } from '../../../models/currency-symbol.model';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent {

  public symbolsArray: Array<CurrencySymbol>;
  public convertionResult: IConvertionResult | undefined;
  public currentPage: string | undefined;
  public showResult = false;
  public convertForm = new FormGroup({
    ammount: new FormControl('', [Validators.min(0), Validators.required]),
    from: new FormControl({ value: '', disabled: true }, Validators.required),
    to: new FormControl({ value: '', disabled: true }, Validators.required)
  });

  @Input() page = '';
  @Input() from = '';
  @Input() to = '';
  @Input() ammount = '';
  @Output() reload = new EventEmitter<string[]>();

  constructor(private currencyService: CurrencyService) {
    this.symbolsArray = new Array<CurrencySymbol>();
    this.loadSymbols();
  }

  private loadSymbols() {
    this.currencyService.symbols().subscribe((data: ISymbolResult) => {
      Object.keys(data.symbols).forEach(s => {
        this.symbolsArray.push(new CurrencySymbol(s, data.symbols[s]));
        // this.loadSelected();
      });
    });
  }

  loadSelected() {
    this.convertForm.get("from")?.setValue(this.from != null ? this.from : 'EUR');
    this.convertForm.get("to")?.setValue(this.to != null ? this.to : 'USD');
  }

  public swapCurrency() {
    const fromAux = this.convertForm.get("from")?.value;
    const toAux = this.convertForm.get("to")?.value;

    this.convertForm.get("from")?.setValue(toAux != null ? toAux : null);
    this.convertForm.get("to")?.setValue(fromAux != null ? fromAux : null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inputChanged(event: any) {
    let newValue = event.value;

    const splittedNumber = newValue.split('.');

    if (splittedNumber.length > 1 && splittedNumber[1].length > 2) {
      newValue = Number(newValue).toFixed(2);
    }

    const number = Number(newValue);

    this.convertForm.patchValue({ ammount: number.toString() }, { emitEvent: false });
    if (number > 0) {
      this.convertForm.get("from")?.enable();
      this.convertForm.get("to")?.enable();
    } else {
      this.convertForm.get("from")?.disable();
      this.convertForm.get("to")?.disable();
      this.convertForm.patchValue({ ammount: "0" }, { emitEvent: false });
    }
  }


  public convert() {
    this.reload.emit([this.convertForm.controls['from'].value as string, 
    this.convertForm.controls['to'].value as string,
    this.getCurrencyNameByCode( this.convertForm.controls['from'].value as string)]);
    this.currencyService.convert(
      this.convertForm.controls['from'].value as string,
      this.convertForm.controls['to'].value as string,
      Number(this.convertForm.controls['ammount'].value))
      .subscribe((data: IConvertionResult) => {
        this.convertionResult = data;
        this.showResult = true;

      });
  }

  public getCurrencyNameByCode(code: string): string {
    return this.symbolsArray.filter(s => s.id == code)[0].name;
  }

}
