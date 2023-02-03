import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IConvertionResult } from 'src/app/interfaces/convertion-result.interface';
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


  constructor() {
    this.symbolsArray = new Array<CurrencySymbol>();
    this.loadSymbols();
  }

  private loadSymbols() {

    //call the service
  }

  public swapCurrency() {
    const fromAux = this.convertForm.get("from")?.value;
    const toAux = this.convertForm.get("to")?.value;

    this.convertForm.get("from")?.setValue(toAux != null ? toAux : null);
    this.convertForm.get("to")?.setValue(fromAux != null ? fromAux : null);
  }



  public convert() {

      //call service
  }

}
