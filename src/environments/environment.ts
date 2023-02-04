import { IEnvironment } from 'src/app/interfaces/environment.interface';
import 'zone.js/dist/zone-error';


const apiUrl = 'https://api.apilayer.com/fixer/';
const apiKey = 'Wh1NoXQQ8aF9aQgOcGfRtSE2AvL6rbHQ';

export const environment: IEnvironment = {
  production: false,
  apiUrl,
  apiKey,
};