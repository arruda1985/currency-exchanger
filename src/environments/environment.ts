import { IEnvironment } from 'src/app/interfaces/environment.interface';
import 'zone.js/dist/zone-error';


const apiUrl = 'https://api.apilayer.com/fixer/';
const apiKey = 'SYK6IPSPGcXVaL0ihMFlzQG0tLZDiey2';

export const environment: IEnvironment = {
  production: false,
  apiUrl,
  apiKey,
};