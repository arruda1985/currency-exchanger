import { Component } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency-service/currency.service';
import { ILatestResult } from 'src/app/interfaces/lastest-result.interface';
import { PopularCards } from 'src/app/models/popular-cards.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public popularResults: ILatestResult | undefined;
  public popularCards: Array<PopularCards> | undefined;

  constructor(private currencyService: CurrencyService) {
     this.loadCards();
  }

  public loadCards() {
    const popularCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'HKD', 'NZD', 'BRL']
    this.popularCards = new Array<PopularCards>();
    this.currencyService.latest('USD', popularCurrencies)
      .subscribe((data: ILatestResult) => {

        Object.keys(data.rates).forEach(r => {
          this.popularCards?.push(new PopularCards(r, data.rates[r]))
        });
      });
  }
}
