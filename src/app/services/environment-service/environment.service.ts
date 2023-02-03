import { Injectable } from '@angular/core';
import { IEnvironment } from 'src/app/interfaces/environment.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class EnvironmentService implements IEnvironment {

  get production() {
    return environment.production;
  }

  get apiKey() {
    return environment.apiKey;
  }

  get apiUrl() {
    return environment.apiUrl;
  }

}
