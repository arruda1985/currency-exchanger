import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;
  const apiUrl = "https://api.apilayer.com/fixer/";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]

    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CurrencyService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call convert Fixer endpoint', (done) => {
    const from = "USD";
    const to = "EUR";
    const ammount = 4.12;
    const response: any = { status: 200 };

    service.convert(from, to, ammount).subscribe(data => {
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe(`${apiUrl}convert?from=${from}&to=${to}&amount=${ammount}`);
      expect(data.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${apiUrl}convert?from=${from}&to=${to}&amount=${ammount}`,
    });
    req.flush(response);
  });
});
