import { TestBed } from '@angular/core/testing';

import { EnumListsService } from './enum-lists.service';

describe('EnumListsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumListsService = TestBed.get(EnumListsService);
    expect(service).toBeTruthy();
  });
});
