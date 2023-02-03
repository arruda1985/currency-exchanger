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
    const response = { status: 200 };

    service.convert(from, to, ammount).subscribe((data: any) => {
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

  it('should get symbols from Fixer endpoint', (done) => {
    const response = { status: 200 };

    service.symbols().subscribe((data: any) => {
      expect(req.request.url).toBe(`${apiUrl}symbols`);
      expect(data.status).toBe(200);
      done();
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${apiUrl}symbols`,
    });
    req.flush(response);
  });
});
