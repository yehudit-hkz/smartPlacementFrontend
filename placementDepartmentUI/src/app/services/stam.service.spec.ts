import { TestBed } from '@angular/core/testing';

import { StamService } from './stam.service';

describe('StamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StamService = TestBed.get(StamService);
    expect(service).toBeTruthy();
  });
});
