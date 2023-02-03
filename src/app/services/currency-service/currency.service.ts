import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment-service/environment.service';
import { Observable } from 'rxjs';
import { IConvertionResult } from 'src/app/interfaces/convertion-result.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  apiUrl: string;

  constructor(private httpClient: HttpClient, private environmentService: EnvironmentService) {
    this.apiUrl = environmentService.apiUrl;
  }

  public convert(from: string, to: string, ammount: number): Observable<IConvertionResult> {

    return this.httpClient.get<IConvertionResult>(this.apiUrl + "convert?from=" + from + "&to=" + to + "&amount=" + ammount);

  }

  public symbols() {

    return this.httpClient.get(this.apiUrl + "symbols");

  }
}
