import { TestBed } from '@angular/core/testing';

import { InMemoryProductDataService } from './in-memory-product-data.service';

describe('InMemoryProductDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryProductDataService = TestBed.get(InMemoryProductDataService);
    expect(service).toBeTruthy();
  });
});
