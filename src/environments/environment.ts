import { IEnvironment } from 'src/app/interfaces/environment.interface';
import 'zone.js/dist/zone-error';


const apiUrl = 'https://api.apilayer.com/fixer/';
const apiKey = 'MoZRaIzU3cz5kEwrYaVsP5gAO3926uBx';

export const environment: IEnvironment = {
  production: false,
  apiUrl,
  apiKey,
};