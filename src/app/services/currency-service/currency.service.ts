import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EnvironmentService } from '../environment-service/environment.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl: string;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.apiUrl = environmentService.apiUrl;
  }

  public convert(from: string, to: string, ammount: number) {

    return this.httpClient.get(this.apiUrl + "convert?from=" + from + "&to=" + to + "&amount=" + ammount);

  }

  public symbols() {

    return this.httpClient.get(this.apiUrl + "symbols");

  }
}
