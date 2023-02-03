import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  public apiUrl = "https://api.apilayer.com/fixer/";
  constructor(private httpClient: HttpClient) {

  }

  public convert(from: string, to: string, ammount: number): Observable<any> {

    return this.httpClient.get(this.apiUrl + "convert?from=" + from + "&to=" + to + "&amount=" + ammount);
  }
}
