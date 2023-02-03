import { IEnvironment } from 'src/app/interfaces/environment.interface';
import 'zone.js/dist/zone-error';


const apiUrl = 'https://api.apilayer.com/fixer/';
const apiKey = '1iD12Ok1hxcl6qNRqvO50oxJNfTLhzhv';

export const environment: IEnvironment = {
  production: false,
  apiUrl,
  apiKey,
};