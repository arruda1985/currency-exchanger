import { IEnvironment } from 'src/app/interfaces/environment.interface';
import 'zone.js/dist/zone-error';


const apiUrl = 'https://api.apilayer.com/fixer/';
const apiKey = '940R1l1J0X1isPOQiMa2cIvwd8M9pODu';

export const environment: IEnvironment = {
  production: false,
  apiUrl,
  apiKey,
};