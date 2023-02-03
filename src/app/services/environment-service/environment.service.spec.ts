import { TestBed } from '@angular/core/testing';

import { EnvironmentService } from './environment.service';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should apiKey not be null', () => {
    expect(service.apiKey).not.toBeNull();
  });

  it('should apiUrl not be null', () => {
    expect(service.apiUrl).not.toBeNull();
  });

});
