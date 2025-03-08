import { TestBed } from '@angular/core/testing';

import { EnrollmentCenterSearchService } from './enrollment.service';

describe('EnrollmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnrollmentCenterSearchService = TestBed.get(EnrollmentCenterSearchService);
    expect(service).toBeTruthy();
  });
});
