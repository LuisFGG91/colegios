import { TestBed } from '@angular/core/testing';

import { BackendApiProvider } from './backend-api.service';

describe('InsuranceAppService', () => {
  let service: BackendApiProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendApiProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
