import { TestBed } from '@angular/core/testing';

import { SiteCreationService } from './siteCreate.service';

describe('SiteCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiteCreationService = TestBed.get(SiteCreationService);
    expect(service).toBeTruthy();
  });
});
