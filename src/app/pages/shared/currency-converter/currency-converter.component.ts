import { Component } from '@angular/core';
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

  public convertForm = new FormGroup({
    ammount: new FormControl('', Validators.min(0)),
    from: new FormControl({ value: '', disabled: true }, Validators.required),
    to: new FormControl({ value: '', disabled: true }, Validators.required)
  });


  constructor(private currencyService: CurrencyService) {
    this.symbolsArray = new Array<CurrencySymbol>();
    this.loadSymbols();
  }

  private loadSymbols() {
    this.currencyService.symbols().subscribe((data: ISymbolResult) => {
      Object.keys(data.symbols).forEach(s => {
        this.symbolsArray.push(new CurrencySymbol(s, data.symbols[s]));
      });
    });
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

    this.currencyService.convert(
      this.convertForm.controls['from'].value as string,
      this.convertForm.controls['to'].value as string,
      Number(this.convertForm.controls['ammount'].value))
      .subscribe((data: IConvertionResult) => {
        this.convertionResult = data;
      });
  }

}
